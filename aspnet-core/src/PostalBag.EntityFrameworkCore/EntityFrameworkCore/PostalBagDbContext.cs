using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using PostalBag.Authorization.Roles;
using PostalBag.Authorization.Users;
using PostalBag.MultiTenancy;
using System;
using PostalBag.IPModels;

namespace PostalBag.EntityFrameworkCore
{
    public class PostalBagDbContext : AbpZeroDbContext<Tenant, Role, User, PostalBagDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public DbSet<Site> Sites { get; set; }
        public DbSet<Bag> Bags { get; set; }
        public DbSet<BagScan> BagScans { get; set; }

        public DbSet<SiteHealth> SiteHealths { get; set; }

        public PostalBagDbContext(DbContextOptions<PostalBagDbContext> options)
            : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        // add these lines to override max length of property
        // we should set max length smaller than the PostgreSQL allowed size (10485760)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Abp.Localization.ApplicationLanguageText>()
                .Property(p => p.Value)
                .HasMaxLength(100); // any integer that is smaller than 10485760
        }
    }
}
