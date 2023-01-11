using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace FixMyTax.Localization
{
    public static class FixMyTaxLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(FixMyTaxConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(FixMyTaxLocalizationConfigurer).GetAssembly(),
                        "FixMyTax.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
