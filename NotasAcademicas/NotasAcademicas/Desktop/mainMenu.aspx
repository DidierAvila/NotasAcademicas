<%@ Page Language="C#" %>

<%Response.Expires = -1;%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Notas académicas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="../font-awesome-4.3.0/css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/jquery-ui-autocomplete.css" rel="stylesheet" />
    <link href="../DataTables-1.10.2/media/css/jquery.dataTables.css" rel="stylesheet" />
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="css/jquery.contextMenu.css" rel="stylesheet" />

    <link href="css/general.css" rel="stylesheet" />
    <link href="css/general.min.css" rel="stylesheet" />
    <link href="css/mainUser.css" rel="stylesheet" />
    <link href="css/mainAdmin.css" rel="stylesheet" />
    <link href="css/mainMenu.css" rel="stylesheet" />
    <link rel="icon" href="../imagenes/FabiconNtAc.ico"/>

    <script src="../jquery/jquery-2.0.2.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script src="../jquery/jquery-ui.min.js"></script>
    <script src="../jquery/jquery.storageapi.min.js"></script>
    <script src="../jquery/jquery.ui-contextmenu.min.js"></script>
    <script src="../DataTables-1.10.2/media/js/jquery.dataTables.min.js"></script>
    <script src="scripts/general.js"></script>
    <script src="scripts/mainMenu.js"></script>
</head>

