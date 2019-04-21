using System.Linq;
using NotasAcademicasNegocio.Class.Poco;
using NotasAcademicasNegocio.Datos;
using NotasAcademicasNegocio.Utility;
using System;
using System.Collections.Generic;

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
                            CurrentStudent.CurrentUser = estudiante.Nombres + " " + estudiante.Apellidos;
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

        public PProfile GetCurrentProfileUser(int idCurrentUser, string typeUser, ref string error)
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
                            pProfile.Gender = estudiante.Sexo;
                            pProfile.Email = estudiante.Email;
                            pProfile.PhoneNumber = estudiante.Telefono;
                            pProfile.Birthdate = Convert.ToDateTime(estudiante.FechaNacimiento).ToString("yyyy-MM-dd");
                            pProfile.Nationality = estudiante.Nacionalidad;
                            pProfile.Career = estudiante.ProgramaAcademico;
                            pProfile.CurrentLevel = estudiante.NivelActual.ToString();
                            pProfile.GeneralAverage = 3.4;
                            pProfile.AdmissionDate = Convert.ToDateTime(estudiante.FechaIngreso).ToString("yyyy-MM-dd");
                            pProfile.Headquarters = estudiante.Sede;
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
                            pProfile.DocumentType = profesor.TipoDocumento;
                            pProfile.Document = profesor.Documento;
                            pProfile.Gender = profesor.Sexo;
                            pProfile.Email = profesor.Email;
                            pProfile.EducationDegree = profesor.Email;
                            pProfile.Address = profesor.Direccion;
                            pProfile.PhoneNumber = profesor.Telefono;
                            pProfile.Birthdate = Convert.ToDateTime(profesor.FechaNacimiento).ToString("yyyy-MM-dd");
                            pProfile.AdmissionDate = Convert.ToDateTime(profesor.FechaIngreso).ToString("yyyy-MM-dd");
                            pProfile.Nationality = profesor.Nacionalidad;
                            pProfile.CurrentLevel = profesor.GradoEscolaridad;
                            pProfile.Password = profesor.Clave;
                        }
                    }
                }

                return pProfile;
            }
            catch (System.Exception ex)
            {
                error = ex.ToString();
                return null;
                throw;
            }
        }

        public List<PCurrentMatterView> GetCurrentMatters(int idCurrentUser, string typeUser, ref string error)
        {
            List<PCurrentMatterView> pCurrentMatterViewList = new List<PCurrentMatterView>();
            PCurrentMatterView pCurrentMatterView;
            try
            {
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {
                    if (typeUser.Equals("student"))
                    {

                        var currentMatter = (from dm in context.DetalleMatricula join de in context.DetalleEstudiantes
                                            on dm.Id_Fr_Matricula equals de.Id_Fr_Matricula_E join Materia m in context.Materia
                                            on dm.IdMateria equals m.IdMateria join p in context.Profesor
                                            on dm.IdProfesor equals p.IdProfesor
                                            where de.Id_Fr_Estudiantes_E == idCurrentUser & de.Estado == true
                                            select new {m.IdMateria, m.Nombre, m.Codigo, m.NumeroCredito, p.IdProfesor, p.Nombres, p.Apellidos}).ToList();

                        foreach (var item in currentMatter)
                        {
                            pCurrentMatterView = new PCurrentMatterView();
                            pCurrentMatterView.IdMatter = item.IdMateria.ToString();
                            pCurrentMatterView.NameMatter = item.Nombre;
                            pCurrentMatterView.NamberCredits = (int) item.NumeroCredito;
                            pCurrentMatterView.Code = item.Codigo;
                            pCurrentMatterView.IdTeacher = item.IdProfesor.ToString();
                            pCurrentMatterView.NameTeacher = item.Nombres + " " + item.Apellidos;
                            pCurrentMatterViewList.Add(pCurrentMatterView);
                        }
                    }
                    else
                    {
                        var currentMatter = (from dm in context.DetalleMatricula join de in context.DetalleEstudiantes
                                            on dm.Id_Fr_Matricula equals de.Id_Fr_Matricula_E join Materia m in context.Materia
                                            on dm.IdMateria equals m.IdMateria join p in context.Profesor
                                            on dm.IdProfesor equals p.IdProfesor
                                            where de.Id_Fr_Estudiantes_E == idCurrentUser & de.Estado == true
                                            select new {m.IdMateria, m.Nombre, m.Codigo, m.NumeroCredito, p.IdProfesor, p.Nombres, p.Apellidos}).ToList();

                        foreach (var item in currentMatter)
                        {
                            pCurrentMatterView = new PCurrentMatterView();
                            pCurrentMatterView.IdMatter = item.IdMateria.ToString();
                            pCurrentMatterView.NameMatter = item.Nombre;
                            pCurrentMatterView.NamberCredits = (int) item.NumeroCredito;
                            pCurrentMatterView.IdTeacher = item.IdProfesor.ToString();
                            pCurrentMatterView.NameTeacher = item.Nombres + " " + item.Apellidos;
                            pCurrentMatterViewList.Add(pCurrentMatterView);
                        }
                    }
                }

                return pCurrentMatterViewList;
            }
            catch (System.Exception ex)
            {
                error = ex.ToString();
                return null;
                throw;
            }
        }

        public void setStudent()
        {
            
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
