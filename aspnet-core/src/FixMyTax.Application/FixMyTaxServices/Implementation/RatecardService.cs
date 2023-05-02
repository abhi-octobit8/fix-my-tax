using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using FixMyTax.Authorization;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Ratecard;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
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
        public RatecardService(IRepository<Pricing> ratecardRepository, UserManager userManager)
        {
            _ratecardRepository = ratecardRepository;
            _userManager = userManager;
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

        public Task<RatecardListDto> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
