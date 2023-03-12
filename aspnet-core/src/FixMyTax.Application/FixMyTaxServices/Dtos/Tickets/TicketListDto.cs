using Abp.Application.Services.Dto;
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
    /// <summary>
    /// 
    /// </summary>
    [AutoMapFrom(typeof(RequestTicket))]
    public class TicketListDto : FullAuditedEntityDto
    {
        public FixMyTaxServiceType FixMyTaxServiceType { get; set; }
        public ServiceType ServiceType { get; set; }
        public string Section { get; set; }
        public string SubSection { get; set; }
        public string Subject { get; set; }
        public string Question { get; set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; }
        public ICollection<AttachmentDto> Attachments { get; set; }

    }
}
