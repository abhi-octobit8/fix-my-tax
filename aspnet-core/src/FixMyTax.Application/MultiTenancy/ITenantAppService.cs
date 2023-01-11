using Abp.Application.Services;
using FixMyTax.MultiTenancy.Dto;

namespace FixMyTax.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

