using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using FixMyTax.FixMyTaxModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Slots
{
    [AutoMapFrom(typeof(Slot))]
    public class SlotDto : FullAuditedEntityDto
    {
        public DateTime Date { get; set; }
        public string SlotName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public SlotStatus Status { get; set; }
        public int RequestTicketId { get; set; }
    }
}
