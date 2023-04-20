using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    [Table("Proofs")]
    public class CategoryProofFiles : Entity, IHasCreationTime
    {
        public string Filename { get; set; }
        public byte[] FileData { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
