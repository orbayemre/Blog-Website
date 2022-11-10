using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Blog.Data.EfCore
{
    public partial class blogContext : IdentityDbContext<User>
    {
        public blogContext()
        {
        }
        public blogContext(DbContextOptions<blogContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Story> Stories { get; set; } = null!;
        public virtual DbSet<Like> Likes { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // 
                optionsBuilder.UseMySql(Environment.GetEnvironmentVariable("ACONNECTION_STRING"), Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Story>(entity =>
            {
                entity.ToTable("story");
                entity.Property(s => s.StoryId).ValueGeneratedNever();
                entity.Property(s => s.Content).UseCollation("utf8mb3_turkish_ci").HasCharSet("utf8mb3");
                entity.Property(s => s.Title).UseCollation("utf8mb3_turkish_ci").HasCharSet("utf8mb3");


            });
            
            modelBuilder.Entity<Like>(entity =>
            {
                entity.ToTable("like");
                entity.Property(l => l.StoryId).ValueGeneratedNever();
                entity.Property(l => l.UserId).ValueGeneratedNever();
                entity.HasKey(l => new { l.StoryId, l.UserId });

            });
                

            base.OnModelCreating(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);


    }
}