<body>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" style="color: #ffffff" href="mainMenu.aspx"><span class="glyphicon glyphicon-book"></span> Notas académicas</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav" style="margin-right:0px">
                <li class="active"><a style="background-color: #2c93c6; color: #ffffff" id="btnAyuda" href="#"><span class="glyphicon glyphicon-question-sign"></span> Ayuda</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right" style="margin-right:0px;background-color: #2c93c6;">
                <li id="btnLogOut"><a style="color: #ffffff" href="#"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>
            </ul>
            <div style="float:right; margin-right:12px; margin-top:14px">
                <label class="colorBlanco"><span class="glyphicon glyphicon-user"></span> Usuario:</label>
                <a style="color: #ffffff" href="#">Admin</a>
            </div>
        </div>
    </nav>

    <div class="container-fluid" style="padding-left:0px">

        <div id="panelLeft" class="col-lg-3 col-md-6 col-sm-6" style="width:18%">
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default mnuAdmin" id="mnuHome">
                    <div class="panel-heading" role="tab" id="headingHome">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnHome" data-toggle="collapse" data-parent="#accordion" href="javascript:Home()" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fa glyphicon glyphicon-home"></i> Home
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuNewItinerario">
                    <div class="panel-heading" role="tab" id="headingNewItinerario">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnNewItinerario" data-toggle="collapse" data-parent="#accordion" href="javascript:NewItinerary()" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fa glyphicon glyphicon-plus"></i> Nuevo Itinerario
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuMyItinerary">
                    <div class="panel-heading" role="tab" id="headingMyItinerary">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnMyItinerary" data-toggle="collapse" data-parent="#accordion" href="javascript:MyItinerary()" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fa glyphicon glyphicon-calendar"></i> Mis Itinerarios
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuLegalizeItinerary">
                    <div class="panel-heading" role="tab" id="headingLegalizeItinerary">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnLegalizeItinerary" data-toggle="collapse" data-parent="#accordion" href="javascript:LegalizeItinerary()" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fa glyphicon glyphicon-edit"></i> Legalizar Itinerarios
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuMyProfile">
                    <div class="panel-heading" role="tab" id="headingMyProfile">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnMyProfile" data-toggle="collapse" data-parent="#accordion" href="javascript:MyProfile()" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fa glyphicon glyphicon-user"></i> Mi perfil
                            </a>
                        </h4>
                    </div>
                </div>
            </div>
        </div>

        <div id="panelRigth" class="col-lg-9 col-md-6 col-sm-6 mccontent" style="width:82%">
            <div class="panel panel-default" id="panelHome">
                <div class="panel-body">
                    <h3 style="text-align:center"><strong style="border-radius:4px; background-color:#216692; color:#FFF; padding:15px 46% 15px 46%;">Home</strong></h3>
                    <br />
                    <img src="../imagenes/Banner2.png"  style="margin-left:35%"/>
                </div>
            </div>

            <div class="panel panel-default" id="panelNewItinerary">
                <div class="panel-body">
                    <form id="formNewItinerary">
                        <h3 style="text-align:center"><strong style="border-radius:4px; background-color:#216692; color:#FFF; padding:15px 41% 15px 40%;">Nuevo Itinerario</strong></h3>
                        <br />
                        <div class="row">
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Departamento de origen</b>
                                <input list="DeptHometown" name="DeptHometown" class="Cargo form-control"/>
                                <datalist id="DeptHometown"></datalist>
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Ciudad de origen</b>
                                <input list="Hometown" name="Hometown" class="Cargo form-control"/>
                                <datalist id="Hometown"></datalist>
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Fecha de salida</b>
                                <input id="DepartureDate" name="DepartureDate" type="date" class="form-control" />
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Hora salida</b>
                                <input id="DepartureTime" name="DepartureTime" type="time" class="form-control" />
                            </div>                       
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Departamento de destino</b>
                                <input list="DeptDestinationCity" name="DeptDestinationCity" class="Cargo form-control"/>
                                <datalist id="DeptDestinationCity"></datalist>
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Ciudad de destino</b>
                                <input list="DestinationCity" name="DestinationCity" class="Cargo form-control"/>
                                <datalist id="DestinationCity"></datalist>
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Fecha de llegada</b>
                                <input id="ArrivalDate" name="ArrivalDate" type="date" class="form-control" />
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Hora llegada</b>
                                <input id="ArrivalTime" name="ArrivalTime" type="time" class="form-control" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Tipo De Transporte</b>
                                <select id="TypeTransport" name="TypeTransport" class="form-control">
                                    <option>Vehículo</option>
                                    <option>Avión</option>
                                </select>
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Centro De Costos</b>
                                <input id="Centro" name="DepartureTime" type="text" class="form-control" placeholder="Centro de costos"/>
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Vuelo Internacional</b>
                                <div>
                                    <input id="CheckInternationalFlight" name="CheckInternationalFlight" style="height:25px; width:20px; float:left" type="checkbox" class="checkbox" />
                                    <input id="ValorVueloInter" type="text" class="form-control" style="float:left; width:85%; margin-left:5%" placeholder="Vuelo Internacional"/>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Motivo de viaje</b>
                                <textarea id="ReasonTrip" class="form-control" style="height:83px" placeholder="Motivo de viaje"></textarea>
                            </div>                           
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Gastos Adicionales</b>
                                <textarea id="AdditionalCosts" class="form-control" style="height:83px" placeholder="Gastos Adicionales"></textarea>
                            </div>
                            <div class="col-md-6 Itr">
                                <b style="font-size: 16px;">Asumir Hotel?</b>
                                <div>
                                    <input id="CheckHotel" style="height: 25px; width: 20px; float:left" type="checkbox" class="checkbox" />
                                    <input id="ValorHotel" style="float:left; width:85%; margin-left:5%" type="text" class="form-control" placeholder="Asumir Hotel" />
                                </div>
                                <b style="font-size: 16px;">Necesita Hotel?</b>
                                <input id="CheckAsumirHotel" style="height:25px; width:20px" type="checkbox" class="checkbox" />
                            </div>
                        </div>
                        <br />                     
                        <div class="row">
                            <div class="col-md-6" style="width:100%" >
                                <b style="font-size: 16px;">Observaciones</b>
                                <textarea id="Observations" class="form-control" placeholder="Observaciones"></textarea>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-6 Itr">
                                <a href="#" id="btnGuardarTrayecto" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar Trayecto</a>
                            </div>
                            <div class="col-md-6 Itr">
                                <a href="#" id="btnInforPasajero" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Información pasajero</a>
                            </div>
                            <div class="col-md-6 Itr">
                                <a href="#" id="btnVerRelGastos" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Ver relación de gastos</a>
                            </div>
                        </div>
                        <br />
                        <div id="DataGridTrayectos">
                            <table class="dataTable no-footer" role="grid" aria-describedby="tblsecretariasgerencia_info">
                                <thead>
                                    <tr role="row">
                                        <th>Login</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row" class="odd selected">
                                        <td>Dato1</td>
                                        <td>Dato2</td>
                                    </tr>
                                    <tr role="row" class="odd selected">
                                        <td>Dato1</td>
                                        <td>Dato2</td>
                                    </tr>
                                    <tr role="row" class="odd selected">
                                        <td>Dato1</td>
                                        <td>Dato2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>

            <div class="panel panel-default" id="panelMyItinerary">
                <div class="panel-body">
                    <form id="formMyItinerary">
                        <h3 style="text-align:center"><strong style="border-radius:4px; background-color:#216692; color:#FFF; padding:15px 41% 15px 41%;">Mis itinerarios</strong></h3>
                        <br />
                        <div class="form-group-lg">
                            <label for="MotorDbDocuware">Motor base de datos Docuware</label>

                            <select id="MotorDbDocuwaress" name="MotorDbDocuware" class="form-control">
                                <option>MSSQL</option>
                                <option>MYSQL</option>
                                <option>ORACLE</option>
                            </select>
                        </div>

                        <br />
                        <div class="form-group-lg">
                            <label for="UrlPlatformDocuware">Url Platform Docuware</label>
                            <input id="UrlPlatformDocuwarecs" name="UrlPlatformDocuware" type="text" class="form-control" placeholder="URL del servicio REST de Docuware" />
                        </div>
                        <br />

                        <div class="form-group-lg">
                            <label for="HorasCorreccionDwStoreDateTime">Horas corrección DwStoreDateTime</label>
                            <input id="HorasCorreccionDwStoreDateTismes" name="HorasCorreccionDwStoreDateTime" type="text" class="form-control" placeholder="Cantidad de horas a sumar o restar al campo DWSTOREDATETIME para corregir el problema de este campo que guarda en ocaciones con 5 horas de diferencia" />
                        </div>
                        <div id="DataGridMisItinerarios">
                            <table class="dataTable no-footer" role="grid" aria-describedby="tblsecretariasgerencia_info">
                                <thead>
                                    <tr role="row">
                                        <th>Login</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row" class="odd selected">
                                        <td>Dato1</td>
                                        <td>Dato2</td>
                                    </tr>
                                    <tr role="row" class="odd selected">
                                        <td>Dato1</td>
                                        <td>Dato2</td>
                                    </tr>
                                    <tr role="row" class="odd selected">
                                        <td>Dato1</td>
                                        <td>Dato2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <div class="form-group-lg">

                            <a href="#" id="btnGuardarDocuwasress" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
            </div>

            <div class="panel panel-default" id="panelLegalizeItinerary">
                <div class="panel-body">
                    <form id="formLegalizeItinerary">
                        <h3 style="text-align:center"><strong>Legalizar itinerarios</strong></h3>
                        <br />
                        <br />
                        <div class="form-group-lg">
                            <label for="BaseDatosDataDocuware">Base de datos de los archivadores de Docuware</label>
                            <input id="BaseDatosDataDocsuwssareds" name="BaseDatosDataDocuware" type="text" class="form-control" placeholder="Nombre de la base de datos de los datos de los archivadores de Docuware" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="BaseDatosSistemaDocuware">Base de datos del sistema de Docuware</label>
                            <input id="BaseDatosSistemaDocusswarsed" name="BaseDatosSistemaDocuware" type="text" class="form-control" placeholder="Nombre de la base de datos de sistema de Docuware" />
                        </div>
                        <br />

                        <div class="form-group-lg">
                            <label for="CompaniaDocuware">Compañia Docuware</label>
                            <input id="CompaniaDocsuswares" name="CompaniaDocuware" type="text" class="form-control" placeholder="Nombre de la compañia a a cual esta licenciado Docuware" />
                        </div>
                        <br />

                        <div class="form-group-lg">
                            <label for="ServidorDbDocuware">Servidor base datos Docuware</label>
                            <input id="ServidorDbDocuwsadfres" name="ServidorDbDocuware" type="text" class="form-control" placeholder="Usuario de base de datos de Docuware" />
                        </div>
                        <br />

                        <div class="form-group-lg">
                            <label for="UsuarioDbDocuware">Usuario base de datos Docuware</label>
                            <input id="UsuarioDbDocuwssdares" name="UsuarioDbDocuware" type="text" class="form-control" placeholder="Usuario de base de datos de Docuware" />
                        </div>
                        <br />

                        <div class="form-group-lg">
                            <label for="ContrasenaDbDocuware">Contrasena base de datos Docuware</label>
                            <input id="ContrasenaDbDocusdwarses" name="ContrasenaDbDocuware" type="password" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="MotorDbDocuware">Motor base de datos Docuware</label>

                            <select id="MotorDbDocuwaresass" name="MotorDbDocuware" class="form-control">
                                <option>MSSQL</option>
                                <option>MYSQL</option>
                                <option>ORACLE</option>
                            </select>
                        </div>

                        <br />
                        <div class="form-group-lg">
                            <label for="UrlPlatformDocuware">Url Platform Docuware</label>
                            <input id="UrlPlatformDocuwarassecs" name="UrlPlatformDocuware" type="text" class="form-control" placeholder="URL del servicio REST de Docuware" />
                        </div>
                        <br />

                        <div class="form-group-lg">
                            <label for="HorasCorreccionDwStoreDateTime">Horas corrección DwStoreDateTime</label>
                            <input id="HorasCorreccionDwStoreDasfteTismes" name="HorasCorreccionDwStoreDateTime" type="text" class="form-control" placeholder="Cantidad de horas a sumar o restar al campo DWSTOREDATETIME para corregir el problema de este campo que guarda en ocaciones con 5 horas de diferencia" />
                        </div>
                        <br />
                        <div class="form-group-lg">

                            <a href="#" id="btnGuardarDocuwassdfress" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
            </div>

            <div class="panel panel-default" id="panelMyProfile">
                <div class="panel-body">
                    <form id="formMyProfile">
                        <h3 style="text-align:center"><strong>Mi perfil</strong></h3>
                        <br />
                        <div class="row">
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Nombre</b>
                                <input id="UserName" name="UserName" type="text" class="form-control" placeholder="Nombre" />
                            </div>
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Documento</b>
                                <input id="UserDocument" name="UserDocument" type="number" class="form-control" placeholder="Cedula" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Email</b>
                                <input id="UserEmail" name="UserEmail" type="email" class="form-control" placeholder="Email" />
                            </div>
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Celular</b>
                                <input id="UserPhone" name="UserPhone" type="number" class="form-control" placeholder="Celular" />
                            </div>
                        </div>                  
                        <br />
                        <div class="row">
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Avianca Plus</b>
                                <input id="UserAviancaPluss" name="UserAviancaPluss" type="text" class="form-control" placeholder="Avianca Plus" />
                            </div>
                            <div class="col-md-6">
                                <b style="font-size: 16px;">One Pass</b>
                                <input id="UserOnePass" name="UserOnePass" type="text" class="form-control" placeholder="One Pass" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Gerencia</b>
                                <input id="Usermanagement" name="Usermanagement" type="text" class="form-control" placeholder="Gerencias" />
                            </div>
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Cargo</b>
                                <input id="UserCharge" name="UserCharge" type="text" class="form-control" placeholder="Cargo" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Fecha Nacimiento</b>
                                <input id="UserBirthDate" name="UserBirthDate" type="date" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Estado</b>
                                <input id="UserState" name="UserState" type="text" class="form-control" placeholder="Estado" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Login</b>
                                <input id="UserLogin" name="UserLogin" type="text" class="form-control" placeholder="Login" />
                            </div>
                            <div class="col-md-6">
                                <b style="font-size: 16px;">Contraseña</b>
                                <input id="UserPassword" name="UserPassword" type="password" class="form-control" placeholder="Contraseña" />
                            </div>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarDoMyProfiledfress" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
            </div>
            <br />
            <br />
        </div>
    </div>

    

    <%--<div class="modal fade" id="modalHome" style="visibility: visible">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formHome">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModColaborador">Colaborador:</label>
                            <select id="ModHomeSel" name="ModColaborador" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModSupervisor">Supervisor:</label>
                            <select id="ModHomeSupervisor" name="ModSupervisor" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModAutorizador">Autorizador:</label>
                            <select id="ModHomeAutorizador" name="ModAutorizador" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModHomeColaborador" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->--%>

    <div class="modal fade" id="modalModNewItinerary">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formModNewItinerary">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModColaborador">Colaborador:</label>
                            <select id="ModColaboradorNew" name="ModColaborador" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModSupervisor">Supervisor:</label>
                            <select id="ModSupervisorNew" name="ModSupervisor" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModAutorizador">Autorizador:</label>
                            <select id="ModAutorizadorNew" name="ModAutorizador" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModNewItinerary" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalAdminUser">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body" style="overflow: hidden">
                    <form id="formModUsuarios" style="overflow-y: scroll">
                        <br />
                        <div class="form-group-lg">
                            <label for="Login">Login:</label>
                            <input id="Login" name="Login" type="text" class="form-control" placeholder="Login" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Cedula">Cedula:</label>
                            <input id="Cedula" name="Cedula" type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Nombre">Nombre Completo:</label>
                            <input id="Nombre" name="Nombre" type="text" class="form-control" placeholder="Nombre" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Celular">Celular:</label>
                            <input id="Celular" name="Celular" type="tel" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="AviancaPlus">AviancaPlus:</label>
                            <input id="AviancaPlus" name="AviancaPlus" type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="OnePass">OnePass:</label>
                            <input id="OnePass" name="OnePass" type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Gerencia">Gerencia:</label>
                            <select id="Gerencia" name="Activo" class="form-control">
                            </select>

                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Cargo">Cargo:</label>
                            <select id="Cargo" name="Activo" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Email">Email:</label>
                            <input id="Email" name="Email" type="email" class="form-control" placeholder="Email" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="FechaNacimiento">Fecha de Nacimiento:</label>
                            <input id="FechaNacimiento" name="FechaNacimiento" type="datetime-local" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Activo">Activo:</label>
                            <select id="Activo" name="Activo" class="form-control">
                                <option>1</option>
                                <option>0</option>
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">

                            <a href="#" id="btnGuardarModUsuario" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalModColaboradoresAutorizadores">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formModColaboradoresAutorizadores">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModColaborador">Colaborador:</label>
                            <select id="ModColaborador" name="ModColaborador" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModSupervisor">Supervisor:</label>
                            <select id="ModSupervisor" name="ModSupervisor" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModAutorizador">Autorizador:</label>
                            <select id="ModAutorizador" name="ModAutorizador" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModColaborador" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalModSecretariasGerencia">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formModSecretariasGerencia">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModSecretaria">Secretaria:</label>
                            <select id="ModSecretaria" name="ModSecretaria" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModGerencia">Gerencia:</label>
                            <select id="ModGerencia" name="ModGerencia" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModSecretariasGerencia" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalModAlimentacionTerrestre">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formModAlimentacionTerrestre">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModAlimentaciondia">Alimentacion Dia:</label>
                            <input id="ModAlimentaciondia" name="ModAlimentaciondia" type="text" class="form-control" placeholder="Alimentacion Dia" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModAlimentaciondiaValor">Valor Tarifa:</label>
                            <input id="ModAlimentaciondiaValor" name="ModAlimentaciondiaValor" type="number" class="form-control" placeholder="Valor Tarifa" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModAlimentacionTerrestre" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalModHotelAsumido">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formModHotelAsumido">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTipoViaje">Tipo Viaje:</label>
                            <input id="ModTipoViaje" name="ModTipoViaje" type="text" class="form-control" placeholder="Tipo Viaje" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModValorViaje">Valor Tarifa:</label>
                            <input id="ModValorViaje" name="ModValorViaje" type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModHotelAsumido" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalTarifaPeaje">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formModTarifaPeaje">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModDepartamentoOrigen">Departamento Origen:</label>
                            <select id="ModDepartamentoOrigen" name="ModDepartamentoOrigen" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModMunicipioOrigen">Municipio Origen:</label>
                            <select id="ModMunicipioOrigen" name="ModMunicipioOrigen" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModDepartamentoDestino">Departamento Destino:</label>
                            <select id="ModDepartamentoDestino" name="ModDepartamentoDestino" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModMunicipioDestino">Municipio Destino:</label>
                            <select id="ModMunicipioDestino" name="ModMunicipioDestino" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModCosto">Costo:</label>
                            <input id="ModCosto" name="ModCosto" type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">

                            <a href="#" id="btnGuardarModTarifaPeaje" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalTarifaTerrestre">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formModTarifaTerrestre">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTerrestreDepartamentoOrigen">Departamento Origen:</label>
                            <select id="ModTerrestreDepartamentoOrigen" name="ModTerrestreDepartamentoOrigen" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTerrestreMunicipioOrigen">Municipio Origen:</label>
                            <select id="ModTerrestreMunicipioOrigen" name="ModTerrestreMunicipioOrigen" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTerrestreDepartamentoDestino">Departamento Destino:</label>
                            <select id="ModTerrestreDepartamentoDestino" name="ModTerrestreDepartamentoDestino" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTerrestreMunicipioDestino">Municipio Destino:</label>
                            <select id="ModTerrestreMunicipioDestino" name="ModTerrestreMunicipioDestino" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTerrestrePrimerDia">Primer Dia:</label>
                            <input id="ModTerrestrePrimerDia" name="ModTerrestrePrimerDia" type="number" class="form-control" />
                        </div>
                        <br />
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTerrestreSegundoDia">Segundo Dia:</label>
                            <input id="ModTerrestreSegundoDia" name="ModTerrestreSegundoDia" type="number" class="form-control" />
                        </div>
                        <br />
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTerrestreTransporte">Transporte:</label>
                            <!--<input id="ModTerrestreTransporte" name="ModTerrestreTransporte" type="text" class="form-control" />-->
                            <select id="ModTerrestreTransporte" name="ModTerrestreTransporte" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">

                            <a href="#" id="btnGuardarModTarifaTerrestre" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalAlerta">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="jumbotron">
                    <p id="alertamensaje"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalModTarifaExtranjero">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body">
                    <form id="formModTarifaExtranjero">
                        <br />
                        <div class="form-group-lg">
                            <label for="ModCargoExtranjero">Tipo Viaje:</label>
                            <input list="Cargos" name="ModCargoExtranjero" id="ModCargoExtranjero" class="Cargo" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTarifaExtranjero">Valor Tarifa:</label>
                            <input id="ModTarifaExtranjero" name="ModTarifaExtranjero" type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModTarifaExtranjero" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span>Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <footer id="barraBase" class="navbar-default navbar-fixed-bottom text-center" style="height:23px">
        <p style="float:left; color:#ffffff; margin:4px; font-size:12px">© 2019 Notas académicas</p>
        <p style="color:#ffffff; margin:4px; font-size:13px">Gestión de proyectos</p>
        <nav class="row">
        </nav>
    </footer>

</body>
</html>
