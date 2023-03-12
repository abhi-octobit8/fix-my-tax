using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.UI;
using FixMyTax.Authorization;
using FixMyTax.Authorization.Roles;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    [AbpAuthorize]
    public class TicketService : FixMyTaxAppServiceBase, ITicketService
    {
        private readonly IRepository<RequestTicket> _ticketRepository;
        private readonly IRepository<TicketResponse> _responseRepository;
        private readonly IRepository<Attachment> _fileRepository;
        private readonly UserManager _userManager;


        public TicketService(IRepository<RequestTicket> ticketRepository, IRepository<TicketResponse> responseRepository,
            IRepository<Attachment> fileRepository, UserManager userManager)
        {
            _ticketRepository = ticketRepository;
            _responseRepository = responseRepository;
            _fileRepository = fileRepository;
            _userManager = userManager;
        }

        public async Task Create(CreateTicketInput input)
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);
            if(roles.Contains(StaticRoleNames.Tenants.Admin) || roles.Contains(StaticRoleNames.Tenants.Advocate))
            {
                throw new UserFriendlyException("Only customers can create ticket");
            }
            var ticket = ObjectMapper.Map<RequestTicket>(input);
            ticket.Status = TicketStatus.New;
            await _ticketRepository.InsertAsync(ticket);
        }

        public async Task CreateResponse(CreateResponseInput input)
        {
            var response = ObjectMapper.Map<TicketResponse>(input);
            await _responseRepository.InsertAsync(response);
        }

        public async Task<TicketDto> Get(int id)
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);
            RequestTicket ticket = new RequestTicket();
            if (roles.Contains(StaticRoleNames.Tenants.Customer))
            {
                ticket = await _ticketRepository.GetAsync(id);
                if(ticket.CreatorUserId != AbpSession.UserId)
                {
                    throw new UserFriendlyException("Not Authorised");
                }
            }
            else if (roles.Contains(StaticRoleNames.Tenants.Advocate))
            {
                ticket = await _ticketRepository.GetAsync(id);
                if(ticket.AssignedUserId != AbpSession.UserId)
                {
                    throw new UserFriendlyException("Not Authorised");
                }
            }
            else if (roles.Contains(StaticRoleNames.Tenants.Admin))
            {
                ticket = await _ticketRepository.GetAsync(id);
            }

            return ObjectMapper.Map<TicketDto>(ticket);
        }

        public async Task<ListResultDto<TicketListDto>> GetAll()
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);

            List<RequestTicket> tickets = new List<RequestTicket>();
            if (roles.Contains(StaticRoleNames.Tenants.Customer))
            {
                tickets = await _ticketRepository
                .GetAll().Include(x => x.Attachments)
                .Where(t => t.CreatorUserId == AbpSession.UserId)
                .OrderBy(t => t.CreationTime)
                .ToListAsync();
            }
            else if (roles.Contains(StaticRoleNames.Tenants.Advocate))
            {
                tickets = await _ticketRepository
                .GetAll().Include(x => x.Attachments)
                .Where(t => t.AssignedUserId == AbpSession.UserId)
                .OrderBy(t => t.CreationTime)
                .ToListAsync();
            }
            else if (roles.Contains(StaticRoleNames.Tenants.Admin))
            {
                tickets = await _ticketRepository
                .GetAll().Include(x => x.Attachments)
                .OrderBy(t => t.CreationTime)
                .ToListAsync();
            }

            return new ListResultDto<TicketListDto>(
                ObjectMapper.Map<List<TicketListDto>>(tickets)
            );
        }

        public async Task<bool> UpdateAssignment(UpdateAssignment assignments)
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);

            if (!roles.Contains(StaticRoleNames.Tenants.Admin))
            {
                throw new UserFriendlyException("Not Authorised");
            }
            DateTime current = DateTime.Now;
            foreach(var ticketId in assignments.TicketIds)
            {
                var entity = _ticketRepository.FirstOrDefault(x => x.Id == ticketId);
                if(entity != null)
                {
                    entity.AssignedUserId = assignments.AssignUserId;
                    entity.AssignmentDatetime = current;
                    _ticketRepository.Update(entity);
                }
                else
                {
                    throw new UserFriendlyException("Ticket not found");
                }
            }

            return true;
        }
    }
}
