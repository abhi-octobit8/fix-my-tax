using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FixMyTax.EntityFrameworkCore;
using FixMyTax.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace FixMyTax.Web.Tests
{
    [DependsOn(
        typeof(FixMyTaxWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class FixMyTaxWebTestModule : AbpModule
    {
        public FixMyTaxWebTestModule(FixMyTaxEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FixMyTaxWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(FixMyTaxWebMvcModule).Assembly);
        }
    }
}