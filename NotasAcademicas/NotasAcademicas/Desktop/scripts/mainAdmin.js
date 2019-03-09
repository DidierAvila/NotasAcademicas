var colorFondoPanelHeadingA;
var colorTextoPanelHeadingA;
var colorFondoBodyPanelA;
//0 nada, 1 Borrar usuario,
var tarea;
//Objeto sobre el cual se procesará la tarea
var objTarea;
//Lista de los logines de Docuware. Se utiliza para llenar el combo de los usuarios en los perisos por campo
var listaLoginsDw;
//Lista de las tablas de los archivadores de DW
var listaTablasArchivadoresDw;
//Lista de las condiciones para permiso por campo
var listaCondiciones;
//Lista de los campos de la tabla de una archivador para confiurar permisos
var listaCamposArchivador;


$(document).ready(function () {

    tarea = 0;

    $("#btnLogOut").click(function () {
        window.location = "loginAdmin.aspx"
    });

    $("#panelValoresConfiguracion").hide();
    $("#panelConexionPrincipal").hide();
    $("#panelTipoAutenticacion").hide();
    $("#panelBotones").hide();
    $("#panelConsultaExterna").hide();
    $("#panelConsultaLite").hide();
    $("#panelEmail").hide();
    $("#panelGeneral").hide();
    $("#panelVisor").hide();
    $("#panelAyuda").hide();
    $("#panelDocuware").hide();
    $("#panelAutenticacionConsulta").hide();
    $("#panelConsultaLite").hide();
    $("#panelVisorPdf").hide();
    $("#panelLicencia").hide();
    $("#panelPermisosCampos").hide();

    //panelConsultaLite

    $("#btnPanelPermisosCampo").click(function () {
        $("#panelDocuware").hide();
        $("#panelAutenticacionConsulta").hide();
        $("#panelConsultaLite").hide();
        $("#panelVisorPdf").hide();
        $("#panelPermisosCampos").show();
        $("#panelLicencia").hide();

        CargarTablaPermisosCampos();

    });

    $("#btnPanelDocuware").click(function () {
        $("#panelDocuware").show();
        $("#panelAutenticacionConsulta").hide();
        $("#panelConsultaLite").hide();
        $("#panelVisorPdf").hide();
        $("#panelPermisosCampos").hide();
        $("#panelLicencia").hide();
    });

    $("#btnPanelLicencia").click(function () {
        $("#panelDocuware").hide();
        $("#panelAutenticacionConsulta").hide();
        $("#panelConsultaLite").hide();
        $("#panelVisorPdf").hide();
        $("#panelLicencia").show();
        $("#panelPermisosCampos").hide();
    });

    $("#btnPanelAutenticacion").click(function () {
        $("#panelDocuware").hide();
        $("#panelAutenticacionConsulta").show();
        $("#panelConsultaLite").hide();
        $("#panelVisorPdf").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();
    });
    
    $("#btnPanelConsultaLite").click(function () {
        $("#panelDocuware").hide();
        $("#panelAutenticacionConsulta").hide();
        $("#panelConsultaLite").show();
        $("#panelVisorPdf").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();
    });

    $("#btnPanelVisorPdf").click(function () {
        $("#panelDocuware").hide();
        $("#panelAutenticacionConsulta").hide();
        $("#panelConsultaLite").hide();
        $("#panelVisorPdf").show();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();
    });

    $("#btnFormConexionPpal").click(function () {
        $("#panelConexionPrincipal").show();
        $("#panelTipoAutenticacion").hide();
        $("#panelBotones").hide();
        $("#panelConsultaExterna").hide();
        $("#panelConsultaLite").hide();
        $("#panelEmail").hide();
        $("#panelGeneral").hide();
        $("#panelVisor").hide();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();
    });

    $("#btnFormTipoAutenticacion").click(function () {
        $("#panelTipoAutenticacion").show();
        $("#panelConexionPrincipal").hide();
        $("#panelBotones").hide();
        $("#panelConsultaExterna").hide();
        $("#panelConsultaLite").hide();
        $("#panelEmail").hide();
        $("#panelGeneral").hide();
        $("#panelVisor").hide();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();
    });
    
    $("#btnFormBotones").click(function () {
        $("#panelBotones").show();
        $("#panelTipoAutenticacion").hide();
        $("#panelConexionPrincipal").hide();
        $("#panelConsultaExterna").hide();
        $("#panelConsultaLite").hide();
        $("#panelEmail").hide();
        $("#panelGeneral").hide();
        $("#panelVisor").hide();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();

    });

    $("#btnFormConsultaExterna").click(function () {
        $("#panelBotones").hide();
        $("#panelTipoAutenticacion").hide();
        $("#panelConexionPrincipal").hide();
        $("#panelConsultaExterna").show();
        $("#panelConsultaLite").hide();
        $("#panelEmail").hide();
        $("#panelGeneral").hide();
        $("#panelVisor").hide();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();
    });

    $("#btnFormConsultaExterna").click(function () {
        $("#panelBotones").hide();
        $("#panelTipoAutenticacion").hide();
        $("#panelConexionPrincipal").hide();
        $("#panelConsultaExterna").show();
        $("#panelConsultaLite").hide();
        $("#panelEmail").hide();
        $("#panelGeneral").hide();
        $("#panelVisor").hide();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();

    });

    $("#btnFormConsultaLite").click(function () {
        $("#panelBotones").hide();
        $("#panelTipoAutenticacion").hide();
        $("#panelConexionPrincipal").hide();
        $("#panelConsultaExterna").hide();
        $("#panelConsultaLite").show();
        $("#panelEmail").hide();
        $("#panelGeneral").hide();
        $("#panelVisor").hide();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();

    });

    $("#btnFormEmail").click(function () {
        $("#panelBotones").hide();
        $("#panelTipoAutenticacion").hide();
        $("#panelConexionPrincipal").hide();
        $("#panelConsultaExterna").hide();
        $("#panelConsultaLite").hide();
        $("#panelEmail").show();
        $("#panelGeneral").hide();
        $("#panelVisor").hide();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();

    });

    $("#btnFormGeneral").click(function () {
        $("#panelBotones").hide();
        $("#panelTipoAutenticacion").hide();
        $("#panelConexionPrincipal").hide();
        $("#panelConsultaExterna").hide();
        $("#panelConsultaLite").hide();
        $("#panelEmail").hide();
        $("#panelGeneral").show();
        $("#panelVisor").hide();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();

    });

    $("#btnFormVisor").click(function () {
        $("#panelBotones").hide();
        $("#panelTipoAutenticacion").hide();
        $("#panelConexionPrincipal").hide();
        $("#panelConsultaExterna").hide();
        $("#panelConsultaLite").hide();
        $("#panelEmail").hide();
        $("#panelGeneral").hide();
        $("#panelVisor").show();
        $("#panelAyuda").hide();
        $("#panelLicencia").hide();
        $("#panelPermisosCampos").hide();

    });

    $("#btnAyuda").click(function () {
        $("#panelPermisosCampos").hide();
        $("#panelBotones").hide();
        $("#panelTipoAutenticacion").hide();
        $("#panelConexionPrincipal").hide();
        $("#panelConsultaExterna").hide();
        $("#panelConsultaLite").hide();
        $("#panelEmail").hide();
        $("#panelGeneral").hide();
        $("#panelVisor").hide();
        $("#panelAyuda").show();
       
        altoFrmAyuda = $(window).height() - 170;

        $("#frmAyuda").attr("style", "width:100%;height:" + altoFrmAyuda + "px");

        urlAyuda = "https://desarrollomicrocolsa.blob.core.windows.net/documentospublicos/Manuales/ConsultaInternet/ManualAdministracionCiHtml5.pdf";

        //urlAyuda = "../Ayuda/ManualAdministracionCiHtml5.pdf";

        $("#frmAyuda").attr("src", "https://docs.google.com/viewer?url=" + urlAyuda + "&embedded=true");


    });

    $("#mnuValoresCfg").hide();

    $("#mnuGrupos").hide();

    $("#mnuPerfiles").hide();

    $("#mnuCruces").hide();

    $("#mnuSellos").hide();

    $("#mnuArchivadores").hide();


    //$("#btnPanelValoresConfiguracion").click(function () {

    //    $("#panelValoresConfiguracion").show();

    //});

    //$("#btnPanelArchivadores").click(function () {
    //    $("#panelValoresConfiguracion").hide();
    //});
    
    //$("#btnPanelPerfiles").click(function () {
    //    $("#panelValoresConfiguracion").hide();
    //});

    //$("#btnPanelPerfiles").click(function () {
    //    $("#panelValoresConfiguracion").hide();
    //});

    //$("#btnPanelCruces").click(function () {
    //    $("#panelValoresConfiguracion").hide();
    //});

    //$("#btnPanelSellos").click(function () {
    //    $("#panelValoresConfiguracion").hide();
    //});

    //$("#btnPanelGrupos").click(function () {
    //    $("#panelValoresConfiguracion").hide();
    //});

    //CargarDatosServidor();

    $("#btnGuardarCfg").click(GuardarDatosServidor);

    $("#btnGuardarCfgBotones").click(GuardarConfiguracionBotones);

    $("#btnGuardarConsultaExternaCfg").click(GuardarConfiguracionConsultaExterna);

    $("#btnGuardarConsultaLiteCfg").click(GuardarConfiguracionConsultaLite);

    $("#btnGuardarEmailCfg").click(GuardarConfiguracionEmail);

    $("#btnGuardarGeneralCfg").click(GuardarConfiguracionGeneral);

    $("#btnGuardarVisorCfg").click(GuardarConfiguracionVisor);

    $("#btnGuardarDocuware").click(GuardarConfiguracionDocuware);

    $("#btnGuardarTipoAutenticacionConsulta").click(GuardarConfiguracionAutenticacionConsulta);

    $("#btnGuardarConsultaLite").click(GuardarConfiguracionConsultaLite);

    $("#btnGuardarVisorDocumentos").click(GuardarConfiguracionVisorPdf);

    //CargarParametrosGeneralesConfiguracion();

    init();


    colorFondoPanelHeadingA = "#216692";


    colorTextoPanelHeadingA = "#ffffff";
    colorFondoBodyPanelA = "#474747";

    CorregirColoresB();

    CorregirTamanoVisorPDF();

    $(window).resize(CorregirTamanoVisorPDF);

    $("#btnCancelarTarea").click(CancelarTarea);

    $("#btnCancelarDetallePermisosCampo").click(CancelarTarea);

    $("#btnComfirmarDetallePermisosCampo").click(ProcesarTarea);

    $("#btnProcesarTarea").click(ProcesarTarea);

    //$("#DETALLE_PC_NOMBREARCHIVADOR").change(CargarListaCamposArchivador);

    //$("#btnAdicionarPermisos").click(AdicionarPermisosCampo);

});

