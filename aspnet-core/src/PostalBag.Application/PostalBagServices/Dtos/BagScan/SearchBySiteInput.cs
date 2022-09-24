using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos.BagScan
{
    /// <summary>
    /// 
    /// </summary>
    public class SearchBySiteInput
    {
        public string Filter { get; set; }
        public string SiteCode { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
