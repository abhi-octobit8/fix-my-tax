using Abp.Application.Services;
using Abp.Application.Services.Dto;
using FixMyTax.FixMyTaxServices.Dtos.Comments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices
{
    public interface ICommentService : IAsyncCrudAppService<CommentDto, int, int, CreateCommentInput, CommentDto>
    {
    }
}
