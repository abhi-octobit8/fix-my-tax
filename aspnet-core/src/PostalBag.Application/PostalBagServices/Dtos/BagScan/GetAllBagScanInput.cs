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
    public class GetAllBagScanInput
    {
        public string BagNumber { get; set; }

        public string SiteCode { get; set; }

        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }

    }
}
