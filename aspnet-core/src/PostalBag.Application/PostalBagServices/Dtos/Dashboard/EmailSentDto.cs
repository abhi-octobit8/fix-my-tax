using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos.Dashboard
{
    public class EmailSentDto
    {
        public bool MailSent { get; set; }
        public string Message { get; set; }
    }
}
