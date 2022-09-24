using PostalBag.IPModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PostalBag.PostalBagServices.Dtos
{
    public class GetAllSitesInput
    {
        public String Filter { get; set; }
        public SiteState? State { get; set; }
        public SiteInternetState? InternetState { get; set; }

        public String Keyword { get; set; }
    }
}
