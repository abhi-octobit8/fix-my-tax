using System.Threading.Tasks;
using Abp.Application.Services;
using PostalBag.Sessions.Dto;

namespace PostalBag.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
