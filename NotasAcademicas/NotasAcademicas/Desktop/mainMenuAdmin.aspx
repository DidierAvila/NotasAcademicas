<%@ Page Language="C#" %>

<%Response.Expires = -1;%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Administrador Notas académicas</title>
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
    <script src="scripts/mainMenuAdmin.js"></script>
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
            <a id="btnPanelHome" class="navbar-brand" style="color: #ffffff" href="javascript:Home()"><span class="glyphicon glyphicon-book"></span> Administrador Notas académicas</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav" style="margin-right: 0px">
                <li class="active"><a style="background-color: #2c93c6; color: #ffffff" id="btnAyuda" href="../Manual%20Usuario.pdf" download><span class="glyphicon glyphicon-question-sign"></span> Ayuda</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right" style="margin-right: 0px; background-color: #2c93c6;">
                <li id="btnLogOut"><a style="color: #ffffff;" href="#"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>
            </ul>
            <div style="float: right; margin-right: 12px; margin-top: 14px">
                <label class="colorBlanco"><span class="glyphicon glyphicon-user"></span> Usuario:</label>
                <a style="color: #ffffff" href="#">Admin</a>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div id="panelLeft" class="col-lg-3 col-md-6 col-sm-6" style="padding-left: 0px;">
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                <div class="panel panel-default mnuAdmin" id="mnuDataBase">
                    <div class="panel-heading" role="tab" id="headingDataBase">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnPanelDataBase" data-toggle="collapse" data-parent="#accordion" href="javascript:AdminUsuarios()" aria-expanded="true" aria-controls="collapseOne">
                                <span class="glyphicon glyphicon-hdd"></span> Administrar Conexión a DB
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuadminUsuarios">
                    <div class="panel-heading" role="tab" id="headingAdminUsuarios">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnPanelAdminUsuarios" data-toggle="collapse" data-parent="#accordion" href="javascript:AdminUsuarios()" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fa fa-user"></i> Administrar Usuarios
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuAdminSecretarias">
                    <div class="panel-heading" role="tab" id="headingAdminSecretarias">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnAdminSecretarias" data-toggle="collapse" data-parent="#accordion" href="javascript:AdminSecretarias()" aria-expanded="true" aria-controls="collapseOne">
                                <span class="glyphicon glyphicon-user"></span> Administrar Secretarias por Gerencia
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuAdminColaboradores">
                    <div class="panel-heading" role="tab" id="headingAdminColaboradores">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnAdminColaboradores" data-toggle="collapse" data-parent="#accordion" href="#" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fa fa-users"></i> Administrar Colaboradores
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuAdminCentroCostos">
                    <div class="panel-heading" role="tab" id="headingAdminCentroCostos">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnAdminCentroCostos" data-toggle="collapse" data-parent="#accordion" href="#" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fa fa-credit-card"></i> Administrar Centros de Costos
                            </a>
                        </h4>
                    </div>
                </div>

                <div class="panel panel-default mnuAdmin" id="mnuAdminTarifas">
                    <div class="panel-heading" role="tab" id="headingAdminTarifas">
                        <h4 class="panel-title">
                            <a class="botonIconoNormal" id="btnAdminTarifas" data-toggle="collapse" data-parent="#accordion" href="#collapseSellos" aria-expanded="true" aria-controls="collapseOne">
                                <span class="glyphicon glyphicon-usd"></span> Administrar Tarifas
                            </a>
                        </h4>
                    </div>
                    <div class="panel-body container-fluid">
                        <div id="collapseSellos" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                            <ul class="nav nav-pills nav-stacked">
                                <div class="list-group">
                                    <a id="adminalimentacionterrestre" href="javascript:AdminAlimentacionTerrestre();" class="list-group-item"><span class="glyphicon glyphicon-cutlery"></span> Alimentacion Terrestre</a>
                                    <a id="adminhotelasumido" href="javascript:AdminHotelAsumido()" class="list-group-item"><span class="glyphicon glyphicon-home"></span> Hotel Asumido</a>
                                    <a id="admintarifapeaje" href="javascript:AdminTarifaPeaje()" class="list-group-item"><span class="glyphicon glyphicon-road"></span> Peajes</a>
                                    <a id="admintarifaterrestre" href="javascript:AdminTarifaTerrestre()" class="list-group-item"><span class="glyphicon glyphicon-road"></span> Tarifa Transporte</a>
                                    <a id="admintarifaextranjera" href="javascript:AdminTarifaExtranjera()" class="list-group-item"><i class="fa fa-plane"></i> Tarifa Extranjera</a>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="panelRigth" class="col-lg-9 col-md-6 col-sm-6 mccontent">        
        </div>
    </div>

    <div class="modal fade" id="modalAdminUser">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos de Usuario</h4>
                </div>
                <div class="modal-body" style="overflow: hidden">
                    <form id="formModUsuarios">
                        <div class="form-group-lg">
                            <label for="Login">Login:</label>
                            <input id="Login" name="Login" type="text" class="form-control" placeholder="Login" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Cedula">Cedula:</label>
                            <input id="Cedula" name="Cedula" type="number" class="form-control" placeholder="Cedula"  />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Nombre">Nombre Completo:</label>
                            <input id="Nombre" name="Nombre" type="text" class="form-control" placeholder="Nombre" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Celular">Celular:</label>
                            <input id="Celular" name="Celular" type="tel" class="form-control" placeholder="Celular" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="AviancaPlus">AviancaPlus:</label>
                            <input id="AviancaPlus" name="AviancaPlus" type="number" class="form-control" placeholder="Avianca Plus" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="OnePass">OnePass:</label>
                            <input id="OnePass" name="OnePass" type="number" class="form-control" placeholder="One Pass"/>
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
                            <input id="FechaNacimiento" name="FechaNacimiento" type="date" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Activo">Estado:</label>
                            <select id="Activo" name="Activo" class="form-control">
                                <option>1</option>
                                <option>0</option>
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModUsuario" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modalCentrosCostos">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Datos Centro de Costo</h4>
                </div>
                <div class="modal-body" style="overflow: hidden">
                    <form id="formModCentrosCostos">
                        <div class="form-group-lg" style="display:none">
                            <label for="IdCentroCosto">Tipo Centro de Costo:</label>
                            <input id="IdCentroCosto" name="IdCentroCosto" type="number" class="form-control" placeholder="Id Centro de Costo" />
                        </div>
                        <div class="form-group-lg">
                            <label for="IdTipoCentroCosto">Tipo Centro de Costo:</label>
                            <input id="IdTipoCentroCosto" name="IdTipoCentroCosto" type="number" class="form-control" placeholder="Tipo Centro de Costo" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="CodigoCentroCosto">Código Centro de Costo:</label>
                            <input id="CodigoCentroCosto" name="CodigoCentroCosto" type="number" class="form-control" placeholder="Código Centro de Costo" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="Descripcion">Descripción:</label>
                            <input id="Descripcion" name="Descripcion" type="text" class="form-control" placeholder="Descripción" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModCentroCosto" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
                    <h4 class="modal-title">Colaboradores Autorizadores</h4>
                </div>
                <div class="modal-body">
                    <form id="formModColaboradoresAutorizadores">
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
                            <a href="#" id="btnGuardarModColaborador" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    <%--<button type="button" class="btn btn-primary">Save changes</button>--%>
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
                    <h4 class="modal-title">Secretarias Gerencias</h4>
                </div>
                <div class="modal-body">
                    <form id="formModSecretariasGerencia">
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
                            <a href="#" id="btnGuardarModSecretariasGerencia" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
                    <h4 class="modal-title">Alimentación Terrestre</h4>
                </div>
                <div class="modal-body">
                    <form id="formModAlimentacionTerrestre">
                        <div class="form-group-lg">
                            <label for="ModAlimentaciondia">Alimentacion día:</label>
                            <input id="ModAlimentaciondia" name="ModAlimentaciondia" type="text" class="form-control" placeholder="Alimentacion Dia" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModAlimentaciondiaValor">Valor Tarifa:</label>
                            <input id="ModAlimentaciondiaValor" name="ModAlimentaciondiaValor" type="number" class="form-control" placeholder="Valor Tarifa" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModAlimentacionTerrestre" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
                    <h4 class="modal-title">Hotel Asumido</h4>
                </div>
                <div class="modal-body">
                    <form id="formModHotelAsumido">
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
                            <a href="#" id="btnGuardarModHotelAsumido" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
                    <h4 class="modal-title">Tarifa Peajes</h4>
                </div>
                <div class="modal-body">
                    <form id="formModTarifaPeaje">
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
                            <a href="#" id="btnGuardarModTarifaPeaje" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
                    <h4 class="modal-title">Tarifa Transporte</h4>
                </div>
                <div class="modal-body">
                    <form id="formModTarifaTerrestre">
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
                            <select id="ModTerrestreTransporte" name="ModTerrestreTransporte" class="form-control">
                            </select>
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModTarifaTerrestre" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
                    <h4 class="modal-title">Tarifa Extranjera</h4>
                </div>
                <div class="modal-body">
                    <form id="formModTarifaExtranjero">
                        <div class="form-group-lg">
                            <label for="ModCargoExtranjero">Tipo Viaje:</label>
                            <input list="Cargos" name="ModCargoExtranjero" id="ModCargoExtranjero" class="Cargo form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <label for="ModTarifaExtranjero">Valor Tarifa:</label>
                            <input id="ModTarifaExtranjero" name="ModTarifaExtranjero" type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="form-group-lg">
                            <a href="#" id="btnGuardarModTarifaExtranjero" class="btn btn-info btn-lg colorFondo"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</a>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
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
                    <h4 class="modal-title">Información</h4>
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

    <footer id="barraBase" class="navbar-fixed-bottom text-center" style="height: 23px;">
        <p style="float: left; color: #ffffff; margin: 4px; font-size: 12px">© 2019 Notas académicas</p>
        <p style="color: #ffffff; margin: 4px; font-size: 13px">Gestión de proyectos</p>
        <img src="../imagenes/Banner2.png"  style="text-align:center"/>
    </footer>

</body>
</html>