using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    [Table("Responses")]
    public class TicketResponse : FullAuditedEntity
    {
        [ForeignKey(nameof(RequestTicketId))]
        public RequestTicket Ticket { get; set; }
        public int RequestTicketId { get; set; }
        public string Response { get; set; }
        public ICollection<Attachment> Attachments { get; set; }
    }
}
