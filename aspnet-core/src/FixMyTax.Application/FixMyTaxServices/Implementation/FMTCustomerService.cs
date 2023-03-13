using Abp.Authorization;
using Abp.Domain.Repositories;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxModels;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using FixMyTax.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    [AbpAuthorize]
    public class FMTCustomerService : FixMyTaxAppServiceBase, IFMTCustomerService
    {
        private readonly IRepository<User, long> _userRepository;

        public FMTCustomerService(IRepository<User, long> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDto> GetCustomerById(int id)
        {
            var user = await _userRepository.GetAsync(id);
            return ObjectMapper.Map<UserDto>(user);
        }
    }
}
