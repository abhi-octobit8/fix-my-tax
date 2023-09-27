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
        public FixMyTaxServiceType FixMyTaxServiceType { get; set; }
        public ServiceType ServiceType { get; set; }
        public string Section { get; set; }
        public string SubSection { get; set; }
        public string Subject { get; set; }
        public string Question { get;set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; }
        public string Price { get; set; }
        public PaymentStatus PaymentStaus { get; set; }
        public string TransactionNumber { get; set; }
        public string PaymentInfo { get; set; }
        public ICollection<Attachment> Attachments { get; set; }
        public int AssignedUserId { get; set; }
        
        public int AssignmentByUserId { get; set; }
        public DateTime AssignmentDatetime { get; set; }

        public int? SlotId { get; set; }
        public string ExtensionData { get; set; }

        public string OrderId { get; set; }

        public string ZoomJoinUrl { get; set; }
        public string ZoomTopic { get; set; }
        public string ZoomTime { get; set; }
        public string ZoomMeetingId { get; set; }
        public string ZoomMeetingPasscode { get; set; }
    }
}
