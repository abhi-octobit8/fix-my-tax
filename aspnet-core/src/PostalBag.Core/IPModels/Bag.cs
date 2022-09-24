using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.IPModels
{
    [Table("Bags")]
    public class Bag : Entity, IHasCreationTime
    {
        [Required]
        public string BagNumber { get; set; }

        [Required]
        public string EpcNumber { get; set; }
        public DateTime CreationTime { get; set; }

        public Bag()
        {
            CreationTime = Clock.Now;
        }
    }
}
