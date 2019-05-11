using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.Configuration;
using Newtonsoft.Json;
using System.Data;
using NotasAcademicasNegocio.Negocio;
using NotasAcademicasNegocio.Utility;

namespace NotasAcademicas.Controllers
{
    /// <summary>
    /// Descripción breve de Controlador
    /// </summary>
    public class Controlador : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string result = string.Empty;
            string tipoContenido = "text/json";
            context.Response.ContentType = tipoContenido;

            try
            {
                string error = string.Empty;
                int op = int.Parse(context.Request["op"].ToString());
                Configuration cfg = WebConfigurationManager.OpenWebConfiguration(context.Request.ApplicationPath);

                switch (op)
                {
                    case 200:
                        {
                            #region Login

                            NotasAcademicasNegocio.Utility.PLogin pLogin = null;
                            string user = context.Request["usuario"];
                            string password = context.Request["contrasena"];
                            string typeUser = context.Request["typeUser"];

                            if (!string.IsNullOrEmpty(user) || !string.IsNullOrEmpty(password) || !string.IsNullOrEmpty(typeUser))
                            {
                                Negocio negocio = new Negocio();
                                pLogin = negocio.Login(user, password, typeUser, ref error);
                                if (error.Length > 0)
                                {
                                    throw new Exception(error);
                                }
                            }

                            tipoContenido = "text/json";
                            result = JsonConvert.SerializeObject(pLogin);

                            #endregion Login
                        }
                        break;
                    case 300:
                        {
                            #region Get Profile

                            NotasAcademicasNegocio.Utility.PProfile pProfile = null;
                            string IdCurrentUser = context.Request["IdCurrentStudent"];
                            string typeUser = context.Request["typeUser"];

                            if (string.IsNullOrEmpty(IdCurrentUser) || string.IsNullOrEmpty(typeUser))
                            {
                                throw new Exception("Datos no pueden ser nulos!");
                            }

                            Negocio negocio = new Negocio();
                            pProfile = negocio.GetCurrentProfileUser(int.Parse(IdCurrentUser), typeUser, ref error);

                            if (error.Length > 0)
                            {
                                throw new Exception(error);
                            }

                            tipoContenido = "text/json";
                            result = JsonConvert.SerializeObject(pProfile);

                            #endregion Get Profile
                        }
                        break;
                    case 400:
                        {
                            #region
                            List<PCurrentMatterView> pCurrentMatterViewsList = new List<PCurrentMatterView>();
                            string IdCurrentUser = context.Request["IdCurrentStudent"];
                            string typeUser = context.Request["typeUser"];
                            string CurrentTable = string.Empty;

                            if (string.IsNullOrEmpty(IdCurrentUser) || string.IsNullOrEmpty(typeUser))
                            {
                                CurrentTable = "Datos no pueden ser nulos!";
                            }
                            Negocio negocio = new Negocio();
                            pCurrentMatterViewsList = negocio.GetCurrentMattersByUser(int.Parse(IdCurrentUser), typeUser, ref error);

                            if (error.Length > 0)
                            {
                                throw new Exception(error);
                            }

                            tipoContenido = "text/json";
                            result = JsonConvert.SerializeObject(pCurrentMatterViewsList);
                            #endregion
                        }
                        break;
                    case 500:
                        {
                            #region
                            List<PCMatterView> pCurrentMatterViewsList = new List<PCMatterView>();
                            string IdRegistration = context.Request["IdRegistration"];
                            string IdCurrentUser = context.Request["IdCurrentUser"];
                            string typeUser = context.Request["typeUser"];
                            string IdMatter = context.Request["IdMatter"];
                            string Group = context.Request["Group"];
                            string CurrentTable = string.Empty;

                            if (string.IsNullOrEmpty(IdRegistration) || string.IsNullOrEmpty(typeUser))
                            {
                                CurrentTable = "Datos no pueden ser nulos!";
                            }
                            Negocio negocio = new Negocio();
                            pCurrentMatterViewsList = negocio.GetCurrentMatter(int.Parse(IdCurrentUser), int.Parse(IdMatter), int.Parse(IdRegistration), int.Parse(Group), typeUser, ref error);

                            if (error.Length > 0)
                            {
                                throw new Exception(error);
                            }

                            tipoContenido = "text/json";
                            result = JsonConvert.SerializeObject(pCurrentMatterViewsList);
                            #endregion
                        }
                        break;
                    case 600:
                        {
                            #region
                            string IdCurrentUser = context.Request["IdCurrentUser"];
                            string typeUser = context.Request["typeUser"];
                            string celular = context.Request["celular"];
                            string email = context.Request["email"];
                            string facultad = context.Request["facultad"];
                            string grado = context.Request["grado"];
                            string profesion = context.Request["profesion"];
                            string idioma = context.Request["idioma"];
                            string password = context.Request["password"];
                            bool IsUpdate = false;

                            if (string.IsNullOrEmpty(IdCurrentUser) || string.IsNullOrEmpty(typeUser))
                            {
                                throw new Exception("Datos no pueden ser nulos!");
                            }

                            Negocio negocio = new Negocio();
                            IsUpdate = negocio.UpdateCurrentUser(int.Parse(IdCurrentUser), typeUser, celular, email, facultad, grado, profesion, idioma, password, ref error);
                            if (error.Length > 0)
                            {
                                throw new Exception(error);
                            }

                            tipoContenido = "text/json";
                            result = JsonConvert.SerializeObject(IsUpdate);

                            #endregion
                        }
                        break;
                    case 700:
                        {
                            #region
                            List<PCMatterView> pCurrentMatterViewsList = new List<PCMatterView>();
                            Negocio negocio = new Negocio();
                            DataTable currentTableStudens;
                            string IdCurrentMatter = context.Request["IdCurrentMatter"];
                            string CurrentGroup = context.Request["Group"];
                            string CurrentTable = string.Empty;

                            if (string.IsNullOrEmpty(IdCurrentMatter) || string.IsNullOrEmpty(CurrentGroup))
                            {
                                throw new Exception("Datos no pueden ser nulos!");
                            }

                            currentTableStudens = negocio.GetCurrentStudensByMatter(int.Parse(IdCurrentMatter), int.Parse(CurrentGroup), ref error);
                            if (error.Length > 0)
                            {
                                throw new Exception(error);
                            }

                            tipoContenido = "text/json";
                            result = JsonConvert.SerializeObject(currentTableStudens);

                            #endregion
                        }
                        break;
                    case 800:
                        {
                            #region Update notes

                            string currentId = context.Request["currentId"];
                            string note1 = context.Request["note1"];
                            string note2 = context.Request["note2"];
                            string note3 = context.Request["note3"];
                            string note4 = context.Request["note4"];
                            bool IsUpdate = false;

                            if (string.IsNullOrEmpty(currentId))
                            {
                                throw new Exception("Datos no pueden ser nulos!");
                            }

                            Negocio negocio = new Negocio();
                            IsUpdate = negocio.UpdateCurrentStudenNotes(Convert.ToDecimal(note1.Replace('.',',')), Convert.ToDecimal(note2.Replace('.', ',')), Convert.ToDecimal(note3.Replace('.', ',')), Convert.ToDecimal(note4.Replace('.', ',')), int.Parse(currentId), ref error);
                            if (error.Length > 0)
                            {
                                throw new Exception(error);
                            }

                            tipoContenido = "text/json";
                            result = JsonConvert.SerializeObject(IsUpdate);

                            #endregion
                        }
                        break;
                    case 900:
                        {
                            #region Notificate

                            string IdStudent = context.Request["IdStudent"];
                            bool IsUpdate = false;

                            if (string.IsNullOrEmpty(IdStudent))
                            {
                                throw new Exception("Datos no pueden ser nulos!");
                            }

                            Negocio negocio = new Negocio();
                            IsUpdate = negocio.SendEmail(int.Parse(IdStudent), ref error);
                            //Negocio.SendEmailWithOutlook("solo_mundos@hotmail.com","Calificaciones","Se ha ingresado una nueva nota");
                            if (error.Length > 0)
                            {
                                throw new Exception(error);
                            }

                            tipoContenido = "text/json";
                            result = JsonConvert.SerializeObject(IsUpdate);

                            #endregion
                        }
                        break;
                    case 910:
                        {
                            
                        }
                        break;
                    case 920:
                        {
                            #region

                            #endregion
                        }
                        break;
                }
            }
            catch (Exception ex)
            {
                tipoContenido = "text";
                result = "ERROR: " + ex.Message;
            }

            context.Response.ContentType = tipoContenido;
            context.Response.Write(result);
        }


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}