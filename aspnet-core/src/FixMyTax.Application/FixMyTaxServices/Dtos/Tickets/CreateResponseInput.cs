using Abp.AutoMapper;
using FixMyTax.FixMyTaxModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Tickets
{
    [AutoMapTo(typeof(TicketResponse))]
    public class CreateResponseInput
    {
        public int RequestTicketId { get; set; }
        public string Response { get; set; }
        public ICollection<AttachmentDto> Attachments { get; set; }
    }
}
