using Abp.Net.Mail;
using Abp.Reflection.Extensions;
using FixMyTax.Configuration;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Registration;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using FixMyTax.FixMyTaxServices.Implementation;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Bcpg;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Sockets;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace FixMyTax
{
    public class FixMyTaxEmailSender
    {
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IEmailSender _emailSender;
        private string _alertEmail;
        private string _eventEmail;
        private string _bccEventEmail;
        private string _templateLocation;
        private string _fromEmail;
        public FixMyTaxEmailSender(IEmailSender emailSender)
        {
            _appConfiguration = AppConfigurations.Get(
                typeof(FixMyTaxEmailSender).GetAssembly().GetDirectoryPathOrNull()
            );

            _emailSender = emailSender;

            _alertEmail = _appConfiguration["FixmyTax:AlertNotification"];
            _eventEmail = _appConfiguration["FixmyTax:EventNotification"];
            _bccEventEmail = _appConfiguration["FixmyTax:BccEventNotification"];
            _fromEmail = _appConfiguration["FixmyTax:FromEmail"];
            _templateLocation = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            
        }

        public void SendRegistrationUserEmail(string name, string email, string username, string password)
        {
            string templatePath = Path.Combine(_templateLocation, "EmailTemplates", "AssesseeCreation.html");

            StreamReader str = new StreamReader(templatePath);
            string mailText = str.ReadToEnd();
            str.Close();
            mailText = mailText.Replace("{{name}}", name);
            mailText = mailText.Replace("{{username}}", username.Trim());
            mailText = mailText.Replace("{{password}}", password);

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail, "FixmyTax"),
                Subject = "FixMyTax Account Created",
                Body = mailText,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(email);
            _emailSender.Send(mailMessage);
        }


        public void SendPSPCreationEmail(string email, string username, string password)
        {
            string templatePath = Path.Combine(_templateLocation, "EmailTemplates", "PSPCreation.html");

            StreamReader str = new StreamReader(templatePath);
            string mailText = str.ReadToEnd();
            str.Close();

            mailText = mailText.Replace("{{username}}", username.Trim());
            mailText = mailText.Replace("{{password}}", password);

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail, "FixmyTax"),
                Subject = "FixMyTax Account Created",
                Body = mailText,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(email);
            _emailSender.Send(mailMessage);
        }


        public void SendTicketOverdueEmail(string ticketId, string section, string assignedName)
        {
            string templatePath = Path.Combine(_templateLocation, "EmailTemplates", "PendingTicketAlert.html");
            StreamReader str = new StreamReader(templatePath);
            string mailText = str.ReadToEnd();
            str.Close();

            mailText = mailText.Replace("{{ticketId}}", ticketId);
            mailText = mailText.Replace("{{section}}", section);
            mailText = mailText.Replace("{{assigned}}", assignedName);

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail, "FixmyTax"),
                Subject = "Ticket Overdue",
                Body = mailText,
                IsBodyHtml = true,
            };
            var alertemails = _alertEmail.Split(",");
            var bccAlerts = _bccEventEmail.Split(",");
            foreach (var e in alertemails)
            {
                mailMessage.To.Add(e);
            }

            foreach (var e in bccAlerts)
            {
                mailMessage.Bcc.Add(e);
            }

            _emailSender.Send(mailMessage);
        }

        public void SendAssignmentEventEmail(string pspEmail, TicketDto ticket)
        {
            string templatePath = Path.Combine(_templateLocation, "EmailTemplates", "TicketAssigned.html");

            StreamReader str = new StreamReader(templatePath);
            string mailText = str.ReadToEnd();
            str.Close();

            mailText = mailText.Replace("{{subject}}", ticket.Section);
            mailText = mailText.Replace("{{description}}", ticket.SubSection);

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail, "FixmyTax"),
                Subject = "Ticket Assigned",
                Body = mailText,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(pspEmail);
            _emailSender.Send(mailMessage);
        }

        public void SendTicketStatusUpdateEventEmail(string email, TicketDto ticket)
        {
            string templatePath = Path.Combine(_templateLocation, "EmailTemplates", "TicketStatusChange.html");

            StreamReader str = new StreamReader(templatePath);
            string mailText = str.ReadToEnd();
            str.Close();

            string status = "None";
            switch (ticket.Status)
            {
                case TicketStatus.Closed:
                    status = "CLOSED";
                    break;
                case TicketStatus.Assigned:
                    status = "ASSIGNED";
                    break;
                case TicketStatus.Reopen:
                    status = "REOPEN";
                    break;
                case TicketStatus.Resolved:
                    status = "RESOLVED";
                    break;
                case TicketStatus.Responded:
                    status = "RESPONDED";
                    break;
            }
            mailText = mailText.Replace("{{status}}", status);
            mailText = mailText.Replace("{{ticketId}}", ticket.Id.ToString());
            mailText = mailText.Replace("{{section}}", ticket.Section);
            
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail, "FixmyTax"),
                Subject = "Ticket Status Updated",
                Body = mailText,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(email);
            _emailSender.Send(mailMessage);
        }

        public void SendContactUsEmail(InputContactUs input)
        {
            string templatePath = Path.Combine(_templateLocation, "EmailTemplates", "ContactUs.html");

            StreamReader str = new StreamReader(templatePath);
            string mailText = str.ReadToEnd();
            str.Close();

            mailText = mailText.Replace("{{firstname}}", input.FirstName);
            mailText = mailText.Replace("{{lastname}}", input.LastName);
            mailText = mailText.Replace("{{email}}", input.Email);
            mailText = mailText.Replace("{{phone}}", input.Phone);
            mailText = mailText.Replace("{{feedback}}", input.Feedback);

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail, "FixmyTax"),
                Subject = "Visitor Feedback",
                Body = mailText,
                IsBodyHtml = true,
            };
            var alertemails = _alertEmail.Split(",");
            var bccAlerts = _bccEventEmail.Split(",");
            foreach(var e in alertemails)
            {
                mailMessage.To.Add(e);
            }

            foreach (var e in bccAlerts)
            {
                mailMessage.Bcc.Add(e);
            }

            _emailSender.Send(mailMessage);
        }

        public async void SendZoomMeetingEmail(string email, string zoomJoinUrl, string topic, string time, string meetingid, string passcode)
        {
            string templatePath = Path.Combine(_templateLocation, "EmailTemplates", "ZoomMeetingEmail.html");

            StreamReader str = new StreamReader(templatePath);
            string mailText = str.ReadToEnd();
            str.Close();

            mailText = mailText.Replace("{{topic}}", topic);
            mailText = mailText.Replace("{{time}}", time);
            mailText = mailText.Replace("{{joinlink}}", zoomJoinUrl);
            mailText = mailText.Replace("{{meetingid}}", meetingid);
            mailText = mailText.Replace("{{passcode}}", passcode);

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail, "FixmyTax"),
                Subject = "FixmyTax Meeting Invite",
                Body = mailText,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(email);
            _emailSender.Send(mailMessage);
        }
    }
}
