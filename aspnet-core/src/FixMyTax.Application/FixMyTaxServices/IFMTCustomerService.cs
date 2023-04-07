using Abp.Application.Services.Dto;
using FixMyTax.Roles.Dto;
using FixMyTax.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices
{
    public interface IFMTCustomerService
    {
        Task<UserDto> GetCustomerById(int id);

        Task<bool> ChangePassword(ChangePasswordDto input);
    }
}
