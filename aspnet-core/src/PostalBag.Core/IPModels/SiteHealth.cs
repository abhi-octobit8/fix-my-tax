using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.IPModels
{
    [Table("SiteHealth")]
    public class SiteHealth : Entity, IHasCreationTime
    {
        [ForeignKey(nameof(SiteId))]
        public Site ScanSite { get; set; }
        public int SiteId { get; set; }

        public SiteState State { get; set; }
        public SiteInternetState InternetState { get; set; }

        public SiteReaderState ReaderState { get; set; }


        public DateTime CreationTime { get; set; }
    }
}
