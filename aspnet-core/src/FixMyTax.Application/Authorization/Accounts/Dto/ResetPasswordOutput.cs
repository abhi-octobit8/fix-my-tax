using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.Authorization.Accounts.Dto
{
    public class ResetPasswordOutput
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public ResetPasswordOutput(bool success)
        {
            Message = success ? "password reset successfully. login with new password." : "Error";
            Success = success;
        }
    }
}
