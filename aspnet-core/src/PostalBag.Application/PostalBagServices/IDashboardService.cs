using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PostalBag.PostalBagServices.Dtos;
using PostalBag.PostalBagServices.Dtos.BagScan;
using PostalBag.PostalBagServices.Dtos.Dashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices
{
    /// <summary>
    /// Interface of dashboard service
    /// </summary>
    public interface IDashboardService : IApplicationService
    {
        Task<DashboardCounters> GetDashboardCounters();
        Task<ListResultDto<BagScanListDto>> GetLast50Scans(GetAllBagScanInput input);
        Task<ListResultDto<DayWiseScanCount>> GetLast7DaysScans(GetAllBagScanInput input);

        Task<EmailSentDto> ContactSupport(ContactUsInput input); 

    }
}
