using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace PostalBag.Authorization
{
    public class PostalBagAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Dashboard, L("Dashboard"));
            context.CreatePermission(PermissionNames.Pages_Sites, L("Sites"));
            context.CreatePermission(PermissionNames.Pages_Sites_Create, L("SiteCreate"));
            context.CreatePermission(PermissionNames.Pages_Search, L("Search"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, PostalBagConsts.LocalizationSourceName);
        }
    }
}
