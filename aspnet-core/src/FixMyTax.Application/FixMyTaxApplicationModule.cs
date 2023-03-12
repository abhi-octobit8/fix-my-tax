using Abp.AutoMapper;
using Abp.Configuration;
using Abp.MailKit;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FixMyTax.Authorization;

namespace FixMyTax
{
    [DependsOn(
        typeof(FixMyTaxCoreModule), 
        typeof(AbpAutoMapperModule),
        typeof(AbpMailKitModule))]
    public class FixMyTaxApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<FixMyTaxAuthorizationProvider>();
            Configuration.Settings.Providers.Add<FixMyTaxEmailSettings>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(FixMyTaxApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
