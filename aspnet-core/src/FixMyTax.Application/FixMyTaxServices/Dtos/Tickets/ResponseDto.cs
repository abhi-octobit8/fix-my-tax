using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using FixMyTax.FixMyTaxModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Tickets
{
    [AutoMapFrom(typeof(TicketResponse))]
    public class ResponseDto : FullAuditedEntity
    {

    }
}
