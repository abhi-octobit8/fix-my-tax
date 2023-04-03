using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using FixMyTax.Authorization.Roles;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Comments;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using FixMyTax.Users.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    [AbpAuthorize]
    public class CommentService : AsyncCrudAppService<Comment,CommentDto, int, int, CreateCommentInput, CommentDto>, ICommentService
    {
        private readonly IRepository<Comment> _commentRepository;

        public CommentService(IRepository<Comment> commentRepository) : base(commentRepository)
        { 
            _commentRepository = commentRepository;
        }

        public override async Task<CommentDto> CreateAsync(CreateCommentInput input)
        {
            var comment = ObjectMapper.Map<Comment>(input);
            var commentEntity = await _commentRepository.InsertAsync(comment);
            return ObjectMapper.Map<CommentDto>(commentEntity);
        }

        public override async Task<PagedResultDto<CommentDto>> GetAllAsync(int requestTicketId)
        {
            var comments = await _commentRepository.GetAll().Where(x => x.RequestTicketId == requestTicketId).OrderByDescending(x => x.CreationTime).ToListAsync();
            return new PagedResultDto<CommentDto>(comments.Count,
                ObjectMapper.Map<List<CommentDto>>(comments)
            );
        }

        //public async Task<ListResultDto<CommentDto>> GetByRequestTicketId(int requestTicketId)
        //{
        //    var comments = await _commentRepository.GetAll().Where(x => x.RequestTicketId == requestTicketId).OrderByDescending(x => x.CreationTime).ToListAsync();
        //    return new ListResultDto<CommentDto>(
        //        ObjectMapper.Map<List<CommentDto>>(comments)
        //        );
        //}
    }
}
