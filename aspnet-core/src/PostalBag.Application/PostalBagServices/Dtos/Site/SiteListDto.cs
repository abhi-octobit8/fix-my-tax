using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using PostalBag.IPModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos
{
    /// <summary>
    /// 
    /// </summary>
    [AutoMapFrom(typeof(Site))]
    public class SiteListDto : EntityDto, IHasCreationTime
    {
        public string SiteName { get; set; }
        public string SiteCode { get; set; }
        public string Location { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
        public SiteState State { get; set; }
        public SiteInternetState InternetState { get; set; }
        public DateTime CreationTime { get; set; }

        public string Longitude { get; set; }
        public string Latitude { get; set; }
    }
}
