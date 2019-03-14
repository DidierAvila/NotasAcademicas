<%@ Page Language="C#" %>


<%
    Response.Expires = -1;
     %>

<!DOCTYPE html>
<html class="htmlLogin">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="../font-awesome-4.3.0/css/font-awesome.min.css" rel="stylesheet" />
    <script src="../jquery/jquery-1.11.2.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="css/general.min.css" rel="stylesheet" />
    <script src="scripts/general.js"></script>
    <script src="scripts/login.js"></script>
    <script src="scripts/mainAdmin.js"></script>
    <script src="../jquery/jquery.storageapi.min.js"></script>
    <link href="css/general.css" rel="stylesheet" />
    <title>Ingreso portal Notas académicas</title>
    <link rel="icon" href="../imagenes/FabiconNtAc.ico" />

    <style>
        html{
            background:url("") no-repeat center;
            background-size:cover;
            min-height:100%;         
        }
    </style>

</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div id="divForm" class="modal-dialog modal-lg  redondeadoA hidden" > 
                <div class="modal-content sombraA redondeadoA" >
                    <div class="modal-body colorFondo redondeadoA">
                        <div class="container-fluid  colorFondo">
                            <br />
                            <br />
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <img class="img-responsive center-block " src="../imagenes/Banner2.png"/>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <label class="colorBlanco tamanoLabelForm" for="txtUsuario">Iniciar sesión</label>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <br />
                                    <form role="form">
                                        <div class="form-group">
                                            <label class="colorBlanco tamanoLabelForm" for="txtUsuario">Usuario:</label>
                                            <input id="txtUsuario" type="text" class="form-control" placeholder="Ingrese el usuario">
                                        </div>
                                        <div class="form-group">
                                            <label class="colorBlanco tamanoLabelForm" for="txtContrasena">Contraseña:</label>
                                            <input type="password" class="form-control" id="txtContrasena"  placeholder="Ingrese la contraseña">
                                        </div>
                                        <div class="checkbox">
                                            <label class="colorBlanco"><input type="checkbox"> Recordarme</label>
                                        </div>
                                        <button type="button" id="btnIngresar" class="btn btn-default btn-lg btn-block colorFondo">Ingresar</button>
                                        <div class="panel-heading">
                                            <h4 class="panel-title" style="margin-left:-13px">
                                                <a class="botonIconoNormal" id="btnAdministrar" data-toggle="collapse" data-parent="#accordion" style="color:#FFF" href="javascript:AdminUsuarios()" aria-expanded="true" aria-controls="collapseOne">
                                                    <i class="fa glyphicon glyphicon-globe"></i> Administrar
                                                </a>
                                            </h4>
                                        </div>     
                                    </form>
                                    <br />
                                </div>
                                           
                                <div id="DivAlert">
                                    <div class="col-lg-12 col-sm-12 col-md-12">
                                        <br />
                                        <div id="vtnAlerta" class="alert alert-warning alert-dismissible fade in" role="alert">
                                            <h4 id="oh-snap!-you-got-an-error!">Advertencia<a class="anchorjs-link" href="#oh-snap!-you-got-an-error!"><span class="anchorjs-icon"></span></a></h4>
                                            <label id="lblInfoError">Usuario y/o contraseña no válido.</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                        </div>
                        <div class="hidden" id="divVersion">
                            <label id="lblVersion">Versión: 1.0.0.0</label>
                        </div>
                        <div>
                            <img class="imgEspera img-responsive" src="../imagenes/InocoAnimadoEspera.gif" />
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
            </div>
        </div>  
    </div>
    
</body>
</html>


