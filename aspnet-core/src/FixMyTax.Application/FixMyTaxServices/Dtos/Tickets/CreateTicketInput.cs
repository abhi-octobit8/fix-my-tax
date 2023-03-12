using Abp.AutoMapper;
using FixMyTax.FixMyTaxModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Tickets
{
    [AutoMapTo(typeof(RequestTicket))]
    public class CreateTicketInput
    {
        public FixMyTaxServiceType FixMyTaxServiceType { get; set; }  
        public ServiceType ServiceType { get; set; }
        public string Section { get; set; }
        public string SubSection { get; set; }        
        public string Subject { get; set; }
        public string Question { get; set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; }
        public string Price { get; set; }
        public PaymentStatus PaymentStaus { get; set; }
        public string TransactionNumber { get; set; }
        public string PaymentInfo { get; set; }
        public string ExtensionData { get; set; }
    }
}
