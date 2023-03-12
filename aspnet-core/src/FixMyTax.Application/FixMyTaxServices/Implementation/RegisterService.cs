using Abp.Domain.Repositories;
using Abp.MailKit;
using Abp.Net.Mail;
using Abp.Runtime.Session;
using Abp.UI;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Registration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    public class RegisterService : FixMyTaxAppServiceBase, IRegisterServices
    {
        private readonly IRepository<RequestTicket> _ticketRepository;
        private readonly IRepository<TicketResponse> _responseRepository;
        private readonly IRepository<Attachment> _fileRepository;
        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly UserManager _userManager;
        private readonly IEmailSender _emailSender;
        //EmailSettingNames

        public RegisterService(IRepository<RequestTicket> ticketRepository, IRepository<TicketResponse> responseRepository,
            IRepository<Attachment> fileRepository, UserRegistrationManager userRegistrationManager, UserManager userManager, IEmailSender emailSender)
        {
            _ticketRepository = ticketRepository;
            _responseRepository = responseRepository;
            _fileRepository = fileRepository;
            _userRegistrationManager = userRegistrationManager;
            _userManager = userManager;
           _emailSender = emailSender;
        }

        public async Task<RegistrationOutput> Create(InputRegistration input)
        {
            var password = RandomString(10, true);
            RegistrationOutput output = new RegistrationOutput();
            
            try
            {
                var result = await _userManager.CheckDuplicateUsernameOrEmailAddressAsync(1, input.Email, input.Email);
                var user = await _userRegistrationManager.RegisterAsync(
                input.Name,
                string.Empty,
                input.Email,
                input.Email,
                password,
                true);
                await _userManager.SetPhoneNumberAsync(user, input.PhoneNumber);
                output.UserId = user.Id;
                output.UserName = input.Email;
                output.Password = password;

                //create ticket
                if (input.TicketDetails != null)
                {
                    RequestTicket ticket = new RequestTicket();
                    ticket.ServiceType = (FixMyTaxModels.ServiceType)input.TicketDetails.ServiceType;
                    ticket.FixMyTaxServiceType = (FixMyTaxModels.FixMyTaxServiceType)input.TicketDetails.FixMyTaxServiceType;
                    ticket.Section = input.TicketDetails.Section;
                    ticket.SubSection = input.TicketDetails.SubSection;
                    ticket.Question = input.TicketDetails.Question;
                    ticket.Description = input.TicketDetails.Description;
                    ticket.Price = input.TicketDetails?.Price;
                    ticket.TransactionNumber = input.TicketDetails.TransactionNumber;
                    ticket.PaymentInfo = input.TicketDetails.PaymentInfo;
                    ticket.PaymentStaus = (FixMyTaxModels.PaymentStatus)input.TicketDetails.PaymentStaus;
                    ticket.ExtensionData = input.TicketDetails.ExtensionData;
                    ticket.Status = TicketStatus.New;
                    ticket.CreatorUserId = user.Id;
                    ticket.CreationTime = DateTime.Now;
                    var id = _ticketRepository.InsertAndGetId(ticket);
                    output.TicketId = id;
                }

                output.Error = false;
            }
            catch(Exception ex)
            {
                output.Error = true;
                output.ErrorMsg = ex.Message;
            }



        //    _emailSender.Send(
        //to: input.Email,
        //subject: "You have a new task!",
        //body: $"A new task is assigned for you: <b>{input.Name}</b>",
        //isBodyHtml: true
        // );
            return output;
        }


        private string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }
    }
}