///Adiciona los permisos por campos
function AdicionarPermisosCampo()
{
    tarea = 3;
    //objTarea = $(this).parents(":eq(1)");
    lUsuario = $("#selUsuarioPermisos").val();

    $("#DETALLE_PC_NOMBREARCHIVADOR").val("");
    //NOMBREUSUARIO = $($(objTarea).children()[2]).html();

    $("#DETALLE_PC_VALOR").val("");
    $("#DETALLE_PC_CONDICION").val("");

    $("#DETALLE_PC_NOMBREARCHIVADOR_OLD").val("");
    $("#DETALLE_PC_CAMPO_OLD").val("");
    $("#DETALLE_PC_VALOR_OLD").val("");
    $("#DETALLE_PC_CONDICION_OLD").val("");
    $("#DETALLE_PC_NOMBREUSUARIO_OLD").val(lUsuario);

    CargarListaCamposArchivador();

    CargarListaCamposArchivador();

    $("#DETALLE_PC_CAMPO").val("");

    $("#modalDetallePermisosCampoLabel").html("Adicionar permiso  a usuario:" + lUsuario);
    $("#btnComfirmarDetallePermisosCampo").html("Adicionar");
    CargarCombosListaTablas();

    $("#modalDetallePermisosCampo").modal("show");
}

