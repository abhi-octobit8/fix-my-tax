using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using FixMyTax.FixMyTaxModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.Users.Dto
{
    [AutoMapFrom(typeof(CategoryProofFiles))]
    public class CategoryProofFilesDto : EntityDto, IHasCreationTime
    {
        public string Filename { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
