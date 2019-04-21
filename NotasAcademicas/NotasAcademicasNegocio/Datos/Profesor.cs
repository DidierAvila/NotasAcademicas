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
    
    public partial class Profesor
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Profesor()
        {
            this.DetalleMatricula = new HashSet<DetalleMatricula>();
        }
    
        public int IdProfesor { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Documento { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public Nullable<bool> Estado { get; set; }
        public string Sexo { get; set; }
        public Nullable<System.DateTime> FechaNacimiento { get; set; }
        public string Nacionalidad { get; set; }
        public string Direccion { get; set; }
        public Nullable<System.DateTime> FechaIngreso { get; set; }
        public string Clave { get; set; }
        public string TipoDocumento { get; set; }
        public string Facultad { get; set; }
        public string GradoEscolaridad { get; set; }
        public string TituloProfesional { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetalleMatricula> DetalleMatricula { get; set; }
    }
}
