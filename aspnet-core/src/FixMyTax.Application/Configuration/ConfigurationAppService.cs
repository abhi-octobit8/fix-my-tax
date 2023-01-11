using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using FixMyTax.Configuration.Dto;

namespace FixMyTax.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : FixMyTaxAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
