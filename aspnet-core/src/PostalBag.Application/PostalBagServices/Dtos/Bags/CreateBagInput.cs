using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos
{
    [AutoMapTo(typeof(PostalBag.IPModels.Bag))]
    public class CreateBagInput
    {
        public string BagNumber { get; set; }

        public string EpcNumber { get; set; }
    }
}
