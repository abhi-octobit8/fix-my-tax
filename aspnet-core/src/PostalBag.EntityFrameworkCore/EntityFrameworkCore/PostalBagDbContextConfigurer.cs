using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace PostalBag.EntityFrameworkCore
{
    public static class PostalBagDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<PostalBagDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<PostalBagDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
