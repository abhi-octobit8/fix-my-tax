using Abp.AutoMapper;
using FixMyTax.FixMyTaxModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Ratecard
{
    [AutoMapTo(typeof(Pricing))]
    public class CreateRatecardInput
    {
        public string PricingKey { get; set; }
        public string Service { get; set; }
        public string SubService { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
