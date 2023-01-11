using System.Threading.Tasks;
using Abp.Application.Services;
using FixMyTax.Authorization.Accounts.Dto;

namespace FixMyTax.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
