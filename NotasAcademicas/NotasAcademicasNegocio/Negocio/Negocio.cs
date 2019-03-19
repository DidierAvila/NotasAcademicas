using System.Linq;
using NotasAcademicasNegocio.Datos;
using NotasAcademicasNegocio.Class.Poco;
using NotasAcademicasNegocio.Utility;

namespace NotasAcademicasNegocio.Negocio
{
    public class Negocio
    {
        public const string studen = "studen";
        public const string teacher = "teacher";

        public PLogin Login(string user, string password, string typeUser, ref string error)
        {
            PLogin CurrentStudent = new PLogin();
            try
            {
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {
                    if (typeUser.Equals("student"))
                    {
                        Estudiante estudiante = (from p in context.Estudiante
                                                 where p.Documento == user & p.Clave == password
                                                 select p).FirstOrDefault();

                        if (estudiante != null)
                        {
                            CurrentStudent.IdCurrentUser = estudiante.IdEstudiante;
                            CurrentStudent.CurrentUser = estudiante.Nombres +" "+ estudiante.Apellidos;
                            CurrentStudent.CurrentUserType = studen;
                        }
                    }
                    else
                    {
                        Profesor profesor = (from p in context.Profesor
                                             where p.Documento == user & p.Clave == password
                                             select p).FirstOrDefault();

                        if (profesor != null)
                        {
                            CurrentStudent.IdCurrentUser = profesor.IdProfesor;
                            CurrentStudent.CurrentUser = profesor.Nombres + " " + profesor.Apellidos;
                            CurrentStudent.CurrentUserType = teacher;
                        }
                    }
                }
            }
            catch (System.Exception ex)
            {
                error = ex.ToString();
            }
            return CurrentStudent;
        }

        public PProfile GetCurrentProfileUser(int idCurrentUser, string typeUser)
        {
            PProfile pProfile = new PProfile();
            try
            { 
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {
                    if (typeUser.Equals("student"))
                    {
                        Estudiante estudiante = (from p in context.Estudiante
                                                 where p.IdEstudiante == idCurrentUser
                                                 select p).FirstOrDefault();

                        if (estudiante != null)
                        {
                            pProfile.UserName = estudiante.Nombres;
                            pProfile.LastName = estudiante.Apellidos;
                            pProfile.DocumentType = estudiante.TipoDocumento;
                            pProfile.Document = estudiante.Documento;
                            pProfile.Gender = estudiante.TipoDocumento;
                            pProfile.Email = estudiante.Email;
                            pProfile.PhoneNumber = estudiante.TipoDocumento;
                            pProfile.Birthdate = System.DateTime.Now;
                            pProfile.Nationality = estudiante.TipoDocumento;
                            pProfile.Career = "";
                            pProfile.CurrentLevel = "";
                            pProfile.GeneralAverage = 3.4;
                            pProfile.AdmissionDate = System.DateTime.Now;
                            pProfile.Headquarters = "";
                            pProfile.Password = estudiante.Clave;
                            pProfile.PhoneNumber = estudiante.Telefono;
                        }
                    }
                    else
                    {
                        Profesor profesor = (from p in context.Profesor
                                                 where p.IdProfesor == idCurrentUser
                                                 select p).FirstOrDefault();

                        if (profesor != null)
                        {
                            pProfile.UserName = profesor.Nombres;
                            pProfile.LastName = profesor.Apellidos;
                            pProfile.DocumentType = "";
                            pProfile.Document = profesor.Documento;
                            pProfile.Gender = profesor.Sexo;
                            pProfile.Email = profesor.Email;
                            pProfile.PhoneNumber = profesor.Telefono;
                            pProfile.Birthdate = System.DateTime.Now;
                            pProfile.Nationality = profesor.Nacionalidad;
                            pProfile.Career = "";
                            pProfile.CurrentLevel = "";
                            pProfile.GeneralAverage = 3.4;
                            pProfile.AdmissionDate = System.DateTime.Now;
                            pProfile.Headquarters = "";
                            pProfile.Password = profesor.Clave;
                        }
                    }
                }

                return pProfile;
            }
            catch (System.Exception)
            {
                return pProfile;
                throw;
            }
        }

        public void setStudent()
        {
            using (NotasAcademicasEntities context = new NotasAcademicasEntities())
            {
                
                //Pais pais = new Pais { Nombre = "Bolivia" };
                //Ciudad ciudad = new Ciudad { Nombre = "La Paz" };
                //pais.Ciudad.Add(ciudad);
                //context.Pais.AddObject(pais);
                //context.SaveChanges();
            }
        }

        public void getStudent()
        {

        }

        public void setTeacher()
        {

        }

        public void getTeacher() { }
    }
}
