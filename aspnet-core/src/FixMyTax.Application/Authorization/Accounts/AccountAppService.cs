using System;
using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Net.Mail;
using Abp.Zero.Configuration;
using FixMyTax.Authorization.Accounts.Dto;
using FixMyTax.Authorization.Users;

namespace FixMyTax.Authorization.Accounts
{
    public class AccountAppService : FixMyTaxAppServiceBase, IAccountAppService
    {
        // from: http://regexlib.com/REDetails.aspx?regexp_id=1923
        public const string PasswordRegex = "(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s)[0-9a-zA-Z!@#$%^&*()]*$";

        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly IEmailSender _emailSender;

        public AccountAppService(
            UserRegistrationManager userRegistrationManager, IEmailSender emailSender)
        {
            _userRegistrationManager = userRegistrationManager;
            _emailSender = emailSender;
        }

        

        public async Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input)
        {
            var tenant = await TenantManager.FindByTenancyNameAsync(input.TenancyName);
            if (tenant == null)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.NotFound);
            }

            if (!tenant.IsActive)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.InActive);
            }

            return new IsTenantAvailableOutput(TenantAvailabilityState.Available, tenant.Id);
        }

        //public async Task<RegisterOutput> Register(RegisterInput input)
        //{
        //    var user = await _userRegistrationManager.RegisterAsync(
        //        input.Name,
        //        input.Surname,
        //        input.EmailAddress,
        //        input.UserName,
        //        input.Password,
        //        true // Assumed email address is always confirmed. Change this if you want to implement email confirmation.
        //    );

        //    var isEmailConfirmationRequiredForLogin = await SettingManager.GetSettingValueAsync<bool>(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin);

        //    return new RegisterOutput
        //    {
        //        CanLogin = user.IsActive && (user.IsEmailConfirmed || !isEmailConfirmationRequiredForLogin)
        //    };
        //}

        public async Task<ForgotPasswordOutput> ForgotPassword(ForgotPasswordInput input)
        {
            try
            {
                var token = await _userRegistrationManager.ForgotPasswordToken(input.EmailAddress);

                await _emailSender.SendAsync(
                    to: input.EmailAddress,
                    subject: "FixMyTax Password Reset",
                    body: $"<b>Hi {input.EmailAddress} </b> <br/>Please click on the following link to reset your password. <br/> https://fixmytax.zupiers.com/resetpassword/{token}",
                    isBodyHtml: true
                );
                return new ForgotPasswordOutput(true);
            }
            catch(Exception ex)
            {
                Logger.Error(ex.Message, ex);
                return new ForgotPasswordOutput(false);
            }
        }

        public async Task<ResetPasswordOutput> ResetPassword(ResetPasswordInput input)
        {
            try
            {
                var success = await _userRegistrationManager.ResetPasswordToken(input.EmailAddress, input.Token, input.NewPassword);

                if (success)
                {
                    await _emailSender.SendAsync(
                        to: input.EmailAddress,
                        subject: "FixMyTax Password Reset",
                        body: $"<b>Hi {input.EmailAddress} </b> <br/>Password reset successfully",
                        isBodyHtml: true
                    );
                }
                
                return new ResetPasswordOutput(success);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message, ex);
                return new ResetPasswordOutput(false);
            }
        }
    }
}
