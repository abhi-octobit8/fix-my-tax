using Abp.Domain.Repositories;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using PostalBag.IPModels;
using PostalBag.PostalBagServices.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Implementation
{
    public class BagService : PostalBagAppServiceBase, IBagService
    {
        private readonly IRepository<Bag> bagRepository;
        private readonly ILogger<BagScanService> logger;
        public BagService(IRepository<Bag> _bagRepository, ILogger<BagScanService> _logger)
        {
            bagRepository = _bagRepository;
            logger = _logger;
        }
        public async Task<BagDto> GetTag(CreateBagInput input)
        {
            
                Bag bag = new Bag();
                if (!string.IsNullOrEmpty(input.BagNumber))
                {
                    bag = await bagRepository.SingleAsync(x => x.BagNumber == input.BagNumber);
                }
                else
                {
                    var dataEpcNumberFormat = string.Concat("0C", input.EpcNumber);
                    bag = await bagRepository.SingleAsync(x => x.EpcNumber == dataEpcNumberFormat);
                }
                var bagDto = ObjectMapper.Map<BagDto>(bag);
                if (bagDto.EpcNumber.Length > 2)
                {
                    bagDto.EpcNumber = bagDto.EpcNumber.Substring(2, bag.EpcNumber.Length - 2);
                }
                return bagDto;
        }

        public Task Create(CreateBagInput input)    
        {
            throw new NotImplementedException();
        }

        public async Task<ImportBagOutput> ImportBagTag(IFormFile file)
        {
            var uploads = Path.Combine(AppContext.BaseDirectory, "Uploads", DateTime.UtcNow.ToString("ddMMyyhhmmssdd"));
            List<BagDto> bags = new List<BagDto>();
            DataSet excelData = new DataSet();
            ImportBagOutput output = new ImportBagOutput();
            IExcelDataReader reader = null;
            try
            {
                //save file
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
                        }else if (file.FileName.EndsWith(".xlsx"))
                        {
                            reader = ExcelReaderFactory.CreateOpenXmlReader(fileStream);
                        }else
                        {
                            string error = string.Format("The file format {} is not supported.", file.FileName);
                            output.Success = false;
                            output.Msg = error;
                            logger.LogError(error);
                        }

                        if(reader != null)
                        {
                            excelData = reader.AsDataSet();
                            reader.Close();

                            if (excelData != null && excelData.Tables.Count > 0)
                            {
                                foreach(DataTable bagData in excelData.Tables)
                                {
                                    for (int i = 1; i < bagData.Rows.Count; i++)
                                    {
                                        BagDto bag = new BagDto();
                                        bag.BagNumber = Convert.ToString(bagData.Rows[i][0]).Trim();
                                        bag.EpcNumber = "0C" + Convert.ToString(bagData.Rows[i][1]).Trim();
                                        bag.CreationTime = DateTime.UtcNow;
                                        bags.Add(bag);
                                    }

                                }

                              
                            }
                        }
                        else
                        {
                            string error = string.Format("Error in reading the file {} is not supported.", file.FileName);
                            output.Success = false;
                            output.Msg = error;
                            logger.LogError(error);
                        }

                    }
                }

                //insert records
                int count = 0;
                if (bags.Count > 0)
                {
                    foreach (var item in bags)
                    {
                        try
                        {
                            var entity = new Bag()
                            {
                                BagNumber = item.BagNumber,
                                EpcNumber = item.EpcNumber,
                                CreationTime = DateTime.UtcNow,
                            };
                            entity = await bagRepository.InsertAsync(entity);
                            count++;
                        }
                        catch(Exception ex)
                        {
                            logger.LogError(ex.Message, ex);
                        }
                    }
                    
                }

                string msg = string.Format("{0} records inserted out of {1} recods", count, bags.Count);
                output.Success = true;
                output.Msg = msg;
                logger.LogInformation(msg);
            }
            catch(Exception ex)
            {
                output.Success = false;
                output.Msg = ex.Message;
                logger.LogError(ex.Message, ex);
            }

            return output;
        }
    }
}
