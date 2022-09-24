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
    [Table("BagScans")]
    public class BagScan : Entity, IHasCreationTime
    {
        [Required]
        public string BagNumber { get; set; }

        [Required]
        public string SiteCode { get; set; }


        [ForeignKey(nameof(BagId))]
        public Bag Bag { get; set; }
        public int BagId { get; set; }


        [ForeignKey(nameof(SiteId))]
        public Site ScanSite { get; set; }
        public int SiteId { get; set; }

        [Required]
        public DateTime ScanTime { get; set; }
        public DateTime CreationTime { get; set; }

        public BagScan()
        {
            CreationTime = Clock.Now;
        }
    }
}
