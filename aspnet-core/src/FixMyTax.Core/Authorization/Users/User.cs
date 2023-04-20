using System;
using System.Collections.Generic;
using Abp.Authorization.Users;
using Abp.Extensions;
using FixMyTax.FixMyTaxModels;

namespace FixMyTax.Authorization.Users
{
    public class User : AbpUser<User>
    {
        public const string DefaultPassword = "123qwe";

        public static string CreateRandomPassword()
        {
            return Guid.NewGuid().ToString("N").Truncate(16);
        }

        public static User CreateTenantAdminUser(int tenantId, string emailAddress)
        {
            var user = new User
            {
                TenantId = tenantId,
                UserName = AdminUserName,
                Name = AdminUserName,
                Surname = AdminUserName,
                EmailAddress = emailAddress,
                Roles = new List<UserRole>()
            };

            user.SetNormalizedNames();

            return user;
        }

        public string PanCardNumber { get; set; }
        public string AdharNumber { get; set; }
        public string GSTNumber { get; set; }

        public FMTUserCategory FMTCategory { get; set; }

        public int? CategoryProofId { get; set; }
        public CategoryProofFiles CategoryProof { get; set; }
    }
}
