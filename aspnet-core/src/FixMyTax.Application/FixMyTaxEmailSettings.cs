using Abp.Configuration;
using Abp.Net.Mail;
using Abp.Reflection.Extensions;
using FixMyTax.Configuration;
using FixMyTax.Web;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax
{
    internal class FixMyTaxEmailSettings : SettingProvider
    {
        private readonly IConfigurationRoot _appConfiguration;
        public FixMyTaxEmailSettings()
        {
            _appConfiguration = AppConfigurations.Get(
                typeof(FixMyTaxEmailSettings).GetAssembly().GetDirectoryPathOrNull()
            );
            //AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());
        }
        public override IEnumerable<SettingDefinition> GetSettingDefinitions(SettingDefinitionProviderContext context)
        {
            
            return new[]
            {
            new SettingDefinition("Abp.Net.Mail.Smtp.Host", _appConfiguration["Smtp:Host"], scopes: SettingScopes.Application),
            new SettingDefinition("Abp.Net.Mail.Smtp.Port", _appConfiguration["Smtp:Port"], scopes: SettingScopes.Application ),
            new SettingDefinition("Abp.Net.Mail.Smtp.UserName", _appConfiguration["Smtp:Username"], scopes: SettingScopes.Application ),
            new SettingDefinition("Abp.Net.Mail.Smtp.Password",_appConfiguration["Smtp:Password"], scopes: SettingScopes.Application ),
            new SettingDefinition("Abp.Net.Mail.Smtp.Domain", _appConfiguration["Smtp:Domain"], scopes: SettingScopes.Application ),
            new SettingDefinition("Abp.Net.Mail.Smtp.EnableSsl",_appConfiguration["Smtp:UseSsl"], scopes: SettingScopes.Application ),
            new SettingDefinition("Abp.Net.Mail.Smtp.UseDefaultCredentials", _appConfiguration["Smtp:UseDefaultCredentials"], scopes: SettingScopes.Application ),
            new SettingDefinition("Abp.Net.Mail.DefaultFromAddress", _appConfiguration["Smtp:FromAddress"], scopes: SettingScopes.Application),
            new SettingDefinition("Abp.Net.Mail.DefaultFromDisplayName", _appConfiguration["Smtp:FromName"], scopes: SettingScopes.Application )
        };
        }
    }
}
