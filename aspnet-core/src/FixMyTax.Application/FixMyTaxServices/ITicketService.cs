using Abp.Application.Services;
using Abp.Application.Services.Dto;
using FixMyTax.FixMyTaxModels;
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

        Task<TicketListDto> Create(CreateTicketInput input);

        Task<ResponseDto> CreateResponse(CreateResponseInput input);

        Task<ResponseDto> GetResponseByRequestId(int requestId);

        Task<bool> UpdateAssignment(UpdateAssignment updateAssignment);

        Task<bool> UpdateTicketStatus(int requestTicketId, TicketStatusInput status);

    }
}
