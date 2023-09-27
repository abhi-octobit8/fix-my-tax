using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using FixMyTax.Authorization.Roles;
using FixMyTax.Authorization.Users;
using FixMyTax.MultiTenancy;
using System;
using FixMyTax.FixMyTaxModels;

namespace FixMyTax.EntityFrameworkCore
{
    public class FixMyTaxDbContext : AbpZeroDbContext<Tenant, Role, User, FixMyTaxDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<RequestTicket> Tickets { get; set; }
        public DbSet<TicketResponse> Responses { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Attachment> Files { get; set; }
        public DbSet<CategoryProofFiles> Proofs { get; set; }

        public DbSet<Pricing> Ratecards { get; set; }
        public DbSet<Event> Events { get; set; }

        public DbSet<Slot> Slots { get; set; }

        public FixMyTaxDbContext(DbContextOptions<FixMyTaxDbContext> options)
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

            modelBuilder.Entity<RequestTicket>()
                .HasMany(r => r.Attachments);

            modelBuilder.Entity<TicketResponse>()
                .HasMany(r => r.Attachments);
        }
    }
}