function ProcesarTarea()
{

    switch (tarea)
    {
        case 1:
            {
                BorrarPermisoUsuario();
            }
            break;
        case 2:
            {
                ModificarPermisoUsuario();
            }
            break;
        case 3:
            {
                InsertarPermisoUsuario();
            }
            break;
    }

    
}

function BorrarPermisoUsuario()
{

    NOMBREARCHIVADOR = $($(objTarea).children()[1]).html();
    NOMBREUSUARIO = $($(objTarea).children()[2]).html();
    CAMPO = $($(objTarea).children()[3]).html();
    VALOR = $($(objTarea).children()[4]).html();
    CONDICION = $($(objTarea).children()[5]).html();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=1700&NOMBREARCHIVADOR=" + NOMBREARCHIVADOR + "&NOMBREUSUARIO=" + NOMBREUSUARIO + "&CAMPO=" + CAMPO + "&VALOR=" + VALOR + "&CONDICION=" + CONDICION,
        method: "POST",
        dataType: "json",
        async: true,
        beforeSend: function () {
            /*
            $("#divMensajeError").hide();
            $(".divEspera").show("scale", "slow");
            */
        },
        success: function (result) {

            tarea = 0;
            objTarea = null;

            if (result.toString().indexOf("ERROR") > -1) {

                //$("#vtnAlerta").show();



            } else {

                if (result.toString().indexOf("false") > -1) {
                    //$("#vtnAlerta").show();
                } else {

                    CargarTablaPermisosCampos();

                }


            }

            $("#modalConfirmarTarea").modal("hide");



        },
        error: function (result) {

            tarea = 0;
            objTarea = null;

            //$("#vtnAlerta").show();

            $("#modalConfirmarTarea").modal("hide");
        }
    });
}

