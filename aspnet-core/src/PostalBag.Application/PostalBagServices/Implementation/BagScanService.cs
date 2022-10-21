using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PostalBag.Authorization;
using PostalBag.IPModels;
using PostalBag.PostalBagServices.Dtos;
using PostalBag.PostalBagServices.Dtos.BagScan;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Implementation
{
    [AbpAuthorize(PermissionNames.Pages_Search)]
    public class BagScanService : PostalBagAppServiceBase, IBagScanService
    {
        private readonly IRepository<BagScan> bagScanRepository;
        private readonly IRepository<Site> siteRepository;
        private readonly IRepository<Bag> bagRepository;
        private readonly ILogger<BagScanService> logger;
        private int skipDurationInMinutes = 240;

        public BagScanService(IRepository<BagScan> _bagScanRepository, IRepository<Site> _siteRepository, IRepository<Bag> _bagRepository, ILogger<BagScanService> _logger)
        {
            bagScanRepository = _bagScanRepository;
            siteRepository = _siteRepository;
            bagRepository = _bagRepository;
            logger = _logger;
        }

        [AbpAllowAnonymous]        
        public async Task<BagScanOutputDto> Create(CreateBagScanInput input)
        {
            var bagScan = ObjectMapper.Map<BagScan>(input);
            String epc = input.BagNumber;
            BagScanOutputDto output = new BagScanOutputDto();
            try
            {
                var site = siteRepository.Single(s => s.SiteCode == bagScan.SiteCode);
                if(site == null)
                {
                    output.Success = false;
                    output.ErrorMsg = string.Format("Sitecode not found in system {0}", input.SiteCode);
                    output.Epc = epc;
                    return output;
                }
                var bag = bagRepository.FirstOrDefault(s => s.EpcNumber == epc);
                if(bag == null)
                {
                    output.Success = false;
                    output.ErrorMsg = string.Format("Epc not found in system {0}", epc);
                    output.Epc = epc;
                    return output;
                }
                var lastScan = await GetLastScanned(bag.BagNumber);
                bool insertRecord = true;
                if(lastScan != null)
                {
                    var timeSpan = DateTime.UtcNow - lastScan.CreationTime;
                    if( timeSpan.Duration().TotalMinutes < skipDurationInMinutes)
                    {
                        insertRecord = false;
                        output.Success = false;
                        output.ErrorMsg = string.Format("Duplicate scan for TID {0} before {1} minutes", bag.BagNumber, skipDurationInMinutes);
                        output.Epc = epc;
                        output.TID = bag.BagNumber;
                        return output;
                    }
                }

                if (insertRecord)
                {
                    bagScan.BagId = bag.Id;
                    bagScan.SiteId = site.Id;
                    bagScan.BagNumber = bag.BagNumber;
                    bagScan.CreationTime = DateTime.UtcNow;
                    await bagScanRepository.InsertAsync(bagScan);
                    output.Success = true;
                    output.ErrorMsg = String.Empty;
                    output.Epc = epc;
                    output.TID = bag.BagNumber;
                }
                
            }
            catch(Exception ex)
            {
                logger.LogError(ex, "Error: bag or site code not found");
                logger.LogInformation("Site or bag not found for site code :" + input.SiteCode + " bag epc :" + epc );
                output.Success = false;
                output.ErrorMsg = string.Format("Error {0}", ex.Message);
                output.Epc = epc;
            }
            return output;
            
        }

        public async Task<ListResultDto<BagScanListDto>> GetAll(GetAllBagScanInput input)
        {
            var scans = await bagScanRepository
                .GetAll().Include(x => x.ScanSite)
                .WhereIf(string.IsNullOrEmpty(input.BagNumber), t => t.BagNumber == input.BagNumber)
                .WhereIf(string.IsNullOrEmpty(input.SiteCode), t => t.SiteCode == input.SiteCode)
                .WhereIf(input.Start.HasValue && input.End.HasValue, t => t.ScanTime >= input.Start && t.ScanTime <= input.End)
                .OrderByDescending(t => t.ScanTime)
                .ToListAsync();

            return new ListResultDto<BagScanListDto>(
                ObjectMapper.Map<List<BagScanListDto>>(scans)
            );
        }

        public async Task<ListResultDto<BagScanListDto>> GetSearchByTag(SearchByTagInput input)
        {
            var scans = await bagScanRepository
                .GetAll().Include(x => x.ScanSite)
                .WhereIf(!string.IsNullOrEmpty(input.BagNumber), t => t.BagNumber == input.BagNumber)
                .WhereIf(input.StartDate.HasValue && input.EndDate.HasValue, t => t.ScanTime >= input.StartDate && t.ScanTime <= input.EndDate)
                .OrderByDescending(t => t.ScanTime)
                .ToListAsync();
            return new ListResultDto<BagScanListDto>(
                ObjectMapper.Map<List<BagScanListDto>>(scans)
            );
        }

        public async Task<ListResultDto<BagScanListDto>> GetSearchBySite(SearchBySiteInput input)
        {
            List<BagScan> scans = new List<BagScan>();
            if(!string.IsNullOrEmpty(input.Filter) && input.Filter.ToLower() == "today")
            {
                scans = await bagScanRepository
                .GetAll().Include(x => x.ScanSite)
                .WhereIf(!string.IsNullOrEmpty(input.SiteCode), t => t.SiteCode == input.SiteCode)
                .Where(x => x.ScanTime > DateTime.Today )
                .OrderByDescending(t => t.ScanTime)
                .ToListAsync();
            }
            else
            {
                scans = await bagScanRepository
                .GetAll().Include(x => x.ScanSite)
                .WhereIf(!string.IsNullOrEmpty(input.SiteCode), t => t.SiteCode == input.SiteCode)
                .WhereIf(input.StartDate.HasValue && input.EndDate.HasValue, t => t.ScanTime >= input.StartDate && t.ScanTime <= input.EndDate)
                .OrderByDescending(t => t.ScanTime)
                .ToListAsync();
            }
            return new ListResultDto<BagScanListDto>(
                ObjectMapper.Map<List<BagScanListDto>>(scans)
            );
        }

        private async Task<BagScan> GetLastScanned(string bagTag)
        {
            try
            {
                var bagscan = await bagScanRepository.Query(x => x.OrderByDescending(t => t.CreationTime)).FirstOrDefaultAsync( x => x.BagNumber == bagTag);
                return bagscan;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "scans not found for bagNumber " + bagTag);
                return null;
            }
        }
    }
}
