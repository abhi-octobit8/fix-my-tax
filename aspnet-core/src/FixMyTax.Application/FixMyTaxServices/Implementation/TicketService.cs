using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Configuration;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Net.Mail;
using Abp.UI;
using FixMyTax.Authorization;
using FixMyTax.Authorization.Roles;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Slots;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using FixMyTax.FixMyTaxServices.Dtos.zoom;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
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
        private readonly IRepository<UnpaidRequestTicktes> _orderTicketRepository;
        private readonly IRepository<TicketResponse> _responseRepository;
        private readonly IRepository<Slot> _slotRepository;
        private readonly IRepository<Attachment> _fileRepository;
        private readonly UserManager _userManager;
        private readonly IEmailSender _emailSender;
        private readonly FixMyTaxEmailSender _fixMyTaxEmail;


        public TicketService(IRepository<RequestTicket> ticketRepository, IRepository<TicketResponse> responseRepository, IRepository<UnpaidRequestTicktes> orderTicketRepository,
        IRepository<Attachment> fileRepository, UserManager userManager, IEmailSender emailSender, IRepository<Slot> slotRepository)
        {
            _orderTicketRepository = orderTicketRepository;
            _ticketRepository = ticketRepository;
            _responseRepository = responseRepository;
            _fileRepository = fileRepository;
            _userManager = userManager;
            _emailSender = emailSender;
            _slotRepository = slotRepository;
            _fixMyTaxEmail = new FixMyTaxEmailSender(_emailSender);
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
            ticket.Subject = ticket.Description;
            var tickeEntity = await _ticketRepository.InsertAsync(ticket);
            ZoomMeeting meeting = null;
            if (tickeEntity.SlotId != null && tickeEntity.SlotId>0)
            {
                var slot = _slotRepository.FirstOrDefault(x => x.Id == tickeEntity.SlotId);
                if (slot == null)
                {
                    throw new UserFriendlyException("slot not found");
                }
                slot.RequestTicketId = tickeEntity.Id;
                slot.Status = SlotStatus.Booked;
                slot = await _slotRepository.UpdateAsync(slot);

                //schedule zoom meeting
                try
                {
                    ZoomMeetingRequest meet = new ZoomMeetingRequest();
                    meet.topic = input.Description;
                    meet.start_time = slot.StartTime.ToString("yyyy-MM-ddTHH:mm:ss");

                    ZoomService service = new ZoomService();
                    meeting = await service.CreateMeeting(meet);
                }
                catch(Exception ex)
                {
                    Logger.Error(ex.Message, ex);
                }
                
            }
            CurrentUnitOfWork.SaveChanges();
            if(meeting != null)
            {
                tickeEntity.Description = meeting.JoinUrl;
                tickeEntity = await _ticketRepository.UpdateAsync(tickeEntity);
                CurrentUnitOfWork.SaveChanges();
            }
            if(meeting != null)
            {
                try
                {
                    _fixMyTaxEmail.SendZoomMeetingEmail(user.EmailAddress, meeting.JoinUrl, meeting.Topic, meeting.Time, meeting.MeetingId, meeting.Passcode);
                }
                catch(Exception e)
                {
                    Logger.Error(e.Message, e);
                }
            }
            return ObjectMapper.Map<TicketListDto>(tickeEntity);
        }

        public async Task<OrderDto> CreateOrder(CreateTicketInput input)
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Contains(StaticRoleNames.Tenants.Admin) || roles.Contains(StaticRoleNames.Tenants.Advocate))
            {
                throw new UserFriendlyException("Only customers can create order");
            }

            if (input.SlotId > 0)
            {
                var slot = _slotRepository.FirstOrDefault(x => x.Id == input.SlotId);
                if (slot == null)
                {
                    throw new UserFriendlyException("slot not found");
                }
            }
            var order = ObjectMapper.Map<UnpaidRequestTicktes>(input);
            order.Status = TicketStatus.New;
            order.Subject = order.Description;
            order.OrderId = Guid.NewGuid().ToString();
            order.PaymentStaus = FixMyTaxModels.PaymentStatus.Pending;
            var tickeEntity = await _orderTicketRepository.InsertAsync(order);
            CurrentUnitOfWork.SaveChanges();
            return ObjectMapper.Map<OrderDto>(tickeEntity);
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
            CurrentUnitOfWork.SaveChanges();
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

            var ticketDto = ObjectMapper.Map<TicketDto>(ticket);
            if(ticketDto.SlotId != null)
            {
                var slot = _slotRepository.FirstOrDefault(x => x.Id == ticketDto.SlotId);
                if (slot != null)
                {
                    ticketDto.Slot = ObjectMapper.Map<SlotDto>(slot);
                }
            }

            return ticketDto;
        }

        public async Task<ListResultDto<TicketListDto>> GetAll()
        {
            try
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

                var ticketList = new ListResultDto<TicketListDto>(
                    ObjectMapper.Map<List<TicketListDto>>(tickets)
                );

                foreach(var ticket in ticketList.Items)
                {
                    if (ticket.SlotId != null)
                    {
                        var slot = _slotRepository.FirstOrDefault(x => x.Id == ticket.SlotId);
                        if (slot != null)
                        {
                            ticket.Slot = ObjectMapper.Map<SlotDto>(slot);
                        }
                    }
                }

                return ticketList;
            }
            catch(Exception ex)
            {
                Logger.Error(ex.Message, ex);
                throw new Exception("Internal server error");
            }
            
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

                try
                {
                    _fixMyTaxEmail.SendAssignmentEventEmail(assignedUser.EmailAddress, ObjectMapper.Map<TicketDto>(entity));
                }
                catch(Exception ex)
                {
                    Logger.Error(ex.Message, ex);
                }
            }

            return true;
        }

        public async Task<bool> UpdateTicketStatus(int requestTicketId, TicketStatusInput status)
        {
            var user = _userManager.GetUserById(AbpSession.UserId.Value);
            var roles = await _userManager.GetRolesAsync(user);

            var isAuthorised = false;

            if (roles.Contains(StaticRoleNames.Tenants.Admin) || roles.Contains(StaticRoleNames.Tenants.Advocate))
                isAuthorised = true;
            
            if(!isAuthorised)
                throw new UserFriendlyException("Not Authorised");

            var entity = _ticketRepository.FirstOrDefault(x => x.Id == requestTicketId);
            if (entity != null)
            {
                entity.Status = status.Status;
                _ticketRepository.Update(entity);
            }
            else
            {
                throw new UserFriendlyException("Ticket not found");
            }
            CurrentUnitOfWork.SaveChanges();

            var creator = _userManager.GetUserById(entity.CreatorUserId.Value);
            if (creator != null)
            {
                try
                {
                    _fixMyTaxEmail.SendTicketStatusUpdateEventEmail(creator.EmailAddress, ObjectMapper.Map<TicketDto>(entity));
                }
                catch (Exception ex)
                {
                    Logger.Error(ex.Message, ex);
                }
            }
            
            return true;
        }
    }
}
