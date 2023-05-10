using Abp.Application.Services;
using FixMyTax.FixMyTaxServices.Dtos.Registration;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices
{
    public interface IRegisterServices  : IApplicationService
    {
        Task<RegistrationOutput> Create(InputRegistration input);

        Task<string> ContactUs(InputContactUs input);
    }
}
