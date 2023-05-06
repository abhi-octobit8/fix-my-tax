using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    [Table("Slots")]
    public class Slot : FullAuditedEntity
    {
        public DateTime Date { get; set; }
        public string SlotName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public SlotStatus Status { get; set; }
        public int? RequestTicketId { get; set; }

    }
}
