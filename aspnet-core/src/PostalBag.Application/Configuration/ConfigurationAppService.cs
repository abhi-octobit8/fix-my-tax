using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using PostalBag.Configuration.Dto;

namespace PostalBag.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : PostalBagAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
