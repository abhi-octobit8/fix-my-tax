using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using FixMyTax.FixMyTaxModels;

namespace FixMyTax.FixMyTaxServices.Dtos.Tickets
{
    [AutoMapFrom(typeof(Attachment))]
    public class AttachmentDto : EntityDto, IHasCreationTime
    {
        public string Filename { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
