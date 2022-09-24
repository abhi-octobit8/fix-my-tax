using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos.BagScan
{
    public class BagScanOutputDto
    {
        public bool Success { get; set; }
        public string TID { get; set; }
        public string ErrorMsg { get; set; }
        public string Epc { get;set; }

    }
}
