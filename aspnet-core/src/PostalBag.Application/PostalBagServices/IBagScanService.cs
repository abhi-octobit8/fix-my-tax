using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PostalBag.PostalBagServices.Dtos;
using PostalBag.PostalBagServices.Dtos.BagScan;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices
{
    /// <summary>
    /// Interface for bag scan service
    /// </summary>
    public interface IBagScanService : IApplicationService
    {
        Task<ListResultDto<BagScanListDto>> GetAll(GetAllBagScanInput input);
        Task<ListResultDto<BagScanListDto>> GetSearchByTag(SearchByTagInput input);
        Task<ListResultDto<BagScanListDto>> GetSearchBySite(SearchBySiteInput input);

        Task<BagScanOutputDto> Create(CreateBagScanInput input);
    }
}
