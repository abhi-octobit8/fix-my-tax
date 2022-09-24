using Abp.Application.Services.Dto;
using Abp.AutoMapper;
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
    public class SiteDto : EntityDto
    {
        public string SiteName { get; set; }
        public string SiteCode { get; set; }
        public string Location { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
    }
}
