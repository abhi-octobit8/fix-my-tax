using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    [Table("Tickets")]
    public class RequestTicket : FullAuditedEntity, IExtendableObject
    {
        public string Subject { get; set; }
        public string Question { get;set; }
        public string Description { get; set; }

        public NoticeType NoticeType { get; set; }
        public TicketStatus Status { get; set; }
        public ICollection<Attachment> Attachments { get; set; }    

        public string ExtensionData { get; set; }
    }
}
