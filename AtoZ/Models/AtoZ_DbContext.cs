using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AtoZ.Models
{
    public partial class AtoZ_DbContext : DbContext
    {
        public AtoZ_DbContext()
        {
        }

        public AtoZ_DbContext(DbContextOptions<AtoZ_DbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblCategory> TblCategory { get; set; }
        
        public virtual DbSet<TblProducts> TblProducts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //  optionsBuilder.UseSqlServer(@"Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=myTestDB;Data Source=LAPTOP-VNNT3MKV\\SQLEXPRESS;");
                optionsBuilder.UseSqlServer("Server=LAPTOP-VNNT3MKV\\SQLEXPRESS; Database=AtoZ_Db; User ID=sa; Password=123paid321");
                //optionsBuilder.UseSqlServer("Server=LAPTOP-VNNT3MKV\\SQLEXPRESS; Database=myTestDB; User ID=sa; Password=123paid321");


            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblCategory>(entity =>
            {
                entity.HasKey(e => e.CategoryId)
                    .HasName("PK__tblCateg__19093A2B66684180");

                entity.ToTable("tblCategory");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            

            modelBuilder.Entity<TblProducts>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("PK__tblProdu__B40CC6ED2DA2B9AD");

                entity.ToTable("tblProducts");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.PCategory)
                    .IsRequired()
                    .HasColumnName("P_Category")
                    .HasMaxLength(20);

                entity.Property(e => e.PDescription)
                    .IsRequired()
                    .HasColumnName("P_Description")
                    .HasMaxLength(2000);

                entity.Property(e => e.PImage)
                    .IsRequired()
                    .HasColumnName("P_Image")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PInstock)
                    .IsRequired()
                    .HasColumnName("P_Instock")
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.PName)
                    .IsRequired()
                    .HasColumnName("P_Name")
                    .HasMaxLength(200);

                entity.Property(e => e.PPrice)
                    .HasColumnName("P_Price")
                    //.HasColumnType("decimal(18, 0)");
                 .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
