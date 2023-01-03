using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using FixMyTax.Configuration;
using FixMyTax.Web;

namespace FixMyTax.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class FixMyTaxDbContextFactory : IDesignTimeDbContextFactory<FixMyTaxDbContext>
    {
        public FixMyTaxDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<FixMyTaxDbContext>();
            
            /*
             You can provide an environmentName parameter to the AppConfigurations.Get method. 
             In this case, AppConfigurations will try to read appsettings.{environmentName}.json.
             Use Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") method or from string[] args to get environment if necessary.
             https://docs.microsoft.com/en-us/ef/core/cli/dbcontext-creation?tabs=dotnet-core-cli#args
             */
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            FixMyTaxDbContextConfigurer.Configure(builder, configuration.GetConnectionString(FixMyTaxConsts.ConnectionStringName));

            return new FixMyTaxDbContext(builder.Options);
        }
    }
}
