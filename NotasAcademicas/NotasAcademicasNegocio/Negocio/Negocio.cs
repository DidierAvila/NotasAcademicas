using System.Linq;
using NotasAcademicasNegocio.Datos;
using NotasAcademicasNegocio.Class.Poco;
using NotasAcademicasNegocio.Utility;

namespace NotasAcademicasNegocio.Negocio
{
    public class Negocio
    {
        public PLogin Login(string user, string password, string typeUser)
        {
            PLogin CurrentStudent = new PLogin();
            try
            {
                using (NotasAcademicasEntities context = new NotasAcademicasEntities())
                {
                    if (typeUser.Equals("student"))
                    {
                        Estudiante estudiante = (from p in context.Estudiante
                                                 where p.Usuario == user & p.Password == password
                                                 select p).FirstOrDefault();

                        if (estudiante != null)
                        {
                            CurrentStudent.IdCurrentUser = 1;
                            CurrentStudent.CurrentUser = estudiante.Nombres + " " + estudiante.Apellidos;
                        }
                    }
                    else
                    {

                    }
                }
            }
            catch (System.Exception)
            {

                throw;
            }
            return CurrentStudent;
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
