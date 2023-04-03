using Abp.AutoMapper;
using Abp.Configuration;
using Abp.MailKit;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FixMyTax.Authorization;
using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxServices.Mapper;

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
            Configuration.IocManager.Resolve<IAbpMailKitConfiguration>().SecureSocketOption = MailKit.Security.SecureSocketOptions.Auto;
            
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(FixMyTaxApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            //Configuration.Modules.AbpAutoMapper().Configurators.Add(
            //    // Scan the assembly for classes which inherit from AutoMapper.Profile
            //    cfg => cfg.AddMaps(thisAssembly)
            //);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(config =>
            {
                //config.CreateMap<CreateUserInput, User>()
                //      .ForMember(u => u.Password, options => options.Ignore())
                //      .ForMember(u => u.Email, options => options.MapFrom(input => input.EmailAddress));
                config.AddProfile(new RequestTicketProfile(Configuration.IocManager.Resolve<UserManager>()));
            });
        }
    }
}
