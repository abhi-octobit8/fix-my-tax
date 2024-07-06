using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Net.Mail;
using FixMyTax.Authorization.Users;
using FixMyTax.Controllers;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.zoom;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Specialized;

namespace FixMyTax.Web.Host.Controllers
{
    public class CheckoutController : FixMyTaxControllerBase
    {
        private readonly CCAvenueService cCAvenueService;
        private readonly IRepository<RequestTicket> _ticketRepository;
        private readonly IRepository<Slot> _slotRepository;
        private readonly UserManager _userManager;
        private readonly IEmailSender _emailSender;
        private readonly FixMyTaxEmailSender _fixMyTaxEmail;

        public CheckoutController(IRepository<RequestTicket> ticketRepository, UserManager userManager, IEmailSender emailSender, IRepository<Slot> slotRepository)
        {
            cCAvenueService = new CCAvenueService();
            _ticketRepository = ticketRepository;
            _userManager = userManager;
            _emailSender = emailSender;
            _fixMyTaxEmail = new FixMyTaxEmailSender(_emailSender);
            _slotRepository = slotRepository;
        }
        public IActionResult Index()
        {
            if (Request.Method == "GET")
            {
                ViewBag.Message = "Unknown";
                return View();
            }

            if (string.IsNullOrEmpty(Request.Form["orderNo"]))
            {
                ViewBag.Message = "Unknown";
                return View();
            }

            var orderNumber = Request.Form["orderNo"].ToString();
            var ticketEntity = _ticketRepository.FirstOrDefault(x => x.OrderId == orderNumber);
            if (ticketEntity == null)
            {
                ViewBag.Message = "Payment failed";
                return View();
            }

            var user = _userManager.GetUserById(ticketEntity.CreatorUserId.Value);
            ViewBag.UserName = user.Name;

            var encResponse = Request.Form["encResp"];
            string decrypRespo = cCAvenueService.DecryptResponse(encResponse);

            NameValueCollection Params = new NameValueCollection();
            string[] segments = decrypRespo.Split('&');
            foreach (string seg in segments)
            {
                string[] parts = seg.Split('=');
                if (parts.Length > 0)
                {
                    string Key = parts[0].Trim();
                    string Value = parts[1].Trim();
                    Params.Add(Key, Value);
                }
            }

            if (Params["order_status"] == "Aborted")
            {
                //user canceled
                ticketEntity.PaymentStaus = PaymentStatus.Canceled;
                ticketEntity.PaymentInfo = decrypRespo;

                ViewBag.Message = "Payment Canceled";
                _ticketRepository.Update(ticketEntity);
                CurrentUnitOfWork.SaveChanges();
            }

            else if(Params["order_status"] == "Success")
            {
                //success
                ticketEntity.PaymentStaus = PaymentStatus.Paid;
                ViewBag.Message = "Payment Successfull";
                ticketEntity.TransactionNumber = Params["bank_ref_no"];
                ticketEntity.PaymentInfo = decrypRespo;
                _ticketRepository.Update(ticketEntity);
                CurrentUnitOfWork.SaveChanges();

                
                if (ticketEntity.SlotId != null && ticketEntity.SlotId > 0)
                {
                    ZoomMeeting meeting = null;
                    var slot = _slotRepository.FirstOrDefault(x => x.Id == ticketEntity.SlotId);

                    //schedule zoom meeting
                    try
                    {
                        ZoomMeetingRequest meet = new ZoomMeetingRequest();
                        meet.topic = ticketEntity.Description;
                        meet.start_time = slot.StartTime.ToString("yyyy-MM-ddTHH:mm:ss");

                        ZoomService service = new ZoomService();
                        System.Threading.Tasks.Task<ZoomMeeting> task = service.CreateMeeting(meet);
                        meeting = task.Result;

                        if (meeting != null)
                        {
                            ticketEntity.ZoomJoinUrl = meeting.JoinUrl;
                            ticketEntity.ZoomTopic = meeting.Topic;
                            ticketEntity.ZoomTime = meeting.Time;
                            ticketEntity.ZoomMeetingId = meeting.MeetingId;
                            ticketEntity.ZoomMeetingPasscode = meeting.Passcode;
                            ticketEntity = _ticketRepository.Update(ticketEntity);
                            CurrentUnitOfWork.SaveChanges();
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Error(ex.Message, ex);
                    }
                }
                if (!string.IsNullOrEmpty(ticketEntity.ZoomJoinUrl))
                {
                    try
                    {
                        _fixMyTaxEmail.SendZoomMeetingEmail(user.EmailAddress, ticketEntity.ZoomJoinUrl, ticketEntity.ZoomTopic, 
                            ticketEntity.ZoomTime, ticketEntity.ZoomMeetingId, ticketEntity.ZoomMeetingPasscode);
                    }
                    catch (Exception e)
                    {
                        Logger.Error(e.Message, e);
                    }
                }
            }
            else
            {
                //Failed
                ticketEntity.PaymentStaus = PaymentStatus.TransactionFailed;
                ViewBag.Message = "Payment failed";
                ticketEntity.TransactionNumber = Params["bank_ref_no"];
                ticketEntity.PaymentInfo = decrypRespo;
                _ticketRepository.Update(ticketEntity);
                CurrentUnitOfWork.SaveChanges();
            }
            return View();
        }
    }
}
