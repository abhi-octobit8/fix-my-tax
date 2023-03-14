using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using FixMyTax.Authorization.Roles;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using FixMyTax.Users.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    [AbpAuthorize]
    public class FMTCustomerService : FixMyTaxAppServiceBase, IFMTCustomerService
    {
        private readonly IRepository<User, long> _userRepository;
        private readonly RoleManager _roleManager;

        public FMTCustomerService(IRepository<User, long> userRepository, RoleManager roleManager)
        {
            _userRepository = userRepository;
            _roleManager = roleManager;
        }

        public async Task<UserDto> GetCustomerById(int id)
        {
            var user = _userRepository.GetAll().Include(x => x.Roles).Where(x => x.Id == id).FirstOrDefault();

            var roleIds = user.Roles.Select(x => x.RoleId).ToArray();
            var roles = _roleManager.Roles.Where(r => roleIds.Contains(r.Id)).Select(r => r.NormalizedName);
            var userDto = ObjectMapper.Map<UserDto>(user);
            userDto.RoleNames = roles.ToArray();

            return userDto;
        }
    }
}
