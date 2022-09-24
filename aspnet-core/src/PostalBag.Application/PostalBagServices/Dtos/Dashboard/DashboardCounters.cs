using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos
{
    public class DashboardCounters
    {
        public int TotalSites { get; set; }
        public int OnlineSites { get; set; }
        public int TotalScans { get; set; }
        public int ScansToday { get; set; }
    }
}
