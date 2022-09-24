using Abp.Application.Services;
using PostalBag.MultiTenancy.Dto;

namespace PostalBag.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

