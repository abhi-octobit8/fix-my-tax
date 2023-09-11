using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.zoom
{
    public class ZoomMeeting
    {
        public string Topic { get; set; }
        public string Time { get; set; }
        public string JoinUrl { get; set; }
        public string MeetingId { get; set; }
        public string Passcode { get; set; }
    }
}
