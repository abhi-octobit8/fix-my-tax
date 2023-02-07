using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Registration
{
    public class RegistrationOutput
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public int TicketId { get; set; }
        public string Password { get; set; }
        public bool Error { get; set; }
        public string ErrorMsg { get; set; }

    }
}
