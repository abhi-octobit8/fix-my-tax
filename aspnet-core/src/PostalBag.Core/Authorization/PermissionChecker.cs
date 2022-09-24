using Abp.Authorization;
using PostalBag.Authorization.Roles;
using PostalBag.Authorization.Users;

namespace PostalBag.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
