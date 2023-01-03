using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    [Table("Events")]
    public class Event : FullAuditedEntity 
    {
        public string EventName { get; set; }
        public string EventDate { get; set; }
        public string Attendees { get; set; }
        public string MeetingInvite { get; set; }
        public string JsonData { get; set; }

    }
}
