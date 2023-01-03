using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    [Table("Files")]
    public class Attachment : Entity, IHasCreationTime
    {
        public string Filename { get;set; }
        public byte[] FileData { get; set; }
        public DateTime CreationTime { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
