using Abp.AutoMapper;
using FixMyTax.FixMyTaxModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Comments
{
    [AutoMapTo(typeof(Comment))]
    public class CreateCommentInput
    {
        public string Text { get; set; }

        public int RequestTicketId { get; set; }
    }
}
