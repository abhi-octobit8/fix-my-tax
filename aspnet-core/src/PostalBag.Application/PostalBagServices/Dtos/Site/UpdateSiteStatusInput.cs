using PostalBag.IPModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos
{
    public class UpdateSiteStatusInput
    {
        [Required]
        public string SiteCode { get; set; }
        public SiteState State { get; set; }
        public SiteInternetState InternetState { get; set; }

        public SiteReaderState ReaderState { get; set; }
    }
}
