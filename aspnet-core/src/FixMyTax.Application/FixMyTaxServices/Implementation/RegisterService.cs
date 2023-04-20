﻿using Abp.Domain.Repositories;
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
                true,
                input.UserCategory, 
                input.PanCardNumber,
                input.AdharNumber, 
                input.GSTNumber);
                await _userManager.SetPhoneNumberAsync(user, input.PhoneNumber);
                
                output.UserId = user.Id;
                output.UserName = input.Email;
                //need to remove
                output.Password = password;
                output.Error = false;
            }
            catch(Exception ex)
            {
                output.Error = true;
                output.ErrorMsg = ex.Message;
            }

            _emailSender.Send(
                    to: input.Email,
                    subject: "FixMyTax Account Created",
                    body: $"<b>Hi {input.Email} </b> <br/>A new acount created for you with following details. <br/> username: <b>{output.UserName}</b> <br/> password : <b>{output.Password}</b>",
                    isBodyHtml: true
                );

            //_emailSender.Send(
            //    to: "karsathi.ajit@gmail.com",
            //    subject: "You have a new task!",
            //    body: $"A new task is created on the portal  task link: <b>{output.id}</b>",
            //    isBodyHtml: true
            //);
            _emailSender.Send(
                to: "contact@xoqovo.com",
                subject: "You have a new task!",
                body: $"A new task is created on the portal  task link: <b>{output.id}</b>",
                isBodyHtml: true
            );
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
