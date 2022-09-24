using Abp.AutoMapper;
using PostalBag.IPModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos
{
    [AutoMapTo(typeof(PostalBag.IPModels.BagScan))]
    public class CreateBagScanInput
    {
        [Required]
        public string BagNumber { get; set; }
        [Required]
        public string SiteCode { get; set; }
        [Required]
        public int BagId { get; set; }
        [Required]
        public int SiteId { get; set; }
        [Required]
        public DateTime ScanTime { get; set; }

    }
}
