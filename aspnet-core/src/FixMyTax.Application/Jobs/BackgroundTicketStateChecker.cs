using Abp.AutoMapper;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Net.Mail;
using Abp.ObjectMapping;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using FixMyTax.FixMyTaxServices.Implementation;
using System;
using System.Linq;

namespace FixMyTax.Jobs
{
    public class BackgroundTicketStateChecker : PeriodicBackgroundWorkerBase, ISingletonDependency
    {
        private readonly IRepository<RequestTicket> _ticketRepository;
        private readonly IEmailSender _emailSender;
        private readonly FixMyTaxEmailSender _fixMyTaxEmail;
        private readonly UserManager _userManager;

        public BackgroundTicketStateChecker(AbpTimer timer, IRepository<RequestTicket> ticketRepository, IEmailSender emailSender, UserManager userManager)
        : base(timer)
        {
            _ticketRepository = ticketRepository;
            Timer.Period = 86400000;
            _emailSender = emailSender;
            _userManager = userManager;
            _fixMyTaxEmail = new FixMyTaxEmailSender(_emailSender);

        }

        [UnitOfWork]
        protected override void DoWork()
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var tickets = _ticketRepository.GetAllList().Where(x => x.Status == TicketStatus.New || x.Status == TicketStatus.Assigned);
                bool sendMail = false;
                foreach (var ticket in tickets)
                {
                    sendMail = false;
                    if (ticket.LastModificationTime != null)
                    {
                        var days = (DateTime.Now - ticket.LastModificationTime.Value).TotalDays;
                        if (days > 2)
                        {
                            sendMail = true;
                        }
                    }
                    else
                    {
                        var days = (DateTime.Now - ticket.CreationTime).TotalDays;
                        if (days > 2)
                        {
                            sendMail = true;
                        }
                    }

                    if (sendMail)
                    {
                       
                        try
                        {
                            var assignedName = ticket.AssignedUserId > 0 ? _userManager.GetUserById(ticket.AssignedUserId).Name : "Unassigned";
                            _fixMyTaxEmail.SendTicketOverdueEmail(ticket.Id.ToString(), ticket.Section, assignedName);
                        }
                        catch(Exception ex)
                        {
                            Logger.Error(ex.Message, ex);
                        }
                    }
                }
            }
        }
    }
}