function ModificarPermisoUsuario() {
    frm = $("#frmDetallePermisosCampo");
    datos = JSON.stringify(frm.serializeArray());

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=1900",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        beforeSend: function ()
        {
            /*
            $("#divMensajeError").hide();
            $(".divEspera").show("scale", "slow");
            */
        },
        success: function (result) {

            $("#modalDetallePermisosCampo").modal("hide");

            if (result.toString().indexOf("ERROR") > -1) {

                //$("#vtnAlerta").show();

            } else {

                if (result.toString().indexOf("false") > -1)
                {
                    //$("#vtnAlerta").show();
                    tarea = 0;

                } else {
                    
                    tarea = 0;
                    CargarTablaPermisosCampos();

                }


            }



        },
        error: function (result) {
            //$("#vtnAlerta").show();
            $("#frmDetallePermisosCampo").modal("hide");
        }
    });
}

function InsertarPermisoUsuario() {

    frm = $("#frmDetallePermisosCampo");
    datos = JSON.stringify(frm.serializeArray());

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=1600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        beforeSend: function () {
            /*
            $("#divMensajeError").hide();
            $(".divEspera").show("scale", "slow");
            */
        },
        success: function (result) {

            $("#modalDetallePermisosCampo").modal("hide");

            if (result.toString().indexOf("ERROR") > -1) {

                //$("#vtnAlerta").show();

            } else {

                if (result.toString().indexOf("false") > -1) {
                    //$("#vtnAlerta").show();
                    tarea = 0;

                } else {

                    tarea = 0;
                    CargarTablaPermisosCampos();

                }


            }



        },
        error: function (result) {
            //$("#vtnAlerta").show();
            $("#frmDetallePermisosCampo").modal("hide");
        }
    });
}

function CancelarTarea()
{
    tarea = 0;
    objTarea = null;
    $("#modalConfirmarTarea").modal("hide");
}

function CargarDatosServidor() {

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=300",
        method: "POST",
        dataType: "json",
        async: true,
        beforeSend: function () {
            /*
            $("#divMensajeError").hide();
            $(".divEspera").show("scale", "slow");
            */
        },
        success: function (result) {

            if (result.toString().indexOf("ERROR") > -1) {

                $("#vtnAlerta").show();

                

            } else {

                if (result.toString().indexOf("false") > -1) {
                    $("#vtnAlerta").show();
                } else {
                    CargarListaLoginsDw();
                    CargarTablaPermisosCampos();
                    CargarListaTablasArchivadoresDw();
                    CargarListaCondiciones();

                    $("#selUsuarioPermisos").change(CargarTablaPermisosCampos);
                    //document.location.href = "mainAdmin.aspx";
                    $("#servidorAdmin").val(result["servidorAdmin"]);
                    $("#driverAdmin").val(result["driverAdmin"]);
                    $("#usuarioBd").val(result["usuarioBd"]);
                    $("#nombreDBConsulta").val(result["nombreDBConsulta"]);

                }


            }



        },
        error: function (result) {
            $("#vtnAlerta").show();
        }
    });

}

