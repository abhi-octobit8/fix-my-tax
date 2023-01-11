using Abp.Authorization;
using FixMyTax.Authorization.Roles;
using FixMyTax.Authorization.Users;

namespace FixMyTax.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
