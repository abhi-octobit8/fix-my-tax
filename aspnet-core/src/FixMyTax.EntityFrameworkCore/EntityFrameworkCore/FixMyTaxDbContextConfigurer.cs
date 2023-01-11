using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace FixMyTax.EntityFrameworkCore
{
    public static class FixMyTaxDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<FixMyTaxDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<FixMyTaxDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
