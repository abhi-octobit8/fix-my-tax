using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using PostalBag.Authorization;
using PostalBag.IPModels;
using PostalBag.PostalBagServices.Dtos;
using PostalBag.PostalBagServices.Dtos.BagScan;
using PostalBag.PostalBagServices.Dtos.Dashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Implementation
{
    [AbpAuthorize(PermissionNames.Pages_Dashboard)]
    public class DashboardService : PostalBagAppServiceBase, IDashboardService
    {
        private readonly IRepository<Site> siteRepository;
        private readonly IRepository<BagScan> bagScanRepository;

        public DashboardService(IRepository<Site> _siteRepository, IRepository<BagScan> _bagScanRepository)
        {
            siteRepository = _siteRepository;
            bagScanRepository = _bagScanRepository;
        }

        public async Task<ListResultDto<BagScanListDto>> GetLast50Scans(GetAllBagScanInput input)
        {
            var scans = await bagScanRepository
                .GetAll()
                .OrderByDescending(t => t.CreationTime)
                .Take(50)
                .ToListAsync();

            return new ListResultDto<BagScanListDto>(
                ObjectMapper.Map<List<BagScanListDto>>(scans)
            );
        }

        public async Task<DashboardCounters> GetDashboardCounters()
        {
            DashboardCounters counters = new DashboardCounters();

            counters.TotalSites = await siteRepository.CountAsync();
            counters.OnlineSites = await siteRepository.CountAsync(x => x.State == SiteState.Ready);
            counters.TotalScans = await bagScanRepository.CountAsync();
            counters.ScansToday = await bagScanRepository.CountAsync( x => x.ScanTime > DateTime.Today);
            return counters;
        }

        public async Task<ListResultDto<DayWiseScanCount>> GetLast7DaysScans(GetAllBagScanInput input)
        {
            List<DayWiseScanCount> daysScans = new List<DayWiseScanCount>();
            DateTime[] last7Days = Enumerable.Range(0, 7)
                .Select(i => DateTime.Now.Date.AddDays(-i))
                .ToArray();

            foreach(var day in last7Days)
            {
                DayWiseScanCount count = new DayWiseScanCount();
                count.ScanDate = day;
                count.Count = await bagScanRepository.CountAsync(x => x.ScanTime > day && x.ScanTime < day.AddDays(1));
                daysScans.Add(count);
            }

            return new ListResultDto<DayWiseScanCount>(daysScans);

        }

        public Task<EmailSentDto> ContactSupport(ContactUsInput input)
        {
            throw new NotImplementedException();
        }
    }
}
