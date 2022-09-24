using System.Threading.Tasks;
using Abp.Application.Services;
using PostalBag.Authorization.Accounts.Dto;

namespace PostalBag.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
