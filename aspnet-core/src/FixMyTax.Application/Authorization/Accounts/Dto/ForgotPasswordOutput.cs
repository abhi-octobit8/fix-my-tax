using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.Authorization.Accounts.Dto
{
    public class ForgotPasswordOutput
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public ForgotPasswordOutput(bool success)
        {
            Message = success ? "An email with password reset instruction has been sent to the given mail id" : "Error";
        }
    }
}
