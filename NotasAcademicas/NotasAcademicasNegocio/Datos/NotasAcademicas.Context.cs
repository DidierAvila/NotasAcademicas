﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace NotasAcademicasNegocio.Datos
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class NotasAcademicasEntities : DbContext
    {
        public NotasAcademicasEntities()
            : base("name=NotasAcademicasEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Estudiante> Estudiante { get; set; }
        public virtual DbSet<Materia> Materia { get; set; }
        public virtual DbSet<Profesor> Profesor { get; set; }
        public virtual DbSet<Matricula> Matricula { get; set; }
        public virtual DbSet<DetalleMatricula> DetalleMatricula { get; set; }
        public virtual DbSet<DetalleEstudiantes> DetalleEstudiantes { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<DetalleNotas> DetalleNotas { get; set; }
    }
}
