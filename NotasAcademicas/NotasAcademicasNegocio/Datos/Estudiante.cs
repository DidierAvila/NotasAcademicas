//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Estudiante
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Estudiante()
        {
            this.DetalleNotas = new HashSet<DetalleNotas>();
            this.DetalleEstudiantes = new HashSet<DetalleEstudiantes>();
        }
    
        public int IdEstudiante { get; set; }
        public string ProgramaAcademico { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string TipoDocumento { get; set; }
        public string Documento { get; set; }
        public Nullable<System.DateTime> FechaNacimiento { get; set; }
        public string Sexo { get; set; }
        public Nullable<bool> Estado { get; set; }
        public Nullable<System.DateTime> FechaIngreso { get; set; }
        public string Nacionalidad { get; set; }
        public string Direccion { get; set; }
        public string Clave { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Sede { get; set; }
        public Nullable<int> NivelActual { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleNotas> DetalleNotas { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleEstudiantes> DetalleEstudiantes { get; set; }
    }
}
