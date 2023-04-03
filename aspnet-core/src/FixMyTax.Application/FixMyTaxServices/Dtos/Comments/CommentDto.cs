using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using FixMyTax.FixMyTaxModels;

namespace FixMyTax.FixMyTaxServices.Dtos.Comments
{
    [AutoMapFrom(typeof(Comment))]
    public class CommentDto : FullAuditedEntityDto
    {
        public string Text { get; set; }

        public int RequestTicketId { get; set; }

        public string CreatorUserName { get; set; }
    }
}
