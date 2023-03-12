using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    [Table("Comments")]
    public class Comment : FullAuditedEntity
    {
        public string Text { get; set; }

        public int RequestTicketId { get; set; }
    }
}
