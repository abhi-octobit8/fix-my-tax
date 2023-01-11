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
        public string Subject { get; set; }
        public string Question { get; set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; }
    }
}
