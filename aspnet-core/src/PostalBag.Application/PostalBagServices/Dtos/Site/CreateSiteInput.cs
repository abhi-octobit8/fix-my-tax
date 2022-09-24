using PostalBag.IPModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace PostalBag.PostalBagServices.Dtos
{
    [AutoMapTo(typeof(Site))]
    public class CreateSiteInput
    {
        [Required]
        public string SiteName { get; set; }
        [Required]
        public string SiteCode { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string ContactPerson { get; set; }
        [Required]
        public string ContactNumber { get; set; }
    }
}
