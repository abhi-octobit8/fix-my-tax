using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.zoom
{
    public class ZoomMeetingRequest
    {
        public string topic { get; set; }
        public int duration { get; set; }

        public string start_time { get; set; }
        public string agenda { get; set; }
        public int type { get; set; }
        public string timezone { get; set; }

        public ZoomMeetingRequest()
        {
            duration = 20;
            type = 2;
            agenda = "FixMyTax Consultation";
            timezone = "Asia/Calcutta";
        }
    }
}
