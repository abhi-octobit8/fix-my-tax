using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace PostalBag.Controllers
{
    public abstract class PostalBagControllerBase: AbpController
    {
        protected PostalBagControllerBase()
        {
            LocalizationSourceName = PostalBagConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
