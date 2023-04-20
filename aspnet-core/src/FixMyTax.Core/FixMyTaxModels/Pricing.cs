using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    [Table("Ratecard")]
    public class Pricing : FullAuditedEntity
    {
        public string PricingKey { get; set; }
        public string Service { get; set; }
        public string SubService { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
