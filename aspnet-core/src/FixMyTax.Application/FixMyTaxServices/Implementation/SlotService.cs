using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Net.Mail;
using Abp.UI;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Ratecard;
using FixMyTax.FixMyTaxServices.Dtos.Slots;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    public class SlotService : FixMyTaxAppServiceBase, ISlotService
    {
        private readonly IRepository<RequestTicket> _ticketRepository;
        private readonly IRepository<Slot> _slotRepository;
        private readonly UserManager _userManager;
        private readonly IEmailSender _emailSender;

        public SlotService(IRepository<RequestTicket> ticketRepository, IRepository<Slot> slotRepository,
            UserManager userManager, IEmailSender emailSender)
        {
            _ticketRepository = ticketRepository;
            _slotRepository = slotRepository;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        public async Task<SlotDto> BookSlot(int ticketId, int slotId)
        {
            var slot = _slotRepository.FirstOrDefault(x => x.Id == slotId);
            if(slot == null)
            {
                throw new UserFriendlyException("slot not found");
            }

            var entity = _ticketRepository.FirstOrDefault(x => x.Id == ticketId);
            if( entity == null)
            {
                throw new UserFriendlyException("Ticket not found");
            }

            slot.RequestTicketId = entity.Id;
            slot.Status = SlotStatus.Booked;
            slot = await _slotRepository.UpdateAsync(slot);
            entity.SlotId = slot.Id;
            await _ticketRepository.UpdateAsync(entity);
            CurrentUnitOfWork.SaveChanges();

            return ObjectMapper.Map<SlotDto>(slot);
        }

        public async Task<SlotDto> CancelSlot(int slotId)
        {
            var slot = _slotRepository.FirstOrDefault(x => x.Id == slotId);
            if (slot == null)
            {
                throw new UserFriendlyException("slot not found");
            }
            slot.RequestTicketId = null;
            slot.Status = SlotStatus.Cancelled;
            slot = await _slotRepository.UpdateAsync(slot);
            return ObjectMapper.Map<SlotDto>(slot);
        }

        public async Task<ListResultDto<SlotDto>> GetAll()
        {
            var slots = await _slotRepository.GetAllListAsync(x => x.Date >= DateTime.Today && x.Date < DateTime.Today.AddDays(15));
            return new ListResultDto<SlotDto>(
                    ObjectMapper.Map<List<SlotDto>>(slots));
        }

        public async Task<ListResultDto<SlotListDto>> GetAvaiableSlots(DateTime input)
        {
            var slots = await _slotRepository.GetAllListAsync(x => x.Date == input && x.Status == SlotStatus.Available);
            return new ListResultDto<SlotListDto>(
                    ObjectMapper.Map<List<SlotListDto>>(slots));
        }

        public async Task<SlotDto> MakeSlotAvailable(int slotId)
        {
            var slot = _slotRepository.FirstOrDefault(x => x.Id == slotId);
            if (slot == null)
            {
                throw new UserFriendlyException("slot not found");
            }
            slot.RequestTicketId = null;
            slot.Status = SlotStatus.Available;
            slot = await _slotRepository.UpdateAsync(slot);
            return ObjectMapper.Map<SlotDto>(slot);
        }
    }
}
