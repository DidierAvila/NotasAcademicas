using NotasAcademicasNegocio.Datos;
using NotasAcademicasNegocio.Utility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

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
                            pProfile.profession = profesor.TituloProfesional;
                            pProfile.Address = profesor.Direccion;
                            pProfile.PhoneNumber = profesor.Telefono;
                            pProfile.Birthdate = Convert.ToDateTime(profesor.FechaNacimiento).ToString("yyyy-MM-dd");
                            pProfile.AdmissionDate = Convert.ToDateTime(profesor.FechaIngreso).ToString("yyyy-MM-dd");
                            pProfile.Nationality = profesor.Nacionalidad;
                            pProfile.CurrentLevel = profesor.GradoEscolaridad;
                            pProfile.Password = profesor.Clave;
                            pProfile.Faculty = profesor.Facultad;
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

        public List<PCurrentMatterView> GetCurrentMattersByUser(int idCurrentUser, string typeUser, ref string error)
        {
            List<PCurrentMatterView> pCurrentMatterViewList = new List<PCurrentMatterView>();
            PCurrentMatterView pCurrentMatterView;
            try
            {             
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {

                    if (typeUser.Equals("student"))
                    {
                        var currentMatter = (from mt in context.Matricula
                                             join dm in context.DetalleMatricula on mt.IdMatricula equals dm.Id_Fr_Matricula
                                             join de in context.DetalleEstudiantes on dm.Id_Fr_Matricula equals de.Id_Fr_Matricula_E
                                             join Materia m in context.Materia on dm.IdMateria equals m.IdMateria
                                             join p in context.Profesor on dm.IdProfesor equals p.IdProfesor
                                             where de.Id_Fr_Estudiantes_E == idCurrentUser & de.Estado == true && mt.Estado == true
                                             select new { dm.Id_Fr_Matricula, m.IdMateria, m.Nombre, m.Codigo, m.NumeroCredito, p.IdProfesor, p.Nombres, p.Apellidos }).ToList();

                        foreach (var item in currentMatter)
                        {
                            pCurrentMatterView = new PCurrentMatterView();
                            pCurrentMatterView.IdRegistration = item.Id_Fr_Matricula;
                            pCurrentMatterView.IdMatter = item.IdMateria.ToString();
                            pCurrentMatterView.NameMatter = item.Nombre;
                            pCurrentMatterView.NamberCredits = (int)item.NumeroCredito;
                            pCurrentMatterView.Code = item.Codigo;
                            pCurrentMatterView.IdTeacher = item.IdProfesor.ToString();
                            pCurrentMatterView.NameTeacher = item.Nombres + " " + item.Apellidos;
                            pCurrentMatterViewList.Add(pCurrentMatterView);
                        }
                    }
                    else
                    {
                        var currentMatter = (from dm in context.DetalleMatricula
                                             join p in context.Profesor on dm.IdProfesor equals p.IdProfesor
                                             join m in context.Materia on dm.IdMateria equals m.IdMateria
                                             join mt in context.Matricula on dm.Id_Fr_Matricula equals mt.IdMatricula
                                             where dm.IdProfesor == idCurrentUser && mt.Estado == true
                                             select new { dm.Id_Fr_Matricula, m.IdMateria, m.Nombre, m.Codigo, m.NumeroCredito, p.IdProfesor }).ToList();

                        foreach (var item in currentMatter)
                        {
                            pCurrentMatterView = new PCurrentMatterView();
                            pCurrentMatterView.IdRegistration = item.Id_Fr_Matricula;
                            pCurrentMatterView.IdMatter = item.IdMateria.ToString();
                            pCurrentMatterView.NameMatter = item.Nombre + "(" + item.Codigo + ")";
                            pCurrentMatterView.NamberCredits = (int)item.NumeroCredito;
                            pCurrentMatterView.Code = item.Codigo;
                            pCurrentMatterView.IdTeacher = item.IdProfesor.ToString();
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

        public List<PCurrentMatterView> GetCurrentMattersTeacher(int idCurrentUser, ref string error)
        {
            List<PCurrentMatterView> pCurrentMatterViewList = new List<PCurrentMatterView>();
            PCurrentMatterView pCurrentMatterView;
            try
            {
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {
                    var currentMatter = (from mt in context.Matricula
                                         join dm in context.DetalleMatricula on mt.IdMatricula equals dm.Id_Fr_Matricula
                                         join de in context.DetalleEstudiantes on dm.Id_Fr_Matricula equals de.Id_Fr_Matricula_E
                                         join Materia m in context.Materia on dm.IdMateria equals m.IdMateria
                                         join p in context.Profesor on dm.IdProfesor equals p.IdProfesor
                                         where dm.IdProfesor == idCurrentUser
                                         select new { dm.Id_Fr_Matricula, m.IdMateria, m.Nombre, m.Codigo, m.NumeroCredito, p.IdProfesor }).ToList();

                    foreach (var item in currentMatter)
                    {
                        pCurrentMatterView = new PCurrentMatterView();
                        pCurrentMatterView.IdRegistration = item.Id_Fr_Matricula;
                        pCurrentMatterView.IdMatter = item.IdMateria.ToString();
                        pCurrentMatterView.NameMatter = item.Nombre;
                        pCurrentMatterView.NamberCredits = (int)item.NumeroCredito;
                        pCurrentMatterView.Code = item.Codigo;
                        pCurrentMatterView.IdTeacher = item.IdProfesor.ToString();
                        pCurrentMatterViewList.Add(pCurrentMatterView);
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

        public List<PCMatterView> GetCurrentMatter(int idCurrentID, int idRegistration, string typeUser, ref string error)
        {
            List<PCMatterView> pcMatterViewList = new List<PCMatterView>();
            PCMatterView pCMatterView;
            DataTable CurrentTable;
            try
            {
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {
                    if (typeUser.Equals("student"))
                    {
                        var currentMatter = (from dn in context.DetalleNotas
                                             join m in context.Materia on dn.Id_Fr_Materia_N equals m.IdMateria
                                             join e in context.Estudiante on dn.Id_Fr_Estudiantes_N equals e.IdEstudiante
                                             join dm in context.DetalleMatricula on dn.Id_Fr_Matricula_N equals dm.Id_Fr_Matricula
                                             join p in context.Profesor on dm.IdProfesor equals p.IdProfesor
                                             join mt in context.Matricula on dn.Id_Fr_Matricula_N equals mt.IdMatricula
                                             where dn.Id_Fr_Estudiantes_N == idCurrentID && dn.Id_Fr_Matricula_N == idRegistration
                                             select new { m.Nivel, mt.PeriodoAcademico, m.IdMateria, dm.Horario, m.Nombre, m.Codigo, p.Nombres, p.Apellidos, m.NumeroCredito, dn.Nota1, dn.Nota2, dn.Nota3, dn.Nota4 }).ToList();

                        foreach (var item in currentMatter)
                        {
                            pCMatterView = new PCMatterView();
                            pCMatterView.Qualifications = new List<string>();
                            pCMatterView.Level = (int)item.Nivel;
                            pCMatterView.Schedule = item.Horario;
                            pCMatterView.CademicPeriod = item.PeriodoAcademico;
                            pCMatterView.IdMatter = item.IdMateria.ToString();
                            pCMatterView.Name = item.Nombre;
                            pCMatterView.NamberCredits = (int)item.NumeroCredito;
                            pCMatterView.Code = item.Codigo;
                            pCMatterView.TeacherName = item.Nombres + " " + item.Apellidos;
                            pCMatterView.Qualifications.Add(item.Nota1.ToString().Replace(",", "."));
                            pCMatterView.Qualifications.Add(item.Nota2.ToString().Replace(",", "."));
                            pCMatterView.Qualifications.Add(item.Nota3.ToString().Replace(",", "."));
                            pCMatterView.Qualifications.Add(item.Nota4.ToString().Replace(",", "."));
                            pcMatterViewList.Add(pCMatterView);
                        }
                    }
                    else
                    {
                        //var currentMatter = (from dn in context.DetalleNotas
                        //                     join m in context.Materia on dn.Id_Fr_Materia_N equals m.IdMateria
                        //                     join e in context.Estudiante on dn.Id_Fr_Estudiantes_N equals e.IdEstudiante
                        //                     join dm in context.DetalleMatricula on dn.Id_Fr_Matricula_N equals dm.Id_Fr_Matricula
                        //                     join p in context.Profesor on dm.IdProfesor equals p.IdProfesor
                        //                     join mt in context.Matricula on dn.Id_Fr_Matricula_N equals mt.IdMatricula
                        //                     where dn.Id_Fr_Materia_N == idCurrentID && dn.Id_Fr_Matricula_N == idRegistration
                        //                     select new { e.IdEstudiante, e.Nombres, m.Nivel, mt.PeriodoAcademico, m.IdMateria, dm.Horario, m.Nombre, m.Codigo, m.NumeroCredito, dn.Nota1, dn.Nota2, dn.Nota3, dn.Nota4 }).GroupBy(m => m.IdEstudiante).ToList();

                        var currentMatter = (from dn in context.DetalleNotas
                                             join e in context.Estudiante on dn.Id_Fr_Estudiantes_N equals e.IdEstudiante
                                             where dn.Id_Fr_Materia_N == idCurrentID
                                             select new {e.Nombres, e.Apellidos, e.IdEstudiante, dn.Nota1, dn.Nota2, dn.Nota3, dn.Nota4 }).ToList();

                        CurrentTable = new DataTable();
                        CurrentTable.Columns.Add("IdStuden", typeof(int),"");
                        CurrentTable.Columns.Add("StudenName", typeof(string), "Nombre");
                        CurrentTable.Columns.Add("Note1", typeof(string), "Nota1");
                        CurrentTable.Columns.Add("Note2", typeof(string), "Nota2");
                        CurrentTable.Columns.Add("Note3", typeof(string), "Nota3");
                        CurrentTable.Columns.Add("Note4", typeof(string), "Nota4");

                        foreach (var item in currentMatter)
                        {
                            var row = CurrentTable.NewRow();
                            row["IdStuden"] = item.IdEstudiante;
                            row["StudenName"] = item.Nombres + " " + item.Apellidos;
                            row["Note1"] = item.Nota1.ToString().Replace(",", ".");
                            row["Note2"] = item.Nota1.ToString().Replace(",", ".");
                            row["Note3"] = item.Nota1.ToString().Replace(",", ".");
                            row["Note4"] = item.Nota1.ToString().Replace(",", ".");
                            CurrentTable.Rows.Add(row);

                            pCMatterView = new PCMatterView();
                            pCMatterView.Qualifications = new List<string>();
                            pCMatterView.StudenName = item.Nombres + " " + item.Apellidos;
                            pCMatterView.IdStuden = item.IdEstudiante;
                            //pCMatterView.Schedule = item.Horario;
                            //pCMatterView.CademicPeriod = item.PeriodoAcademico;
                            //pCMatterView.IdMatter = item.IdMateria.ToString();
                            //pCMatterView.Name = item.Nombre;
                            //pCMatterView.NamberCredits = (int)item.NumeroCredito;
                            //pCMatterView.Code = item.Codigo;
                            //pCMatterView.TeacherName = item.Nombres;
                            pCMatterView.Qualifications.Add(item.Nota1.ToString().Replace(",", "."));
                            pCMatterView.Qualifications.Add(item.Nota2.ToString().Replace(",", "."));
                            pCMatterView.Qualifications.Add(item.Nota3.ToString().Replace(",", "."));
                            pCMatterView.Qualifications.Add(item.Nota4.ToString().Replace(",", "."));
                            pcMatterViewList.Add(pCMatterView);
                        }
                    }
                }

                return pcMatterViewList;
            }
            catch (System.Exception ex)
            {
                error = ex.ToString();
                return null;
                throw;
            }
        }

        public DataTable GetCurrentStudensByMatter(int idCurrentID, ref string error)
        {
            List<PCMatterView> pcMatterViewList = new List<PCMatterView>();
            PCMatterView pCMatterView;
            DataTable CurrentTable;
            try
            {
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {
                    var currentMatter = (from dn in context.DetalleNotas
                                         join e in context.Estudiante on dn.Id_Fr_Estudiantes_N equals e.IdEstudiante
                                         where dn.Id_Fr_Materia_N == idCurrentID
                                         select new { e.Nombres, e.Apellidos, e.IdEstudiante, dn.Nota1, dn.Nota2, dn.Nota3, dn.Nota4 }).ToList();

                    CurrentTable = new DataTable();
                    CurrentTable.Columns.Add("IdStuden", typeof(int));
                    CurrentTable.Columns.Add("StudenName", typeof(string));
                    CurrentTable.Columns.Add("Note1", typeof(string));
                    CurrentTable.Columns.Add("Note2", typeof(string));
                    CurrentTable.Columns.Add("Note3", typeof(string));
                    CurrentTable.Columns.Add("Note4", typeof(string));

                    foreach (var item in currentMatter)
                    {
                        var row = CurrentTable.NewRow();
                        row["IdStuden"] = item.IdEstudiante;
                        row["StudenName"] = item.Nombres + " " + item.Apellidos;
                        row["Note1"] = item.Nota1.ToString().Replace(",", ".");
                        row["Note2"] = item.Nota2.ToString().Replace(",", ".");
                        row["Note3"] = item.Nota3.ToString().Replace(",", ".");
                        row["Note4"] = item.Nota4.ToString().Replace(",", ".");
                        CurrentTable.Rows.Add(row);

                        //pCMatterView = new PCMatterView();
                        //pCMatterView.Qualifications = new List<string>();
                        //pCMatterView.StudenName = item.Nombres + " " + item.Apellidos;
                        //pCMatterView.IdStuden = item.IdEstudiante;
                        ////pCMatterView.Schedule = item.Horario;
                        ////pCMatterView.CademicPeriod = item.PeriodoAcademico;
                        ////pCMatterView.IdMatter = item.IdMateria.ToString();
                        ////pCMatterView.Name = item.Nombre;
                        ////pCMatterView.NamberCredits = (int)item.NumeroCredito;
                        ////pCMatterView.Code = item.Codigo;
                        ////pCMatterView.TeacherName = item.Nombres;
                        //pCMatterView.Qualifications.Add(item.Nota1.ToString().Replace(",", "."));
                        //pCMatterView.Qualifications.Add(item.Nota2.ToString().Replace(",", "."));
                        //pCMatterView.Qualifications.Add(item.Nota3.ToString().Replace(",", "."));
                        //pCMatterView.Qualifications.Add(item.Nota4.ToString().Replace(",", "."));
                        //pcMatterViewList.Add(pCMatterView);
                    }
                }

                return CurrentTable;
            }
            catch (System.Exception ex)
            {
                error = ex.ToString();
                return null;
                throw;
            }
        }

        public bool UpdateCurrentUser(int idUser, string typeUser, ref string error)
        {
            bool Isupdate = false;
            try
            {
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {
                    if (typeUser.Equals("student"))
                    {
                        Estudiante estudiante = context.Estudiante.SingleOrDefault(e => e.IdEstudiante == idUser);

                        if (estudiante != null)
                        {
                            estudiante.Telefono = "";
                            estudiante.Email = "";
                        }
                        return Isupdate;
                    }
                    else
                    {

                        return Isupdate;
                    }
                }
            }
            catch (System.Exception ex)
            {
                error = ex.ToString();
                return Isupdate;
            }
        }
    }
}