//Guarda los datos del Servidor en el Web.Config
function GuardarDatosServidor() {

    //$("formPg" + pg).submit();

    frm = $("#formConexionPpal");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    //datos = $("#formPg" + pg).serialize();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=400",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda los datos del Servidor en el Web.Config
function CargarListaCondiciones() {

    //$("formPg" + pg).submit();

    //datos = $("#formPg" + pg).serialize();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=2000",
        method: "POST",
        dataType: "json",
        async: true,
        success: function (result) {
            
            if (result.toString().indexOf("ERROR") == -1) {
                listaCondiciones = result;
                CargarComboListaCondiciones();
                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                //$("#lblError").show();
            }

        },
        error: function (result) {

            //$("#lblError").show();

        }
    });





}

//Carga la lista de los campos de un archivador para los permisos por campo
function CargarListaCamposArchivador() {

    lNombreArchivador = $("#DETALLE_PC_NOMBREARCHIVADOR").val();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=2100&NOMBREARCHIVADOR=" + lNombreArchivador,
        method: "POST",
        dataType: "json",
        async: true,
        success: function (result) {

            if (result.toString().indexOf("ERROR") == -1) {
                
                listaCamposArchivador = result;

                $("#DETALLE_PC_CAMPO").empty();
                
                $.each(listaCamposArchivador, function () {
                    $("#DETALLE_PC_CAMPO").append($("<option> " +
                    "</option>").val(this["COLUMN_NAME"]).html(this["COLUMN_NAME"]));
                });

                $("#DETALLE_PC_CAMPO").val($($(objTarea).children()[3]).html());

                

                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                //$("#lblError").show();
            }

        },
        error: function (result) {

            //$("#lblError").show();

        }
    });





}

//Carga el combo de la lista de usuarios
function CargarComboListaCondiciones() {
    $("#DETALLE_PC_CONDICION").empty();

    
    $.each(listaCondiciones, function () {
        $("#DETALLE_PC_CONDICION").append($("<option> " +
        "</option>").val(this.valueOf()).html(this.valueOf()));
    });
}

function CargarParametrosGeneralesConfiguracion()
{

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=500",
        method: "POST",
        dataType: "json",
        //data: ,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {

                for (i = 0; i < result.length; i++)
                {
                    switch (result[i].TIPOCAMPO)
                    {
                        case "TEXTO":
                            {


                                var texto = $("#" + result[i].NOMBRECAMPO);
                                texto.val(result[i].VALOR);

                                texto.attr("placeholder", result[i].AYUDA);
                            }
                            break;
                        case "LISTA":
                            {
                                var lista = $("#" + result[i].NOMBRECAMPO);
                                lista.find("option").remove();
                                var arrOp = result[i].VALORES.split(",");
                                for (k = 0; k < arrOp.length; k++)
                                {

                                    lista.append("<option>" + arrOp[k] + "</option>");

                                }

                                lista.val(result[i].VALOR);

                            }
                            break;
                        default:
                            {

                            }
                            break;
                    }
                }

            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });

}

