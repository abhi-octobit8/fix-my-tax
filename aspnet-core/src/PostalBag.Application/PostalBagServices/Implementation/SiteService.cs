using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using PostalBag.Authorization;
using PostalBag.IPModels;
using PostalBag.PostalBagServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Implementation
{
    [AbpAuthorize(PermissionNames.Pages_Sites)]
    public class SiteService : PostalBagAppServiceBase, ISiteService
    {
        private readonly IRepository<Site> _siteRepository;
        private readonly IRepository<SiteHealth> _siteHealthRepository;

        public SiteService(IRepository<Site> siteRepository, IRepository<SiteHealth> siteHealthRepository)
        {
            _siteRepository = siteRepository;
            _siteHealthRepository = siteHealthRepository;
        }

        [AbpAuthorize(PermissionNames.Pages_Sites_Create)]
        public async Task Create(CreateSiteInput input)
        {
            var site = ObjectMapper.Map<Site>(input);
            await _siteRepository.InsertAsync(site);
        }

        public async Task<ListResultDto<SiteListDto>> GetAll(GetAllSitesInput input)
        {
            if(!string.IsNullOrEmpty(input.Filter) && input.Filter.ToLower() == "online")
            {
                input.InternetState = SiteInternetState.Online;
            }
            else
            {
                input.InternetState = null;
            }

            var sites = await _siteRepository
                .GetAll()
                .WhereIf(input.InternetState.HasValue, t => t.InternetState == input.InternetState)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.SiteName.Contains(input.Keyword))
                .OrderBy(t => t.CreationTime)
                .ToListAsync();

            return new ListResultDto<SiteListDto>(
                ObjectMapper.Map<List<SiteListDto>>(sites)
            );
        }

       
        public async Task<SiteListDto> Get(int id)
        {
            var sites = await _siteRepository.GetAsync(id);
            return ObjectMapper.Map<SiteListDto>(sites);           
        }

        public async Task<SiteListDto> Update(UpdateSiteInput input)
        {

            var siteEntity = _siteRepository.FirstOrDefault(x => x.Id == input.Id);

            siteEntity.ContactNumber = input.ContactNumber;
            siteEntity.ContactPerson = input.ContactPerson;
            siteEntity.Location =  input.Location;
            siteEntity.SiteName = input.SiteName;
            siteEntity.SiteCode = input.SiteCode;
            siteEntity = await _siteRepository.UpdateAsync(siteEntity);

            return ObjectMapper.Map<SiteListDto>(siteEntity);
        }

        [AbpAllowAnonymous]
        public async Task UpdateSiteStatus(UpdateSiteStatusInput input)
        {
            try
            {
                var siteEntity = _siteRepository.FirstOrDefault(x => x.SiteCode == input.SiteCode);
                siteEntity.InternetState = input.InternetState;
                siteEntity.ReaderState = input.ReaderState;
                siteEntity.State = input.State;

                await _siteRepository.UpdateAsync(siteEntity);

                var siteEntityHealth = _siteHealthRepository.FirstOrDefault(x => x.SiteId == siteEntity.Id);
                if (siteEntityHealth != null)
                {
                    siteEntityHealth.ReaderState = input.ReaderState;
                    siteEntityHealth.InternetState = input.InternetState;
                    siteEntityHealth.State = input.State;
                    siteEntityHealth.CreationTime = DateTime.UtcNow;

                    await _siteHealthRepository.UpdateAsync(siteEntityHealth);
                }
                else
                {
                    var siteHealth = new SiteHealth()
                    {
                        SiteId = siteEntity.Id,
                        ReaderState = input.ReaderState,
                        InternetState = input.InternetState,
                        State = input.State,
                        CreationTime = DateTime.UtcNow
                    };

                    await _siteHealthRepository.InsertAsync(siteHealth);


                }


            }
            catch (Exception ex)
            {
                Logger.Error("error", ex);
            }
        }
    }
}
