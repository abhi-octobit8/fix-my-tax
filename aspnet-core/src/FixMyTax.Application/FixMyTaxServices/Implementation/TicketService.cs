using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using FixMyTax.Authorization;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    public class TicketService : FixMyTaxAppServiceBase, ITicketService
    {
        private readonly IRepository<RequestTicket> _ticketRepository;
        private readonly IRepository<TicketResponse> _responseRepository;
        private readonly IRepository<Attachment> _fileRepository;


        public TicketService(IRepository<RequestTicket> ticketRepository, IRepository<TicketResponse> responseRepository,
            IRepository<Attachment> fileRepository)
        {
            _ticketRepository = ticketRepository;
            _responseRepository = responseRepository;
            _fileRepository = fileRepository;
        }

        public async Task Create(CreateTicketInput input)
        {
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
            var ticket = await _ticketRepository.GetAsync(id);

            return ObjectMapper.Map<TicketDto>(ticket);
        }

        public async Task<ListResultDto<TicketListDto>> GetAll()
        {
            var tickets = await _ticketRepository
                .GetAll().Include(x => x.Attachments)
                .Where(t => t.CreatorUserId == AbpSession.UserId)
                .OrderBy(t => t.CreationTime)
                .ToListAsync();

            return new ListResultDto<TicketListDto>(
                ObjectMapper.Map<List<TicketListDto>>(tickets)
            );
        }
    }
}
