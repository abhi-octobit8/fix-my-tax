using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PostalBag.PostalBagServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices
{
    /// <summary>
    /// Interface of site service
    /// </summary>
    public interface ISiteService : IApplicationService
    {
        Task<ListResultDto<SiteListDto>> GetAll(GetAllSitesInput input);

        Task<SiteListDto> Get(int id);

        System.Threading.Tasks.Task Create(CreateSiteInput input);

        System.Threading.Tasks.Task<SiteListDto> Update(UpdateSiteInput input);

        System.Threading.Tasks.Task UpdateSiteStatus(UpdateSiteStatusInput input);

    }
}
