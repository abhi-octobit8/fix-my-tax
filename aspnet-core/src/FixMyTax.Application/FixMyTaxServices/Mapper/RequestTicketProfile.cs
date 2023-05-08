using Abp.AutoMapper;
using Abp.Domain.Repositories;
using AutoMapper;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Comments;
using FixMyTax.FixMyTaxServices.Dtos.Slots;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Mapper
{
    public class RequestTicketProfile : Profile
    {
        private readonly UserManager _userManager;
        public RequestTicketProfile(UserManager userManager)
        {
            _userManager = userManager;

            CreateMap<RequestTicket, TicketListDto>()
                .ForMember(dest => dest.AssignedUserName, src => src.MapFrom(x => x.AssignedUserId != 0 ? _userManager.GetUserById(x.AssignedUserId).Name : ""))
                .ForMember(dest => dest.AssignmentByUserName, src => src.MapFrom(x => x.AssignmentByUserId != 0 ? _userManager.GetUserById(x.AssignmentByUserId).Name : ""))
                .ForMember(dest => dest.CreatorUserName, src => src.MapFrom(x => _userManager.GetUserById(x.CreatorUserId.Value).Name));

            CreateMap<RequestTicket, TicketDto>()
                .ForMember(dest => dest.AssignedUserName, src => src.MapFrom(x => x.AssignedUserId != 0 ?  _userManager.GetUserById(x.AssignedUserId).Name : ""))
                .ForMember(dest => dest.AssignmentByUserName, src => src.MapFrom(x => x.AssignmentByUserId != 0 ? _userManager.GetUserById(x.AssignmentByUserId).Name : ""))
                .ForMember(dest => dest.CreatorUserName, src => src.MapFrom(x => _userManager.GetUserById(x.CreatorUserId.Value).Name));

            CreateMap<Comment, CommentDto>()
                .ForMember(dest => dest.CreatorUserName, src => src.MapFrom(x => _userManager.GetUserById(x.CreatorUserId.Value).Name));
        }
    }
}
