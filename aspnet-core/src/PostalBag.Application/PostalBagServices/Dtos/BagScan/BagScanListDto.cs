using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PostalBag.IPModels;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;

namespace PostalBag.PostalBagServices.Dtos.BagScan
{
    [AutoMapFrom(typeof(PostalBag.IPModels.BagScan))]
    public class BagScanListDto : EntityDto, IHasCreationTime
    {
        public string BagNumber { get; set; }
        public string SiteCode { get; set; }

        public Bag Bag { get; set; }
        public int BagId { get; set; }

        public SiteDto ScanSite { get; set; }
        public int SiteId { get; set; }

        public DateTime ScanTime { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
