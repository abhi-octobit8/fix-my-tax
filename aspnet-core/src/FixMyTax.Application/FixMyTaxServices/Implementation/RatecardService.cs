using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Net.Mail;
using Abp.UI;
using ExcelDataReader;
using FixMyTax.Authorization;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Ratecard;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Asn1.Pkcs;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    [AbpAuthorize]
    public class RatecardService : FixMyTaxAppServiceBase, IRatecardService
    {
        private readonly IRepository<Pricing> _ratecardRepository;
        private readonly UserManager _userManager;
        private readonly ILogger<RatecardService> logger;
        private readonly CCAvenueService ccAvenueService;
        private readonly IRepository<RequestTicket> _ticketRepository;
        public RatecardService(IRepository<Pricing> ratecardRepository, UserManager userManager, ILogger<RatecardService> logger, 
            IRepository<RequestTicket> ticketRepository)
        {
            _ratecardRepository = ratecardRepository;
            _userManager = userManager;
            this.logger = logger;
            ccAvenueService = new CCAvenueService();
            _ticketRepository = ticketRepository;
        }

        //[AbpAuthorize(PermissionNames.Pages_Pricing)]
        [AbpAllowAnonymous]
        public async Task<RatecardListDto> Create(CreateRatecardInput input)
        {
            var ratecard = ObjectMapper.Map<Pricing>(input);
            var ratecardEntity = await _ratecardRepository.InsertAsync(ratecard);
            CurrentUnitOfWork.SaveChanges();
            return ObjectMapper.Map<RatecardListDto>(ratecardEntity);
        }

        [AbpAllowAnonymous]
        public async Task<RatecardListDto> Get(string pricingKey)
        {
            var price = _ratecardRepository.FirstOrDefault(x => x.PricingKey == pricingKey && !x.IsDeleted);
            return ObjectMapper.Map<RatecardListDto>(price);
        }

        [AbpAuthorize]
        public async Task<RatecardDto> GetTotalPrice(string pricingKey)
        {
            if(!AbpSession.UserId.HasValue)
                throw new UserFriendlyException("Not Authorised");

            var user = _userManager.GetUserById(AbpSession.UserId.Value);

            var price = _ratecardRepository.FirstOrDefault(x => x.PricingKey == pricingKey && !x.IsDeleted);
            if( price != null)
            {
                var discountRate = 0.0;
                switch (user.FMTCategory)
                {
                    case FMTUserCategory.None:
                    case FMTUserCategory.General:
                        discountRate = 0.0;
                        break;
                    case FMTUserCategory.Working_Women:
                    case FMTUserCategory.International_Sports_Personnel:
                    case FMTUserCategory.Journalists:
                    case FMTUserCategory.Defence_Personnel:
                    case FMTUserCategory.Gender_Neutral:
                    case FMTUserCategory.Ca_cma_tax_advocated:
                    case FMTUserCategory.Differently_Abled:
                    case FMTUserCategory.Startups:
                        discountRate = 10.0;
                        break;
                    default:
                        discountRate = 0.0;
                        break;
                }
                var taxRate = 18.0;

                var discountAmount = (int)Math.Round((double)(discountRate * Decimal.ToDouble(price.Price)) / 100);
                var sellingPrice = Decimal.ToDouble(price.Price) - discountAmount;

                var taxAmount = (int)Math.Round((double)(taxRate * sellingPrice) / 100);
                var totalPrice = sellingPrice + taxAmount;

                var priceDto = ObjectMapper.Map<RatecardDto>(price);
                priceDto.DiscountRate = discountRate;
                priceDto.DiscountAmount = discountAmount;
                priceDto.TaxRate = taxRate;
                priceDto.TaxAmount = taxAmount;
                priceDto.TotalAmount = totalPrice;

                return priceDto;
            }

            throw new UserFriendlyException("Pricing key not found");
        }

        [AbpAllowAnonymous]
        public async Task<ListResultDto<RatecardListDto>> GetAll()
        {
            var ratecards = await _ratecardRepository.GetAllListAsync();

            return new ListResultDto<RatecardListDto>(
                    ObjectMapper.Map<List<RatecardListDto>>(ratecards));
        }

        [AbpAllowAnonymous]
        public async Task<string> ImportRateCard(IFormFile file)
        {
            var uploads = Path.Combine(AppContext.BaseDirectory, "Uploads", DateTime.UtcNow.ToString("ddMMyyhhmmssdd"));

            List<CreateRatecardInput> ratecards = new List<CreateRatecardInput>();
            DataSet excelData = new DataSet();

            IExcelDataReader reader = null;
            string output = string.Empty;
            try
            {
                Directory.CreateDirectory(uploads);
                if (file.Length > 0)
                {
                    var filePath = Path.Combine(uploads, file.FileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                        if (file.FileName.EndsWith(".xls"))
                        {
                            reader = ExcelReaderFactory.CreateBinaryReader(fileStream);
                        }
                        else if (file.FileName.EndsWith(".xlsx"))
                        {
                            reader = ExcelReaderFactory.CreateOpenXmlReader(fileStream);
                        }
                        else
                        {
                            output = string.Format("The file format {} is not supported.", file.FileName);
                            logger.LogError(output);
                        }

                        if(reader == null)
                        {
                            return output;
                        }

                        excelData = reader.AsDataSet();
                        reader.Close();

                        if (excelData != null && excelData.Tables.Count > 0)
                        {
                            foreach (DataTable rcData in excelData.Tables)
                            {
                                for (int i = 1; i < rcData.Rows.Count; i++)
                                {
                                    CreateRatecardInput rc = new CreateRatecardInput();
                                    rc.PricingKey = Convert.ToString(rcData.Rows[i][0]).Trim();
                                    rc.Service = Convert.ToString(rcData.Rows[i][1]).Trim();
                                    rc.SubService = Convert.ToString(rcData.Rows[i][3]).Trim();
                                    rc.Description = Convert.ToString(rcData.Rows[i][4]).Trim();
                                    rc.Price = Convert.ToDecimal(rcData.Rows[i][5]);
                                    ratecards.Add(rc);
                                }

                            }
                        }

                        //insert records
                        int count = 0;
                        if(ratecards.Count > 0)
                        {
                            foreach (var item in ratecards)
                            {
                                var rcEntity = _ratecardRepository.FirstOrDefault( x => x.PricingKey == item.PricingKey );
                                if (rcEntity != null)
                                {
                                    rcEntity.Price = item.Price;
                                    rcEntity.Service = item.Service;
                                    rcEntity.SubService = item.SubService;
                                    rcEntity.Description = item.Description;

                                    await _ratecardRepository.UpdateAsync(rcEntity);
                                }
                                else
                                {
                                    var ratecard = ObjectMapper.Map<Pricing>(item);
                                    var ratecardEntity = await _ratecardRepository.InsertAsync(ratecard);
                                }
                                CurrentUnitOfWork.SaveChanges();
                                count++;
                            }
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                output = ex.Message;
                logger.LogError(ex.Message, ex);
            }

            return output;
        }

        [AbpAuthorize]
        public async Task<string> GetPaymentParams(string orderId)
        {
            if (!AbpSession.UserId.HasValue)
                throw new UserFriendlyException("Not Authorised");

            var ticketEntity = _ticketRepository.FirstOrDefault(x => x.OrderId == orderId);
            if(ticketEntity == null)
            {
                throw new UserFriendlyException("Not Authorised");
            }

            var user = _userManager.GetUserById(AbpSession.UserId.Value);

            ccAvenueService.GetEncryptedUrl(orderId, ticketEntity.Price, user.Name, user.EmailAddress, ticketEntity.Id.ToString());
            
            return ccAvenueService.GetEncryptedUrl(orderId, ticketEntity.Price, user.Name, user.EmailAddress, ticketEntity.Id.ToString());

        }

        //public async Task<string> GetProcessedResponse(string data)
        //{
        //    if (!AbpSession.UserId.HasValue)
        //        throw new UserFriendlyException("Not Authorised");

        //    return ccAvenueService.DecryptResponse(data);

        //}
    }
}
