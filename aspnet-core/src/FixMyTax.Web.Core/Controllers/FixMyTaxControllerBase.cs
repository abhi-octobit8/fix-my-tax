using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace FixMyTax.Controllers
{
    public abstract class FixMyTaxControllerBase: AbpController
    {
        protected FixMyTaxControllerBase()
        {
            LocalizationSourceName = FixMyTaxConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
