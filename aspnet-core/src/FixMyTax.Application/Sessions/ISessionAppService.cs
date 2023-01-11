using System.Threading.Tasks;
using Abp.Application.Services;
using FixMyTax.Sessions.Dto;

namespace FixMyTax.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
