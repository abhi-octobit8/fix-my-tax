using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;
using FixMyTax.FixMyTaxModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.Jobs
{
    public class BackgroundSlotGenerator : PeriodicBackgroundWorkerBase, ISingletonDependency
    {
        private readonly IRepository<Slot> _slotRepository;

        public BackgroundSlotGenerator(AbpTimer timer, IRepository<Slot> slotRepository)
            :base(timer)
        {
            _slotRepository = slotRepository;
            Timer.Period = 60000;
        }

        [UnitOfWork]
        protected override void DoWork()
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                DateTime startdate = DateTime.Today;
                DateTime enddate = DateTime.Today.AddDays(20);

                while( startdate < enddate)
                {
                    if (startdate.DayOfWeek != DayOfWeek.Sunday && startdate.DayOfWeek != DayOfWeek.Saturday)
                    {
                        var slots = _slotRepository.GetAll().Where(x => x.Date == startdate).ToList();
                        if (slots.Count() == 0)
                        {
                            //create slots
                            Slot slot1 = new Slot()
                            {
                                Date = startdate,
                                SlotName = "Slot1 3:00 PM to 3:20 PM",
                                StartTime = startdate.AddHours(15).AddMinutes(0),
                                EndTime = startdate.AddHours(15).AddMinutes(20),
                                Status = SlotStatus.Available
                            };

                            Slot slot2 = new Slot()
                            {
                                Date = startdate,
                                SlotName = "Slot2 3:30 PM to 3:50 PM",
                                StartTime = startdate.AddHours(15).AddMinutes(30),
                                EndTime = startdate.AddHours(15).AddMinutes(50),
                                Status = SlotStatus.Available
                            };

                            Slot slot3 = new Slot()
                            {
                                Date = startdate,
                                SlotName = "Slot3 4:00 PM to 4:20 PM",
                                StartTime = startdate.AddHours(16).AddMinutes(00),
                                EndTime = startdate.AddHours(16).AddMinutes(20),
                                Status = SlotStatus.Available
                            };

                            Slot slot4 = new Slot()
                            {
                                Date = startdate,
                                SlotName = "Slot4 4:30 PM to 4:50 PM",
                                StartTime = startdate.AddHours(16).AddMinutes(30),
                                EndTime = startdate.AddHours(16).AddMinutes(50),
                                Status = SlotStatus.Available
                            };

                            Slot slot5 = new Slot()
                            {
                                Date = startdate,
                                SlotName = "Slot5 5:00 PM to 5:20 PM",
                                StartTime = startdate.AddHours(17).AddMinutes(00),
                                EndTime = startdate.AddHours(17).AddMinutes(20),
                                Status = SlotStatus.Available
                            };

                            Slot slot6 = new Slot()
                            {
                                Date = startdate,
                                SlotName = "Slot6 5:30 PM to 5:50 PM",
                                StartTime = startdate.AddHours(17).AddMinutes(30),
                                EndTime = startdate.AddHours(17).AddMinutes(50),
                                Status = SlotStatus.Available
                            };

                            _slotRepository.Insert(slot1);
                            _slotRepository.Insert(slot2);
                            _slotRepository.Insert(slot3);
                            _slotRepository.Insert(slot4);
                            _slotRepository.Insert(slot5);
                            _slotRepository.Insert(slot6);
                        }
                    }
                    startdate = startdate.AddDays(1);
                    CurrentUnitOfWork.SaveChanges();
                }
            }
        }
    }
}
