using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using FixMyTax.FixMyTaxModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Ratecard
{
    [AutoMapFrom(typeof(Pricing))]
    public class RatecardDto : FullAuditedEntityDto
    {
        public string PricingKey { get; set; }
        public decimal Price { get; set; }
        public double DiscountRate { get; set; }

        public double DiscountAmount { get; set; }
        public double TaxRate { get; set; }
        public double TaxAmount { get; set; }
        public double TotalAmount { get; set; }
    }
}
