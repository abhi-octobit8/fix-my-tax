using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using PostalBag.EntityFrameworkCore;
using PostalBag.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace PostalBag.Web.Tests
{
    [DependsOn(
        typeof(PostalBagWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class PostalBagWebTestModule : AbpModule
    {
        public PostalBagWebTestModule(PostalBagEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PostalBagWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(PostalBagWebMvcModule).Assembly);
        }
    }
}