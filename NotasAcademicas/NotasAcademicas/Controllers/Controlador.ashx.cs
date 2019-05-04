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
                            string CurrentTable = string.Empty;

                            if (string.IsNullOrEmpty(IdRegistration) || string.IsNullOrEmpty(typeUser))
                            {
                                CurrentTable = "Datos no pueden ser nulos!";
                            }
                            Negocio negocio = new Negocio();
                            pCurrentMatterViewsList = negocio.GetCurrentMatter(int.Parse(IdCurrentUser), int.Parse(IdRegistration), typeUser, ref error);

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
                            string IdCurrentUser = context.Request["IdCurrentStudent"];
                            string typeUser = context.Request["typeUser"];
                            string CurrentTable = string.Empty;
                            bool IsUpdate = false;

                            if (string.IsNullOrEmpty(IdCurrentUser) || string.IsNullOrEmpty(typeUser))
                            {
                                throw new Exception("Datos no pueden ser nulos!");
                            }

                            Negocio negocio = new Negocio();
                            IsUpdate = negocio.UpdateCurrentUser(int.Parse(IdCurrentUser), typeUser, ref error);

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
                            string typeUser = context.Request["typeUser"];
                            string IdRegistration = context.Request["IdRegistration"];
                            string CurrentTable = string.Empty;
                            bool IsUpdate = false;

                            if (string.IsNullOrEmpty(IdCurrentMatter) || string.IsNullOrEmpty(typeUser))
                            {
                                throw new Exception("Datos no pueden ser nulos!");
                            }

                            currentTableStudens = negocio.GetCurrentStudensByMatter(int.Parse(IdCurrentMatter), ref error);

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
                            #region Connection to DB

                            string action = context.Request["action"];
                            string NameServerDB = string.Empty;
                            string PortServerDB = string.Empty;
                            string NameDataBase = string.Empty;
                            string UserDataBase = string.Empty;
                            string PasswordDataBase = string.Empty;
                            string DatabaseEngine = string.Empty;
                            string value = string.Empty;

                            if (action.Equals("Consult"))
                            {
                                NameServerDB = cfg.AppSettings.Settings["servidorAdmin"].Value;
                                PortServerDB = cfg.AppSettings.Settings["puertoServidor"].Value;
                                NameDataBase = cfg.AppSettings.Settings["nombreDBConsulta"].Value;
                                UserDataBase = cfg.AppSettings.Settings["usuarioBd"].Value;
                                PasswordDataBase = "123";//NegocioCI.Desencriptar(cfg.AppSettings.Settings["contrasena"].Value, ref error);
                                DatabaseEngine = cfg.AppSettings.Settings["driverAdmin"].Value;

                                tipoContenido = "text/json";
                                value = "<div class=\"panel panel-default\" id=\"panelDataBase\">"
                                          + "<div class=\"panel-body\">"
                                             + "<form id=\"formDataBase\">"
                                               + "<h3 style=\"text-align: center; margin-top: 0px\"><strong>Conexión a BD</strong></h3>"
                                               + "<br/>"
                                               + "<div class=\"row\">"
                                                   + "<div class=\"col-md-6\">"
                                                    + "<b style=\"font-size: 17px;\">Servidor base de datos</b>"
                                                    + "<input id=\"DataBaseServer\" type=\"text\" value= '" + NameServerDB + "' class=\"form-control\" placeholder=\"Servidor base de datos\" />"
                                                  + "</div>"
                                                  + "<div class=\"col-md-6\">"
                                                    + "<b style=\"font-size: 17px;\">Puerto base de datos</b>"
                                                    + "<input id=\"PortDataBase\" type=\"text\" value= '" + PortServerDB + "' class=\"form-control\" placeholder=\"Puerto servidor de la base de datos\" />"
                                                  + "</div>"
                                               + "</div>"
                                               + "<br/>"
                                               + "<div class=\"row\">"
                                                  + "<div class=\"col-md-6\">"
                                                    + "<b style=\"font-size: 17px;\">Nombre base de datos</b>"
                                                    + "<input id=\"DataBaseName\" type=\"text\" value= '" + NameDataBase + "' class=\"form-control\" placeholder=\"Nombre de la base de datos\" />"
                                                  + "</div>"
                                                  + "<div class=\"col-md-6\">"
                                                    + "<b style=\"font-size: 17px;\">Usuario base de datos</b>"
                                                    + "<input id=\"UserBaseDatosData\" type=\"text\" value= '" + UserDataBase + "' class=\"form-control\" placeholder=\"Usuario de la base de datos\" />"
                                                  + "</div>"
                                               + "</div>"
                                               + "<br/>"
                                               + "<div class=\"row\">"
                                                   + "<div class=\"col-md-6\">"
                                                       + "<b style=\"font-size: 17px;\">Contraseña usuario base de datos</b>"
                                                       + "<input id=\"PasswordUserDataBase\" type=\"password\" value= '" + PasswordDataBase + "' class=\"form-control\" placeholder=\"Contraseña de la base de datos\" />"
                                                   + "</div>"
                                                   + "<div class=\"col-md-6\">"
                                                       + "<b style=\"font-size: 17px;\">Motor base de datos</b>"
                                                       + "<select id=\"MotorDb\" class=\"form-control\">"
                                                           + "<option>MSSQL</option>"
                                                           + "<option>MYSQL</option>"
                                                           + "<option>ORACLE</option>"
                                                       + "</select>"
                                                   + "</div>"
                                               + "</div>"
                                               + "<br/>"
                                               + "<div class=\"form-group-lg\">"
                                                  + "<a href=\"#\" id=\"btnGuardarConfDB\" class=\"btn btn-info btn-lg colorFondo\"><span class=\"glyphicon glyphicon-floppy-disk\"></span> Guardar</a>"
                                               + "</div>"
                                             + "</form>"
                                          + "</div>"
                                      + "</div>";

                                result = JsonConvert.SerializeObject(value);
                            }
                            else
                            {
                                NameServerDB = context.Request["NameServer"];
                                PortServerDB = context.Request["PortServer"];
                                NameDataBase = context.Request["NameDataBase"];
                                UserDataBase = context.Request["UserDataBase"];
                                PasswordDataBase = context.Request["PasswordUserDB"];
                                PasswordDataBase = context.Request["DatabaseEngine"];

                                cfg.AppSettings.Settings["servidorAdmin"].Value = NameServerDB;
                                cfg.AppSettings.Settings["puertoServidor"].Value = PortServerDB;
                                cfg.AppSettings.Settings["nombreDBConsulta"].Value = NameDataBase;
                                cfg.AppSettings.Settings["usuarioBd"].Value = UserDataBase;
                                cfg.AppSettings.Settings["contrasena"].Value = "123";//NegocioCI.Encriptar(PasswordDataBase, ref error);
                                cfg.AppSettings.Settings["driverAdmin"].Value = DatabaseEngine;

                                cfg.Save();
                                value = "Ok";
                                result = JsonConvert.SerializeObject(value);
                            }

                            #endregion
                        }
                        break;
                    case 900:
                        {
                           
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