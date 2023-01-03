using Abp.Application.Services;
using Abp.Application.Services.Dto;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices
{
    public interface ITicketService : IApplicationService
    {
        Task<ListResultDto<TicketListDto>> GetAll();
        Task<TicketDto> Get(int id);

        System.Threading.Tasks.Task Create(CreateTicketInput input);

        System.Threading.Tasks.Task CreateResponse(CreateResponseInput input);


    }
}
