using Abp.AutoMapper;
using PostalBag.IPModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos
{
    /// <summary>
    /// 
    /// </summary>
    [AutoMapFrom(typeof(Bag))]
    public class BagDto
    {
        public string BagNumber { get; set; }
        public string EpcNumber { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
