using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos.Dashboard
{
    public class DayWiseScanCount
    {
        public DateTime ScanDate { get; set; }
        public int Count { get; set; }

    }
}
