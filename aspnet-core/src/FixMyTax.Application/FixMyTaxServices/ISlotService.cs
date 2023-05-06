using Abp.Application.Services;
using Abp.Application.Services.Dto;
using FixMyTax.FixMyTaxServices.Dtos.Slots;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices
{
    public interface ISlotService : IApplicationService
    {
        Task<ListResultDto<SlotDto>> GetAll();
        Task<ListResultDto<SlotListDto>> GetAvaiableSlots(DateTime input);

        Task<SlotDto> CancelSlot(int slotId);
        Task<SlotDto> BookSlot(int ticketId, int slotId);
        Task<SlotDto> MakeSlotAvailable(int slotId);


    }
}
