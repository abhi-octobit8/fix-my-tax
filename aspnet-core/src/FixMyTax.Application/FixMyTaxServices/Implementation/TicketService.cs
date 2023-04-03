using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Net.Mail;
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
using System.Linq.Dynamic.Core;
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
        private readonly IEmailSender _emailSender;


        public TicketService(IRepository<RequestTicket> ticketRepository, IRepository<TicketResponse> responseRepository,
            IRepository<Attachment> fileRepository, UserManager userManager, IEmailSender emailSender)
        {
            _ticketRepository = ticketRepository;
            _responseRepository = responseRepository;
            _fileRepository = fileRepository;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        public async Task<TicketListDto> Create(CreateTicketInput input)
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);
            if(roles.Contains(StaticRoleNames.Tenants.Admin) || roles.Contains(StaticRoleNames.Tenants.Advocate))
            {
                throw new UserFriendlyException("Only customers can create ticket");
            }
            var ticket = ObjectMapper.Map<RequestTicket>(input);
            ticket.Status = TicketStatus.New;
            var tickeEntity = await _ticketRepository.InsertAsync(ticket);
            return ObjectMapper.Map<TicketListDto>(tickeEntity);
        }

        public async Task<ResponseDto> CreateResponse(CreateResponseInput input)
        {
            var response = ObjectMapper.Map<TicketResponse>(input);
            var requestEntity = _ticketRepository.FirstOrDefault(x => x.Id == input.RequestTicketId);
            if (requestEntity == null)
            {
                throw new UserFriendlyException("Ticket not found");
            }
            requestEntity.Status = TicketStatus.Responded;
            _ticketRepository.Update(requestEntity);
            var entity = await _responseRepository.InsertAsync(response);

            return ObjectMapper.Map<ResponseDto>(entity);
        }

        public async Task<ResponseDto> GetResponseByRequestId(int requestId)
        {
            var resposne = _responseRepository.GetAll().Include(x => x.Attachments).Where(x => x.RequestTicketId == requestId).FirstOrDefault();
            return ObjectMapper.Map<ResponseDto>(resposne);
        }

        public async Task<TicketDto> Get(int id)
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);
            RequestTicket ticket = new RequestTicket();
            if (roles.Contains(StaticRoleNames.Tenants.Customer))
            {
                ticket = _ticketRepository.GetAll().Include(x => x.Attachments).Where(x => x.Id == id).FirstOrDefault();

                if (ticket.CreatorUserId != AbpSession.UserId)
                {
                    throw new UserFriendlyException("Not Authorised");
                }
            }
            else if (roles.Contains(StaticRoleNames.Tenants.Advocate))
            {
                ticket = _ticketRepository.GetAll().Include(x => x.Attachments).Where(x => x.Id == id).FirstOrDefault();
                if (ticket.AssignedUserId != AbpSession.UserId)
                {
                    throw new UserFriendlyException("Not Authorised");
                }
            }
            else if (roles.Contains(StaticRoleNames.Tenants.Admin))
            {
                //ticket = await _ticketRepository.GetAsync(id);
                ticket = _ticketRepository.GetAll().Include(x => x.Attachments).Where(x => x.Id == id).FirstOrDefault();
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
                .OrderByDescending(t => t.CreationTime)
                .ToListAsync();
            }
            else if (roles.Contains(StaticRoleNames.Tenants.Advocate))
            {
                tickets = await _ticketRepository
                .GetAll().Include(x => x.Attachments)
                .Where(t => t.AssignedUserId == AbpSession.UserId)
                .OrderByDescending(t => t.CreationTime)
                .ToListAsync();
            }
            else if (roles.Contains(StaticRoleNames.Tenants.Admin))
            {
                tickets = await _ticketRepository
                .GetAll().Include(x => x.Attachments)
                .OrderByDescending(t => t.CreationTime)
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
                    entity.AssignmentByUserId = (int)user.Id;
                    entity.AssignedUserId = assignments.AssignUserId;
                    entity.AssignmentDatetime = current;
                    entity.Status = TicketStatus.Assigned;
                    _ticketRepository.Update(entity);
                }
                else
                {
                    throw new UserFriendlyException("Ticket not found");
                }

                var assignedUser = _userManager.GetUserById(assignments.AssignUserId);
                _emailSender.SendAsync(
                    to: assignedUser.EmailAddress,
                    subject: "Ticket Assigned",
                    body: $"<b>Hi {assignedUser.Name} </b> <br/>A new ticket has been assigned to you. Please ensure timely response for teh ticket.",
                    isBodyHtml: true
                );
            }

            return true;
        }

        public async Task<bool> UpdateTicketStatus(int requestTicketId, TicketStatus status)
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);

            if (!roles.Contains(StaticRoleNames.Tenants.Admin) && !roles.Contains(StaticRoleNames.Tenants.Advocate))
            {
                throw new UserFriendlyException("Not Authorised");
            }

            var entity = _ticketRepository.FirstOrDefault(x => x.Id == requestTicketId);
            if (entity != null)
            {
                entity.Status = status;
                _ticketRepository.Update(entity);
            }
            else
            {
                throw new UserFriendlyException("Ticket not found");
            }

            return true;
        }
    }
}