//Guarda configuracion de los botones
function GuardarConfiguracionBotones() {

    //$("formPg" + pg).submit();

    frm = $("#formBotones");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    //datos = $("#formPg" + pg).serialize();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda configuracion consulta externa
function GuardarConfiguracionConsultaExterna() {

    //$("formPg" + pg).submit();

    frm = $("#formConsultaExterna");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    //datos = $("#formPg" + pg).serialize();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda configuracion consulta lite
function GuardarConfiguracionConsultaLite() {

    //$("formPg" + pg).submit();

    frm = $("#formConsultaLite");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    //datos = $("#formPg" + pg).serialize();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda configuracion Email
function GuardarConfiguracionEmail() {

    //$("formPg" + pg).submit();

    frm = $("#formEmail");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    //datos = $("#formPg" + pg).serialize();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda configuracion General
function GuardarConfiguracionGeneral() {

    //$("formPg" + pg).submit();

    frm = $("#formGeneral");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    //datos = $("#formPg" + pg).serialize();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda configuracion visor
function GuardarConfiguracionVisor() {

    //$("formPg" + pg).submit();

    frm = $("#formVisor");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    //datos = $("#formPg" + pg).serialize();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
                //estadoFormulario = "ingresando";
                //idFormulario = result;
                //$("#idFormulario").text(idFormulario);
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

function CorregirTamanoVisorPDF() {


    altoPanels = $(window).height() - 120;


    //$("#frmVisorPDFjs").attr("style", "width:100%;height:" + altoDivArchivadores + "px");

    $("#panelLeft").attr("style", "max-height:" + altoPanels + "px");

    $("#panelRigth").attr("style", "max-height:" + altoPanels + "px");


}

//Guarda configuracion Docuware
function GuardarConfiguracionDocuware() {

    frm = $("#formDocuware");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda configuracion Autenticación
function GuardarConfiguracionAutenticacionConsulta() {

    frm = $("#formAutenticacionConsulta");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda configuracion Consulta Lite
function GuardarConfiguracionConsultaLite() {

    frm = $("#formConsultaLite");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

//Guarda configuracion Visor Pdf
function GuardarConfiguracionVisorPdf() {

    frm = $("#formVisorPdf");
    datos = JSON.stringify(frm.serializeArray());
    $("#lblError").hide();

    $.ajax({
        url: "../controladores/controladorCI.ashx?op=600",
        method: "POST",
        dataType: "json",
        data: datos,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });





}

function CorregirColoresB() {
    estilo1 = "background-color:" + colorFondoPanelHeadingA + ";\n"
    + "color:" + colorTextoPanelHeadingA;
    $(".panel-heading").attr("style", estilo1);

    // estilo2 = "background-color:" + colorFondoBodyPanel + ";\n"
    //+ "color:" + colorTextoPanelHeading;
    // $(".panel-body").attr("style", estilo2);
}

function CargarTablaPermisosCampos()
{
    $("#tblPermisosCampo").dataTable({destroy:true});
    
    lLogin = $("#selUsuarioPermisos").val();
    url = "../controladores/controladorCI.ashx?op=1500&lLogin=" + lLogin;

    $("#tblPermisosCampo").dataTable({
        "destroy": true,
        "paging": true,
        ajax: { url: url, dataSrc: "" },
        drawCallback: function () {

            $(".btnBorrar").click(function () {
                tarea = 1;
                objTarea = $(this).parents(":eq(1)");
                lUsuario = $("#selUsuarioPermisos").val();
                $("#modalComfirmarTareaLabel").html("Borrar permiso usuario");
                $("#cuerpoVentanaComfirmarTarea").html("<h3>" + "Comfirma el borrador del permiso por campo para: " + lUsuario + ", para el campo: " + $($(objTarea).children()[3]).html() + ", con el valor:" + $($(objTarea).children()[4]).html() + "</h3>");
                $("#modalConfirmarTarea").modal("show");
            });

            $(".btnActualizarPermisosCampo").click(function () {
                tarea = 2;
                objTarea = $(this).parents(":eq(1)");
                //lUsuario = $("#selUsuarioPermisos").val();
                $("#modalDetallePermisosCampoLabel").html("Modificar permiso usuario");

                $("#btnComfirmarDetallePermisosCampo").html("Actualizar");

                CargarCombosListaTablas();

                $("#DETALLE_PC_NOMBREARCHIVADOR").val($($(objTarea).children()[1]).html());
                //NOMBREUSUARIO = $($(objTarea).children()[2]).html();
                
                $("#DETALLE_PC_VALOR").val($($(objTarea).children()[4]).html());
                $("#DETALLE_PC_CONDICION").val($($(objTarea).children()[5]).html());

                $("#DETALLE_PC_NOMBREARCHIVADOR_OLD").val($($(objTarea).children()[1]).html());
                $("#DETALLE_PC_CAMPO_OLD").val($($(objTarea).children()[3]).html());
                $("#DETALLE_PC_VALOR_OLD").val($($(objTarea).children()[4]).html());
                $("#DETALLE_PC_CONDICION_OLD").val($($(objTarea).children()[5]).html());
                $("#DETALLE_PC_NOMBREUSUARIO_OLD").val($($(objTarea).children()[2]).html());

                CargarListaCamposArchivador();

                $("#DETALLE_PC_CAMPO").val($($(objTarea).children()[3]).html());

                $("#modalDetallePermisosCampo").modal("show");
            });

            /*
            $(".btnAdicionarPermisosCampo").click(function () {
                tarea = 3;
                objTarea = $(this).parents(":eq(1)");
                lUsuario = $("#selUsuarioPermisos").val();

                $("#DETALLE_PC_NOMBREARCHIVADOR").val("");
                //NOMBREUSUARIO = $($(objTarea).children()[2]).html();

                $("#DETALLE_PC_VALOR").val("");
                $("#DETALLE_PC_CONDICION").val("");

                $("#DETALLE_PC_NOMBREARCHIVADOR_OLD").val("");
                $("#DETALLE_PC_CAMPO_OLD").val("");
                $("#DETALLE_PC_VALOR_OLD").val("");
                $("#DETALLE_PC_CONDICION_OLD").val("");
                $("#DETALLE_PC_NOMBREUSUARIO_OLD").val(lUsuario);

                CargarListaCamposArchivador();

                CargarListaCamposArchivador();

                $("#DETALLE_PC_CAMPO").val("");

                $("#modalDetallePermisosCampoLabel").html("Adicionar permiso  a usuario:" + lUsuario);
                $("#btnComfirmarDetallePermisosCampo").html("Adicionar");
                CargarCombosListaTablas();

                $("#modalDetallePermisosCampo").modal("show");
            });
            */
            /*
            $(".glyphicon-file").click(function () {

                dwdocid = $(this).attr("data-dwdocid");

                buscarImagenPorDocId();

            });
            */
        },
        "columns": [
            { "data": "BOTONES", "orderable": false },
            { "data": "NOMBREARCHIVADOR", "orderable": false },
            { "data": "NOMBREUSUARIO", "orderable": false },
            { "data": "CAMPO", "orderable": false },
            { "data": "VALOR", "orderable": false },
            { "data": "CONDICION", "orderable": false },
            { "data": "TIPOOBJETO", "orderable": false },
            { "data": "TIPOPERMISO", "orderable": false },
            { "data": "CONECTOR", "orderable": false }
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontro ningún registro",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No se encontro ningún registro",
            "infoFiltered": "(filtrado de  _MAX_ total registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "loadingRecords": "Cargando registros...",
            "processing": "Procesando...",
            "ordering": true

        }
    });
}

//Carga el combo de la lista de usuarios
function CargarComboLoginsDw()
{
    $("#selUsuarioPermisos").empty();

    
    $.each(listaLoginsDw, function () {
        $("#selUsuarioPermisos").append($("<option> " +
        "</option>").val(this["LOGINDW"]).html(this["LOGINDW"]));
    });
}

function CargarCombosListaTablas() {
    
    $("#DETALLE_PC_NOMBREARCHIVADOR").empty();

    
    $.each(listaTablasArchivadoresDw, function () {
        $("#DETALLE_PC_NOMBREARCHIVADOR").append($("<option> " +
        "</option>").val(this["TABLA"]).html(this["TABLA"]));
    });

    CargarListaCamposArchivador();
    
}
//Cargar las lista de usuarios de DW
//Solo se carga una vez al inicio
function CargarListaLoginsDw()
{
    $.ajax({
        url: "../controladores/controladorCI.ashx?op=1400",
        method: "POST",
        dataType: "json",
        //data: ,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1)
            {
                
                listaLoginsDw = result;

                CargarComboLoginsDw();

                /*
                $("#selUsuarioPermisos").empty();

                $.each(result, function () {
                    $("#selUsuarioPermisos").append($("<option> " +                                                     
                    "</option>").val(this["LOGINDW"]).html(this["LOGINDW"]));
                });
                */

            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });
}

//Cargar las lista de tablas de DW
//Solo se carga una vez al inicio
function CargarListaTablasArchivadoresDw() {
    $.ajax({
        url: "../controladores/controladorCI.ashx?op=1800",
        method: "POST",
        dataType: "json",
        //data: ,
        async: true,
        success: function (result) {
            if (result.toString().indexOf("ERROR") == -1) {
                
                listaTablasArchivadoresDw = result;

                
                
                //CargarComboLoginsDw();

                /*
                $("#selUsuarioPermisos").empty();

                $.each(result, function () {
                    $("#selUsuarioPermisos").append($("<option> " +                                                     
                    "</option>").val(this["LOGINDW"]).html(this["LOGINDW"]));
                });
                */

            } else {
                $("#lblError").show();
            }

        },
        error: function (result) {

            $("#lblError").show();

        }
    });
}



