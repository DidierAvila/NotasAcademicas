var loginUsuario;
var storage;
var mod = true;

$(document).ready(function () {
    $(".collapseExample").collapse();
    init();
    poseePermiso();
    CorregirColoresB();
    Home();

    $("#btnLogOut").click(function () {
        storage = $.sessionStorage;
        storage.remove('loginusuario');
        document.location.href = "mainMenu.aspx";
    });

    $("#btnPanelHome").click(function () {
        Home();
    });

    $("#btnPanelDataBase").click(function () {
        AdmintrarDB();
    });
    
    $(".navbar-default").css("background-color", "#1F6591");

    $("#modalHome").click(function () {
        AdminUsuarios();
    });

    $("#btnPanelAdminUsuarios").click(function () {
        AdminUsuarios();
    });

    $("#btnAdminCentroCostos").click(function () {
        AdminCentrosCostos();
    });

    $("#btnAdminSecretarias").click(function () {
        AdminSecretarias();
    });

    $("#btnAdminColaboradores").click(function () {
        AdminColaboradores();
    });

    $('#modalAlerta').on('hide.bs.modal', function () {
        $("#alertamensaje").html('');
    })

    $("#btnGuardarModColaborador").click(function () {
        modColaboradorAutorizador($("#ModColaborador").val()
                                , $("#ModAutorizador").val());
    });

    $("#btnGuardarModSecretariasGerencia").click(function () {
        modSecretariasGerencia($("#ModSecretaria").val()
                                , $("#ModGerencia").val());
    });

    $('#modalAdminUser').on('hide.bs.modal', function () {
        mod = true;
    })

    $('#modalModAlimentacionTerrestre').on('hide.bs.modal', function () {
        mod = true;
    })

    $('#modalModHotelAsumido').on('hide.bs.modal', function () {
        mod = true;
    })

    $("#btnGuardarModTarifaExtranjero").click(function () {
        modTarifaExtranjera($("#ModCargoExtranjero").val()
                          , $("#ModTarifaExtranjero").val()
            );
    });

    $("#btnGuardarModAlimentacionTerrestre").click(function () {
        if (Boolean(mod)) {
            modAlimentacionTerrestre($("#ModAlimentaciondia").val()
                                    , $("#ModAlimentaciondiaValor").val());
        } else {
            agregarNuevoAlimentacionTerrestre($("#ModAlimentaciondia").val()
                                    , $("#ModAlimentaciondiaValor").val());
        }
    });

    $("#btnGuardarModTarifaPeaje").click(function () {
        modTarifaPeaje($("#ModDepartamentoOrigen").val()
                        , $("#ModMunicipioOrigen").val()
                        , $("#ModDepartamentoDestino").val()
                        , $("#ModMunicipioDestino").val()
                        , $("#ModCosto").val());
    });

    $("#btnGuardarModTarifaTerrestre").click(function () {
        modTarifaTerrestre($("#ModTerrestreDepartamentoOrigen").val()
                        , $("#ModTerrestreMunicipioOrigen").val()
                        , $("#ModTerrestreDepartamentoDestino").val()
                        , $("#ModTerrestreMunicipioDestino").val()
                        , $("#ModTerrestrePrimerDia").val()
                        , $("#ModTerrestreSegundoDia").val()
                        , $("#ModTerrestreTransporte").val());
    });

    $("#btnGuardarModHotelAsumido").click(function () {
        if (Boolean(mod)) {
            modHotelAsumido($("#ModTipoViaje").val()
                                    , $("#ModValorViaje").val());
        } else {
            agregarNuevoHotelAsumido($("#ModTipoViaje").val()
                                    , $("#ModValorViaje").val());
        }
    });

    $("#btnGuardarModUsuario").click(function () {
        if (Boolean(mod)) {
            modUsuario($("#Login").val()
                       , $("#Cedula").val()
                       , $("#Nombre").val()
                       , $("#Celular").val()
                       , $("#AviancaPlus").val()
                       , $("#OnePass").val()
                       , $("#Gerencia").val()
                       , $("#Cargo").val()
                       , $("#Email").val()
                       , $("#FechaNacimiento").val()
                       , $("#Activo").val());
        } else {
            agregarNuevoUsuario($("#Login").val()
                    , $("#Cedula").val()
                    , $("#Nombre").val()
                    , $("#Celular").val()
                    , $("#AviancaPlus").val()
                    , $("#OnePass").val()
                    , $("#Gerencia").val()
                    , $("#Cargo").val()
                    , $("#Email").val()
                    , $("#FechaNacimiento").val().toString().replace("T", " ")
                    , $("#Activo").val());
        }
    });

    $("#btnGuardarModCentroCosto").click(function () {
        if (Boolean(mod)) {
            modCentroCosto($("#IdCentroCosto").val()
                    , $("#IdTipoCentroCosto").val()
                    , $("#CodigoCentroCosto").val()
                    , $("#Descripcion").val());
        } else {
            agregarNuevoCentroCosto($("#IdTipoCentroCosto").val()
                    , $("#CodigoCentroCosto").val()
                    , $("#Descripcion").val());
        }
    });
})

function Home() {
    $("#panelRigth").empty();
    var CurrentForm = "<div class=\"panel panel-default\" id=\"panelDataBase\">"
                      + "<div class=\"panel-body\">"
                      + "<h3 style=\"text-align: center; margin-top: 0px\"><strong>Home!</strong></h3>"
                      + "<br/>"
                      + "<img src=\"../imagenes/Banner2.png\" style=\"margin-left: 31%\" />"
                      + "<br/>"
                      + "<br/>"
                      + "<div/>"
                      + "<div/>";

    $("#panelRigth").append(CurrentForm);
};


function AdmintrarDB() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 800, "action": "Consult" },
        dataType: "json",
        async: true,
        success: function (result) {
            $("#panelRigth").empty();
            $("#panelRigth").append(result);
            getDataSecretariasGerencia();

            $("#btnGuardarConfDB").click(function () {
                SaveSettingDB();
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function SaveSettingDB() {

    if ($("#DataBaseServer").val() == "" | $("#NameDataBase").val() == "" | $("#UserBaseDatosData").val() == "" | $("#PasswordUserDataBase").val() == "") {
        $("#alertamensaje").html("Los siguientes campos no se permiten vacios: <b>Login</b>, <b>Cedula</b>, <b>Nombre</b>, <b>Gerencia</b>, <b>Cargo</b> ,<b>Email</b>");
        $("#modalAlerta").modal('toggle');
        return;
    }

    var NameServer = $("#DataBaseServer").val();
    var PortServer = $("#PortDataBase").val();
    var NameDataBase = $("#DataBaseName").val();
    var UserDataBase = $("#UserBaseDatosData").val();
    var PasswordUserDB = $("#PasswordUserDataBase").val();
    var DatabaseEngine = $("#MotorDb").val();

    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 800, "action": "Save", "NameServer": NameServer, "PortServer": PortServer, "NameDataBase": NameDataBase, "UserDataBase": UserDataBase, "PasswordUserDB": PasswordUserDB, "DatabaseEngine": DatabaseEngine },
        dataType: "json",
        async: true,
        success: function (result) {
            $("#alertamensaje").html("Se han guardado los cambios correctamente");
            $("#modalAlerta").modal('toggle');   
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function CorregirColoresB() {
    colorFondoPanelHeadingA = "#216692";
    colorTextoPanelHeadingA = "#ffffff";
    colorFondoBodyPanelA = "#474747";
    estilo1 = "background-color:" + colorFondoPanelHeadingA + ";\n"
    + "color:" + colorTextoPanelHeadingA;
    $(".panel-heading").attr("style", estilo1);
}

function poseePermiso() {
    storage = $.sessionStorage;
    loginUsuario = storage.get("loginusuario");
    if (!loginUsuario) {
        window.location.href = "login.aspx"
    }
}

function AdminUsuarios() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 300, "action": "menu" },
        dataType: "json",
        async: true,
        success: function (result) {
            $("#panelRigth").empty();
            $("#panelRigth").append(result);
            var date = new Date();
            var anio = date.getFullYear();
            var dia = date.getDate();
            dia = dia.toString().length > 1 ? dia : "0" + dia;
            var mes = date.getMonth() + 1;
            mes = mes.toString().length > 1 ? mes : "0" + mes;

            $("#btnGuardarNuevoUsuario").click(function () {
                $("#Login").val("").removeAttr('disabled');;
                $("#Cedula").val("");
                $("#Nombre").val("");
                $("#Celular").val("");
                $("#AviancaPlus").val(0);
                $("#OnePass").val(0);
                $("#Gerencia").val("");
                $("#Cargo").val("");
                $("#Email").val("");
                $("#FechaNacimiento").val(anio + "-" + mes + "-" + dia + "T00:00");
                $("#Activo").val(1);

                mod = false;
                $("#modalAdminUser").modal('toggle');
            });
            setGerenciasAdminUsuarios();
            setCargosAdminUsuarios();
            getDataUsuarios();
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function AdminCentrosCostos() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 910, "action": "menu" },
        dataType: "json",
        async: true,
        success: function (result) {
            $("#panelRigth").empty();
            $("#panelRigth").append(result);
            $("#btnGuardarNuevoCentroCosto").click(function () {
                $("#IdCentroCosto").val("");
                $("#IdTipoCentroCosto").val("");
                $("#CodigoCentroCosto").val("");
                $("#Descripcion").val("");
                mod = false;
                $("#modalCentrosCostos").modal('toggle');
            });
            getDataCentroCosto();
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function setGerenciasAdminUsuarios() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 300, "action": "gerencia" },
        dataType: "json",
        async: true,
        success: function (result) {
            var toAppend = '';
            $.each(result, function (i, o) {
                toAppend += '<option>' + o.Gerencia + '</option>';
            });

            $('#Gerencia option').remove();
            $('#Gerencia').append(toAppend);
            toAppend = '';
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function setCargosAdminUsuarios() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 300, "action": "cargo" },
        dataType: "json",
        async: true,
        success: function (result) {
            var toAppend = '';
            $.each(result, function (i, o) {
                toAppend += '<option>' + o.Cargo + '</option>';
            });

            $('#Cargo option').remove();
            $('#Cargo').append(toAppend);
            toAppend = '';
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function AdminSecretarias() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 400, "action": "menu" },
        dataType: "json",
        async: true,
        success: function (result) {
            $("#panelRigth").empty();
            $("#panelRigth").append(result);
            getDataSecretariasGerencia();

            $("#btnGuardarNuevaSecretaria").click(function () {
                agregarNuevaSecretaria($("#secretaria").val()
                                     , $("#gerencias").val());
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function AdminColaboradores() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 500, "action": "menu" },
        dataType: "json",
        async: true,
        success: function (result) {
            $("#panelRigth").empty();
            $("#panelRigth").append(result);
            getDataColaboradores();

            $("#btnGuardarNuevoColaborador").click(function () {
                agregarNuevoColaboradAutorizador($("#colaborador").val()
                                               , $("#autorizador").val());
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataSecretariasGerencia() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 400, "action": "datos" },
        dataType: "json",
        async: true,
        success: function (results) {
            var arrColumnsSecre = [];

            arrColumnsSecre.push({ "data": "Secretaria", "sTitle": "Secretaria", "orderable": true, "sType": "string" });
            arrColumnsSecre.push({ "data": "Gerencia", "sTitle": "Gerencia", "orderable": true, "sType": "string" });

            var tbl = $("#tblsecretariasgerencia").DataTable({
                data: results,
                "columns": arrColumnsSecre,
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
                },
                "fnDrawCallback": function (oSettings) {
                    $("#tblsecretariasgerencia tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            var celltext = ui.target.text();
                            var colvindex = ui.target.parent().children().index(ui.target);
                            var colindex = $('#tblsecretariasgerencia thead tr th:eq(' + colvindex + ')').data('column-index');
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el registro: " + tbl.row('.selected').data()['Secretaria'] + "?") == true) {

                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 400
                                                , "action": "borrar"
                                                , "secretaria": tbl.row('.selected').data()['Secretaria']
                                                , "gerencia": tbl.row('.selected').data()['Gerencia']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                $("#alertamensaje").html("El registro se ha eliminado satisfactoriamente.");
                                                $("#modalAlerta").modal('toggle');
                                            },
                                            error: function (result) {
                                                $("#alertamensaje").html("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                                $("#modalAlerta").modal('toggle');
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":
                                    $("#ModSecretaria option").remove();
                                    $("#ModGerencia option").remove();

                                    $("#ModSecretaria").append($('<option>', {
                                        value: tbl.row('.selected').data()['Secretaria'],
                                        text: tbl.row('.selected').data()['Secretaria']
                                    }));

                                    $("#ModGerencia").append($("#gerencias > option").clone());

                                    $("#ModSecretaria").val(tbl.row('.selected').data()['Secretaria']);
                                    $("#ModGerencia").val(tbl.row('.selected').data()['Gerencia']);

                                    $("#modalModSecretariasGerencia").modal('toggle');

                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    });
                }
            });
            $('#tblsecretariasgerencia tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });

            $('#tblsecretariasgerencia tbody tr:first').addClass('selected');
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataColaboradores() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 500, "action": "datos" },
        dataType: "json",
        async: true,
        success: function (results) {
            var arrColumnsSecre = [];

            arrColumnsSecre.push({ "data": "NombreColaborador", "sTitle": "Colaborador", "orderable": true, "sType": "string" });
            arrColumnsSecre.push({ "data": "NombreSupervisor", "sTitle": "Supervisor", "orderable": true, "sType": "string" });
            arrColumnsSecre.push({ "data": "NombreAutorizador", "sTitle": "Autorizador", "orderable": true, "sType": "string" });

            var tbl = $("#tblcolaboradorautorizador").DataTable({
                data: results,
                "columns": arrColumnsSecre,
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
                },
                "fnDrawCallback": function (oSettings) {
                    $("#tblcolaboradorautorizador tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            var celltext = ui.target.text();
                            var colvindex = ui.target.parent().children().index(ui.target);
                            var colindex = $('#tblcolaboradorautorizador thead tr th:eq(' + colvindex + ')').data('column-index');
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el registro: " + tbl.row('.selected').data()['NombreColaborador'] + "?") == true) {

                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 500
                                                , "action": "borrar"
                                                , "colaborador": tbl.row('.selected').data()['NombreColaborador']
                                                , "supervisor": tbl.row('.selected').data()['NombreSupervisor']
                                                , "autorizador": tbl.row('.selected').data()['NombreAutorizador']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                alert("El registro se ha eliminado satisfactoriamente");
                                            },
                                            error: function (result) {
                                                alert("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":
                                    $("#ModColaborador option").remove();
                                    $("#ModSupervisor option").remove();
                                    $("#ModAutorizador option").remove();

                                    $("#ModColaborador").append($('<option>', {
                                        value: tbl.row('.selected').data()['NombreColaborador'],
                                        text: tbl.row('.selected').data()['NombreColaborador']
                                    }));
                                    $("#ModSupervisor").append($("#supervisor > option").clone());
                                    $("#ModAutorizador").append($("#autorizador > option").clone());


                                    $("#ModSupervisor").val(tbl.row('.selected').data()['NombreSupervisor']);
                                    $("#ModAutorizador").val(tbl.row('.selected').data()['NombreAutorizador']);


                                    $("#modalModColaboradoresAutorizadores").modal('toggle');
                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    });
                }
            });

            $('#tblcolaboradorautorizador tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });

            $('#tblcolaboradorautorizador tbody tr:first').addClass('selected');

        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataUsuarios() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 300, "action": "datos" },
        dataType: "json",
        async: true,
        success: function (result) {
            var arrColumns = [];

            arrColumns.push({ "data": "Login", "sTitle": "Login", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Cedula", "sTitle": "Cedula", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Nombre", "sTitle": "Nombre", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Celular", "sTitle": "Celular", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "AviancaPlus", "sTitle": "AviancaPlus", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "OnePass", "sTitle": "OnePass", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Gerencia", "sTitle": "Gerencia", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Cargo", "sTitle": "Cargo", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Email", "sTitle": "Email", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "FechaNacimiento", "sTitle": "Fecha Nacimiento", "orderable": true, "sType": "date" });
            arrColumns.push({ "data": "ACTIVO", "sTitle": "Activo", "orderable": true, "sType": "string" });

            var tbl = $("#tblusuarios").DataTable({
                data: result,
                "columns": arrColumns,
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
                },
                "fnDrawCallback": function (oSettings) {
                    $("#tblusuarios tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            var celltext = ui.target.text();
                            var colvindex = ui.target.parent().children().index(ui.target);
                            var colindex = $('#tblusuarios thead tr th:eq(' + colvindex + ')').data('column-index');
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el registro: " + tbl.row('.selected').data()['Login'] + "?") == true) {

                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 300
                                                , "action": "borrar"
                                                , "login": tbl.row('.selected').data()['Login']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                alert("El registro se ha eliminado satisfactoriamente");
                                            },
                                            error: function (result) {
                                                alert("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":
                                    $("#Login").val(tbl.row('.selected').data()['Login']).attr('disabled', 'disabled');
                                    $("#Cedula").val(tbl.row('.selected').data()['Cedula']);
                                    $("#Nombre").val(tbl.row('.selected').data()['Nombre']);
                                    $("#Celular").val(tbl.row('.selected').data()['Celular']);
                                    $("#AviancaPlus").val(tbl.row('.selected').data()['AviancaPlus']);
                                    $("#OnePass").val(tbl.row('.selected').data()['OnePass']);
                                    $("#Gerencia").val(tbl.row('.selected').data()['Gerencia']);
                                    $("#Cargo").val(tbl.row('.selected').data()['Cargo']);
                                    $("#Email").val(tbl.row('.selected').data()['Email']);
                                    $("#FechaNacimiento").val(tbl.row('.selected').data()['FechaNacimiento']);
                                    $("#Activo").val(tbl.row('.selected').data()['ACTIVO']);

                                    $("#modalAdminUser").modal('toggle');
                                    break;
                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    });
                }
            });

            $('#tblusuarios tbody tr:first').addClass('selected');

            $('#tblusuarios tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataCentroCosto() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 910, "action": "datos" },
        dataType: "json",
        async: true,
        success: function (result) {

            if ($.fn.DataTable.isDataTable('#tblCentroCosto')) {
                $('#tblCentroCosto').DataTable().destroy();
                $('#tblCentroCosto').empty();
            };

            var arrColumns = [];

            arrColumns.push({ "data": "Id", "sTitle": "Id", "orderable": true, "visible": false, "sType": "string" });
            arrColumns.push({ "data": "IdTipoCentroDeCosto", "sTitle": "Tipo Centro de Costo", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "codigoCentroDeCosto", "sTitle": "Código Centro de Costo", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Descripcion", "sTitle": "Descripción", "orderable": true, "sType": "string" });

            var tbl = $("#tblCentroCosto").DataTable({
                data: result,
                "columns": arrColumns,
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
                },
                "fnDrawCallback": function (oSettings) {
                    $("#tblCentroCosto tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            var celltext = ui.target.text();
                            var colvindex = ui.target.parent().children().index(ui.target);
                            var colindex = $('#tblCentroCosto thead tr th:eq(' + colvindex + ')').data('column-index');
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el Código de Centro de Costo: " + tbl.row('.selected').data()['codigoCentroDeCosto'] + "?") == true) {
                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 910
                                                , "action": "borrar"
                                                , "IdCentroCosto": tbl.row('.selected').data()['Id']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                alert("El registro se ha eliminado satisfactoriamente!");
                                            },
                                            error: function (result) {
                                                alert("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":
                                    $("#IdCentroCosto").val(tbl.row('.selected').data()['Id']).attr('disabled', 'disabled');
                                    $("#IdTipoCentroCosto").val(tbl.row('.selected').data()['IdTipoCentroDeCosto']);
                                    $("#CodigoCentroCosto").val(tbl.row('.selected').data()['codigoCentroDeCosto']);
                                    $("#Descripcion").val(tbl.row('.selected').data()['Descripcion']);

                                    $("#modalCentrosCostos").modal('toggle');
                                    break;
                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    });
                }
            });

            $('#tblCentroCosto tbody tr:first').addClass('selected');

            $('#tblCentroCosto tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function modColaboradorAutorizador(colaborador, autorizador) {
    var tbl = $("#tblcolaboradorautorizador").DataTable();

    if (colaborador == tbl.row('.selected').data()['NombreColaborador'] & autorizador == tbl.row('.selected').data()['NombreAutorizador']) {
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista. </br> Por favor sirvase cambiar el supervisor o autorizador.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 500
                , "action": "modificar"
                , "colaborador": colaborador
                , "supervisor": ''
                , "autorizador": autorizador
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({ NombreColaborador: colaborador, NombreSupervisor: null, NombreAutorizador: autorizador });
                    tbl.draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function modSecretariasGerencia(secretaria, gerencia) {
    var tbl = $("#tblsecretariasgerencia").DataTable();

    if (secretaria == tbl.row('.selected').data()['Secretaria'] & gerencia == tbl.row('.selected').data()['Gerencia']) {
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista. </br> Por favor sirvase cambiar el supervisor o autorizador.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 400
                , "action": "modificar"
                , "secretaria": secretaria
                , "gerencia": gerencia
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({ Secretaria: secretaria, Gerencia: gerencia }).draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function modUsuario(login, cedula, nombre, celular, aviancaplus, onepass, gerencia, cargo, email, fechanacimiento, activo) {
    var tbl = $("#tblusuarios").DataTable();

    if (login == tbl.row('.selected').data()['Login']
        & cedula == tbl.row('.selected').data()['Cedula']
        & nombre == tbl.row('.selected').data()['Nombre']
        & celular == tbl.row('.selected').data()['Celular']
        & aviancaplus == tbl.row('.selected').data()['AviancaPlus']
        & onepass == tbl.row('.selected').data()['OnePass']
        & gerencia == tbl.row('.selected').data()['Gerencia']
        & cargo == tbl.row('.selected').data()['Cargo']
        & email == tbl.row('.selected').data()['Email']
        & fechanacimiento == tbl.row('.selected').data()['FechaNacimiento']
        & activo == tbl.row('.selected').data()['ACTIVO']
        ) {
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 300
                , "action": "modificar"
                , "login": login
                , "cedula": cedula
                , "nombre": nombre
                , "celular": celular
                , "aviancaplus": aviancaplus
                , "onepass": onepass
                , "gerencia": gerencia
                , "cargo": cargo
                , "email": email
                , "fechanacimiento": fechanacimiento
                , "activo": activo
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({
                        Login: login
                        , Cedula: cedula
                        , Nombre: nombre
                        , Celular: celular
                        , AviancaPlus: aviancaplus
                        , OnePass: onepass
                        , Gerencia: gerencia
                        , Cargo: cargo
                        , Email: email
                        , FechaNacimiento: fechanacimiento
                        , ACTIVO: activo
                    }).draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function modCentroCosto(IdCentroCosto, IdTipoCentroCosto, CodigoCentroCosto, Descripcion) {
    var tbl = $("#tblCentroCosto").DataTable();

    if (IdCentroCosto == tbl.row('.selected').data()['Id']
        & IdTipoCentroCosto == tbl.row('.selected').data()['IdTipoCentroDeCosto']
        & CodigoCentroCosto == tbl.row('.selected').data()['codigoCentroDeCosto']
        & Descripcion == tbl.row('.selected').data()['Descripcion']){
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 910
                , "action": "modificar"
                , "IdCentroCosto": IdCentroCosto
                , "IdTipoCentroCosto": IdTipoCentroCosto
                , "CodigoCentroCosto": CodigoCentroCosto
                , "Descripcion": Descripcion
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({
                        Id: IdCentroCosto
                        , IdTipoCentroDeCosto: IdTipoCentroCosto
                        , codigoCentroDeCosto: CodigoCentroCosto
                        , Descripcion: Descripcion
                    }).draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function agregarNuevoCentroCosto(IdTipoCentroCosto, CodigoCentroCosto, Descripcion) {
    var tbl = $("#tblCentroCosto").DataTable();

    if (IdTipoCentroCosto == "" | CodigoCentroCosto == "" | Descripcion == "") {
        $("#alertamensaje").html("Los siguientes campos no se permiten vacios: <b>Id Tipo Centro de Costo</b>, <b>Código Centro de Costo</b>, <b>Descripcion</b>");
        $("#modalAlerta").modal('toggle');
    } else {
        if ($('#tblCentroCosto tr > td:contains(' + CodigoCentroCosto + ')').length > 0) {
            $("#alertamensaje").html("El código de centro de costo: <b>" + CodigoCentroCosto + "</b>  que intenta registrar ya se encuentra en la lista.");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 910
                    , "action": "agregar"
                    , "IdTipoCentroCosto": IdTipoCentroCosto
                    , "CodigoCentroCosto": CodigoCentroCosto
                    , "Descripcion": Descripcion
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        getDataCentroCosto();

                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function agregarNuevoUsuario(login, cedula, nombre, celular, aviancaplus, onepass, gerencia, cargo, email, fechanacimiento, activo) {
    var tbl = $("#tblusuarios").DataTable();

    if (login == "" | cedula == "" | nombre == "" | gerencia == "" | cargo == "" | email == "") {
        $("#alertamensaje").html("Los siguientes campos no se permiten vacios: <b>Login</b>, <b>Cedula</b>, <b>Nombre</b>, <b>Gerencia</b>, <b>Cargo</b> ,<b>Email</b>");
        $("#modalAlerta").modal('toggle');
    } else {
        if ($('#tblusuarios tr > td:contains(' + login + ')').length > 0) {
            $("#alertamensaje").html("El login de usuario: <b>" + login + "</b>  que intenta registrar ya se encuentra en la lista.");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 300
                    , "action": "agregar"
                    , "login": login
                    , "cedula": cedula
                    , "nombre": nombre
                    , "celular": celular
                    , "aviancaplus": aviancaplus
                    , "onepass": onepass
                    , "gerencia": gerencia
                    , "cargo": cargo
                    , "email": email
                    , "fechanacimiento": fechanacimiento
                    , "activo": activo
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        tbl.row.add({
                            Login: login
                            , Cedula: cedula
                            , Nombre: nombre
                            , Celular: celular
                            , AviancaPlus: aviancaplus
                            , OnePass: onepass
                            , Gerencia: gerencia
                            , Cargo: cargo
                            , Email: email
                            , FechaNacimiento: fechanacimiento
                            , ACTIVO: activo
                        }).draw();

                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function agregarNuevoColaboradAutorizador(colaborador, autorizadorr) {
    var tbl = $("#tblcolaboradorautorizador").DataTable();

    if ($('#tblcolaboradorautorizador tr > td:contains(' + colaborador + ') + td:contains(\'\') + td:contains(' + autorizadorr + ')').length > 0) {
        $("#alertamensaje").html("El item que intenta registrar, ya se encuentra en la lista. </br> Por favor sirvase cambiar alguno de los parametros.");
        $("#modalAlerta").modal('toggle');
    } else {
        if ($('#tblcolaboradorautorizador tr > td:contains(' + colaborador + ')').length > 0) {
            $("#alertamensaje").html("<b>" + colaborador + "</b> , ya se encuentra en la lista. </br></br> Si desea modificarlo, dirijase a la caja buscar, y digite el nombre a modificar, </br> luego posicionese en el registro y de click derecho </br> para posteriormente seleccionar del menu desplegable: <b>Modificar</b>");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 500
                    , "action": "agregar"
                    , "colaborador": colaborador
                    , "supervisor": ''
                    , "autorizador": autorizadorr
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        /*tbl
                             .row('.selected').data()['NombreSupervisor'].val(' ')
                             .row('.selected').data()['NombreAutorizador'].val(autorizador)
                             .draw();*/
                        tbl.row.add({ NombreColaborador: colaborador, NombreSupervisor: null, NombreAutorizador: autorizadorr }).draw();



                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function agregarNuevaSecretaria(secretaria, gerencia) {
    var tbl = $("#tblsecretariasgerencia").DataTable();

    if ($('#tblsecretariasgerencia tr > td:contains(' + secretaria + ') + td:contains(' + gerencia + ')').length > 0) {
        $("#alertamensaje").html("El item que intenta registrar, ya se encuentra en la lista. </br> Por favor sirvase cambiar alguno de los parametros.");
        $("#modalAlerta").modal('toggle');
    } else {
        if ($('#tblsecretariasgerencia tr > td:contains(' + secretaria + ')').length > 0) {
            $("#alertamensaje").html("<b>" + secretaria + "</b> , ya se encuentra en la lista. </br></br> Si desea modificarlo, dirijase a la caja buscar, y digite el nombre a modificar, </br> luego posicionese en el registro y de click derecho </br> para posteriormente seleccionar del menu desplegable: <b>Modificar</b>");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 400
                    , "action": "agregar"
                    , "secretaria": secretaria
                    , "gerencia": gerencia
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        tbl.row.add({ Secretaria: secretaria, Gerencia: gerencia }).draw();

                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function AdminAlimentacionTerrestre() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "menu", "subaction": "alimentacionterrestre" },
        dataType: "json",
        async: true,
        success: function (result) {
            selectOptionMenu($("#adminalimentacionterrestre").text());
            $("#panelRigth").empty();
            $("#panelRigth").append(result);

            $("#btnGuardarNuevaalimentacionterrestre").click(function () {
                $("#ModAlimentaciondia").val("").removeAttr('disabled');
                $("#ModAlimentaciondiaValor").val(0);

                mod = false;
                $("#modalModAlimentacionTerrestre").modal('toggle');
            });

            getDataAlimentacionTerrestre();
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataAlimentacionTerrestre() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "datos", "subaction": "alimentacionterrestre" },
        dataType: "json",
        async: true,
        success: function (result) {
            var arrColumns = [];

            arrColumns.push({ "data": "Descripcion", "sTitle": "Alimento dia", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Tarifa", "sTitle": "Tarifa", "orderable": true, "sType": "string" });

            var tbl = $("#tblalimentacionterrestre").DataTable({
                data: result,
                "columns": arrColumns,
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

                },
                "fnDrawCallback": function (oSettings) {
                    $("#tblalimentacionterrestre tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            var celltext = ui.target.text();
                            var colvindex = ui.target.parent().children().index(ui.target);
                            var colindex = $('#tblalimentacionterrestre thead tr th:eq(' + colvindex + ')').data('column-index');
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el registro: " + tbl.row('.selected').data()['Descripcion'] + "?") == true) {

                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 600
                                                , "action": "eliminar"
                                                , "subaction": "alimentacionterrestre"
                                                , "alimentaciondia": tbl.row('.selected').data()['Descripcion']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                alert("El registro se ha eliminado satisfactoriamente");
                                            },
                                            error: function (result) {
                                                alert("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":
                                    mod = true;
                                    $("#ModAlimentaciondia").val(tbl.row('.selected').data()['Descripcion']).attr('disabled', 'disabled');
                                    $("#ModAlimentaciondiaValor").val(tbl.row('.selected').data()['Tarifa']);

                                    $("#modalModAlimentacionTerrestre").modal('toggle');

                                    break;
                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    })
                }
            });

            $('#tblalimentacionterrestre tbody tr:first').addClass('selected');

            $('#tblalimentacionterrestre tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function modAlimentacionTerrestre(alimentaciondia, valor) {
    var tbl = $("#tblalimentacionterrestre").DataTable();

    if (alimentaciondia == tbl.row('.selected').data()['Descripcion'] & valor == tbl.row('.selected').data()['Tarifa']) {
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista. </br> Por favor sirvase cambiar el supervisor o autorizador.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 600
                , "action": "modificar"
                , "subaction": "alimentacionterrestre"
                , "alimentaciondia": alimentaciondia
                , "valortarifa": valor
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({ Descripcion: alimentaciondia, Tarifa: valor }).draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function agregarNuevoAlimentacionTerrestre(alimentaciondia, valor) {
    var tbl = $("#tblalimentacionterrestre").DataTable();

    if (alimentaciondia.length == 0) {
        $("#alertamensaje").html("No se permite valores vacios. Por favor sirvase cambiar alguno de los parametros.");
        $("#modalAlerta").modal('toggle');
    } else {
        if ($('#tblalimentacionterrestre tr > td:contains(' + alimentaciondia + ')').length > 0) {
            $("#alertamensaje").html("<b>" + alimentaciondia + "</b> , ya se encuentra en la lista. </br></br> Si desea modificarlo, dirijase a la caja buscar, y digite el nombre a modificar, luego posicionese en el registro y de click derecho para posteriormente seleccionar del menu desplegable: <b>Modificar</b>");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 600
                    , "action": "agregar"
                    , "subaction": "alimentacionterrestre"
                    , "alimentaciondia": alimentaciondia
                    , "valortarifa": valor
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        tbl.row.add({ Descripcion: alimentaciondia, Tarifa: valor }).draw();

                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function AdminHotelAsumido() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "menu", "subaction": "hotelasumido" },
        dataType: "json",
        async: true,
        success: function (result) {
            selectOptionMenu($("#adminhotelasumido").text());
            $("#panelRigth").empty();
            $("#panelRigth").append(result);

            $("#btnGuardarNuevoHotelAsumido").click(function () {
                $("#ModTipoViaje").val("").removeAttr('disabled');
                $("#ModValorViaje").val(0);

                mod = false;
                $("#modalModHotelAsumido").modal('toggle');
            });

            getDataHotelAsumido();
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataHotelAsumido() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "datos", "subaction": "hotelasumido" },
        dataType: "json",
        async: true,
        success: function (result) {
            var arrColumns = [];

            arrColumns.push({ "data": "Tipo", "sTitle": "Tipo Viaje", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "TarifaHotelAsumido", "sTitle": "Tarifa", "orderable": true, "sType": "string" });

            var tbl = $("#tblhotelasumido").DataTable({
                data: result,
                "columns": arrColumns,
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

                },
                "fnDrawCallback": function (oSettings) {
                    $("#tblhotelasumido tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el registro: " + tbl.row('.selected').data()['Tipo'] + "?") == true) {

                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 600
                                                , "action": "eliminar"
                                                , "subaction": "hotelasumido"
                                                , "tipoviaje": tbl.row('.selected').data()['Tipo']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                alert("El registro se ha eliminado satisfactoriamente");
                                            },
                                            error: function (result) {
                                                alert("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":
                                    mod = true;
                                    $("#ModTipoViaje").val(tbl.row('.selected').data()['Tipo']).attr('disabled', 'disabled');
                                    $("#ModValorViaje").val(tbl.row('.selected').data()['TarifaHotelAsumido']);

                                    $("#modalModHotelAsumido").modal('toggle');

                                    break;
                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    })
                }
            });

            $('#tblhotelasumido tbody tr:first').addClass('selected');

            $('#tblhotelasumido tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function modHotelAsumido(tipoviaje, valorviaje) {
    var tbl = $("#tblhotelasumido").DataTable();

    if (tipoviaje == tbl.row('.selected').data()['Tipo'] & valorviaje == tbl.row('.selected').data()['TarifaHotelAsumido']) {
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista. </br> Por favor sirvase cambiar el supervisor o autorizador.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 600
                , "action": "modificar"
                , "subaction": "hotelasumido"
                , "tipoviaje": tipoviaje
                , "valorviaje": valorviaje
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({ Tipo: tipoviaje, TarifaHotelAsumido: valorviaje }).draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function agregarNuevoHotelAsumido(tipoviaje, valorviaje) {
    var tbl = $("#tblhotelasumido").DataTable();

    if (tipoviaje.length == 0) {
        $("#alertamensaje").html("No se permite valores vacios. Por favor sirvase cambiar alguno de los parametros.");
        $("#modalAlerta").modal('toggle');
    } else {
        if ($('#tblhotelasumido tr > td:contains(' + tipoviaje + ')').length > 0) {
            $("#alertamensaje").html("<b>" + tipoviaje + "</b> , ya se encuentra en la lista. </br></br> Si desea modificarlo, dirijase a la caja buscar, y digite el nombre a modificar, luego posicionese en el registro y de click derecho para posteriormente seleccionar del menu desplegable: <b>Modificar</b>");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 600
                    , "action": "agregar"
                    , "subaction": "hotelasumido"
                    , "tipoviaje": tipoviaje
                    , "valorviaje": valorviaje
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        tbl.row.add({ Tipo: tipoviaje, TarifaHotelAsumido: valorviaje }).draw();

                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function AdminTarifaPeaje() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "menu", "subaction": "peajes" },
        dataType: "json",
        async: true,
        success: function (result) {
            selectOptionMenu($("#admintarifapeaje").text());
            $("#panelRigth").empty();
            $("#panelRigth").append(result);

            $("#DepartamentoDestino").append($("#DepartamentoOrigen > option").clone());

            $("#btnGuardarNuevatarifaPeaje").click(function () {
                agregarNuevaTarifaPeaje($("#DepartamentoOrigen").val()
                                        , $("#MunicipioOrigen").val()
                                        , $("#DepartamentoDestino").val()
                                        , $("#MunicipioDestino").val()
                                        , $("#ValorTarifaPeaje").val());

            });

            $("#btnGuardarNuevoPeaje").click(function () {
                $("#ModTipoViaje").val("").removeAttr('disabled');
                $("#ModValorViaje").val(0);

                mod = false;
                $("#modalModHotelAsumido").modal('toggle');
            });

            $("#DepartamentoDestino").change(function () {
                $.ajax({
                    url: "../controladores/controladorCI.ashx",
                    method: "POST",
                    data: { "op": 700, "departamento": $("#DepartamentoDestino").val() },
                    dataType: "json",
                    async: true,
                    success: function (result) {
                        var toAppend = '';
                        $.each(result, function (i, o) {
                            toAppend += '<option>' + o.Municipio + '</option>';
                        });

                        $('#MunicipioDestino option').remove();
                        $('#MunicipioDestino').append(toAppend);
                        toAppend = '';

                    },
                    error: function (result) {
                        alert("failed");
                    }
                });
            });

            $("#DepartamentoOrigen").change(function () {
                $.ajax({
                    url: "../controladores/controladorCI.ashx",
                    method: "POST",
                    data: { "op": 700, "departamento": $("#DepartamentoOrigen").val() },
                    dataType: "json",
                    async: true,
                    success: function (result) {
                        var toAppend2 = '';
                        $.each(result, function (i, o) {
                            toAppend2 += '<option>' + o.Municipio + '</option>';
                        });

                        $('#MunicipioOrigen option').remove();
                        $('#MunicipioOrigen').append(toAppend2);
                        toAppend2 = '';

                    },
                    error: function (result) {
                        alert("failed");
                    }
                });
            });


            getDataTarifaPeaje();

        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataTarifaPeaje() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "datos", "subaction": "peajes" },
        dataType: "json",
        async: true,
        success: function (result) {
            var arrColumns = [];

            arrColumns.push({ "data": "DepartamentoOrigen", "sTitle": "Departamento Origen", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "MunicipioOrigen", "sTitle": "Municipio Origen", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "DepartamentoDestino", "sTitle": "Departamento Destino", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "MunicipioDestino", "sTitle": "Municipio Destino", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Costo", "sTitle": "Costo", "orderable": true, "sType": "string" });

            var tbl = $("#tbltarifapeaje").DataTable({
                data: result,
                "columns": arrColumns,
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

                },
                "fnDrawCallback": function (oSettings) {
                    $("#tbltarifapeaje tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el registro: "
                                        + tbl.row('.selected').data()['DepartamentoOrigen'] + ", "
                                        + tbl.row('.selected').data()['MunicipioOrigen'] + ", "
                                        + tbl.row('.selected').data()['DepartamentoDestino'] + ", "
                                        + tbl.row('.selected').data()['MunicipioDestino']
                                        + " ?") == true) {

                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 600
                                                , "action": "eliminar"
                                                , "subaction": "peajes"
                                                , "departamentoorigen": tbl.row('.selected').data()['DepartamentoOrigen']
                                                , "municipioorigen": tbl.row('.selected').data()['MunicipioOrigen']
                                                , "departamentodestino": tbl.row('.selected').data()['DepartamentoDestino']
                                                , "municipiodestino": tbl.row('.selected').data()['MunicipioDestino']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                alert("El registro se ha eliminado satisfactoriamente");
                                            },
                                            error: function (result) {
                                                alert("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":

                                    $("#ModDepartamentoOrigen option").remove();
                                    $('#ModMunicipioOrigen option').remove();
                                    $('#ModDepartamentoDestino option').remove();
                                    $('#ModMunicipioDestino option').remove();
                                    $('#ModDepartamentoOrigen').append($('<option>', {
                                        value: tbl.row('.selected').data()['DepartamentoOrigen'],
                                        text: tbl.row('.selected').data()['DepartamentoOrigen']
                                    }));
                                    $('#ModMunicipioOrigen').append($('<option>', {
                                        value: tbl.row('.selected').data()['MunicipioOrigen'],
                                        text: tbl.row('.selected').data()['MunicipioOrigen']
                                    }));
                                    $('#ModDepartamentoDestino').append($('<option>', {
                                        value: tbl.row('.selected').data()['DepartamentoDestino'],
                                        text: tbl.row('.selected').data()['DepartamentoDestino']
                                    }));
                                    $('#ModMunicipioDestino').append($('<option>', {
                                        value: tbl.row('.selected').data()['MunicipioDestino'],
                                        text: tbl.row('.selected').data()['MunicipioDestino']
                                    }));
                                    $("#ModDepartamentoOrigen").val(tbl.row('.selected').data()['DepartamentoOrigen']).attr('disabled', 'disabled');
                                    $("#ModMunicipioOrigen").val(tbl.row('.selected').data()['MunicipioOrigen']).attr('disabled', 'disabled');
                                    $("#ModDepartamentoDestino").val(tbl.row('.selected').data()['DepartamentoDestino']).attr('disabled', 'disabled');
                                    $("#ModMunicipioDestino").val(tbl.row('.selected').data()['MunicipioDestino']).attr('disabled', 'disabled');
                                    $("#ModCosto").val(tbl.row('.selected').data()['Costo']);

                                    $("#modalTarifaPeaje").modal('toggle');

                                    break;
                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    })
                }
            });

            $('#tbltarifapeaje tbody tr:first').addClass('selected');

            $('#tbltarifapeaje tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function modTarifaPeaje(departamentoorigen, municipioorigen, departamentodestino, municipiodestino, costo) {
    var tbl = $("#tbltarifapeaje").DataTable();

    if (departamentoorigen == tbl.row('.selected').data()['DepartamentoOrigen'] & municipioorigen == tbl.row('.selected').data()['MunicipioOrigen']
        , departamentodestino == tbl.row('.selected').data()['DepartamentoDestino'] & municipiodestino == tbl.row('.selected').data()['MunicipioDestino']
        , costo == tbl.row('.selected').data()['Costo']) {
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista. </br> Por favor sirvase cambiar el supervisor o autorizador.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 600
                , "action": "modificar"
                , "subaction": "peajes"
                , "departamentoorigen": departamentoorigen
                , "municipioorigen": municipioorigen
                , "departamentodestino": departamentodestino
                , "municipiodestino": municipiodestino
                , "costo": costo
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({ DepartamentoOrigen: departamentoorigen, MunicipioOrigen: municipioorigen, DepartamentoDestino: departamentodestino, MunicipioDestino: municipiodestino, Costo: costo }).draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function agregarNuevaTarifaPeaje(departamentoorigen, municipioorigen, departamentodestino, municipiodestino, costo) {
    var tbl = $("#tbltarifapeaje").DataTable();

    if (document.getElementById("DepartamentoDestino").selectedIndex == null | document.getElementById("DepartamentoOrigen").selectedIndex == null | document.getElementById("MunicipioOrigen").selectedIndex == null | document.getElementById("MunicipioDestino").selectedIndex == null | costo.length == 0) {
        $("#alertamensaje").html("No se permite valores vacios. Por favor sirvase cambiar alguno de los parametros.");
        $("#modalAlerta").modal('toggle');
    } else {
        if ($('#tbltarifapeaje tr > td:contains(' + departamentoorigen + ') + td:contains(' + municipioorigen + ') + td:contains(' + departamentodestino + ') + td:contains(' + municipiodestino + ')').length > 0) {
            $("#alertamensaje").html("<b>" + departamentoorigen + ", " + municipioorigen + ", " + departamentodestino + ", " + municipiodestino + "</b> , ya se encuentra en la lista. </br></br> Si desea modificarlo, dirijase a la caja buscar, y digite el nombre a modificar, luego posicionese en el registro y de click derecho para posteriormente seleccionar del menu desplegable: <b>Modificar</b>");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 600
                    , "action": "agregar"
                    , "subaction": "peajes"
                    , "departamentoorigen": departamentoorigen
                    , "municipioorigen": municipioorigen
                    , "departamentodestino": departamentodestino
                    , "municipiodestino": municipiodestino
                    , "costo": costo
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        tbl.row.add({ DepartamentoOrigen: departamentoorigen, MunicipioOrigen: municipioorigen, DepartamentoDestino: departamentodestino, MunicipioDestino: municipiodestino, Costo: costo }).draw();

                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function AdminTarifaTerrestre() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "menu", "subaction": "terrestre" },
        dataType: "json",
        async: true,
        success: function (result) {
            selectOptionMenu($("#admintarifaterrestre").text());
            $("#panelRigth").empty();
            $("#panelRigth").append(result);
            $("#DepartamentoDestino").append($("#DepartamentoOrigen > option").clone());
            $("#ModTerrestreTransporte").append($("#ValorTransporte > option").clone());

            $("#btnGuardarNuevatarifaTerrestre").click(function () {
                agregarNuevaTarifaTerrestre($("#DepartamentoOrigen").val()
                                            , $("#MunicipioOrigen").val()
                                            , $("#DepartamentoDestino").val()
                                            , $("#MunicipioDestino").val()
                                            , $("#ValorPrimerDia").val()
                                            , $("#ValorSegundoDia").val()
                                            , $("#ValorTransporte").val());
            });

            $("#DepartamentoDestino").change(function () {
                $.ajax({
                    url: "../controladores/controladorCI.ashx",
                    method: "POST",
                    data: { "op": 700, "departamento": $("#DepartamentoDestino").val() },
                    dataType: "json",
                    async: true,
                    success: function (result) {
                        var toAppend = '';
                        $.each(result, function (i, o) {
                            toAppend += '<option>' + o.Municipio + '</option>';
                        });

                        $('#MunicipioDestino option').remove();
                        $('#MunicipioDestino').append(toAppend);
                        toAppend = '';
                    },
                    error: function (result) {
                        alert("failed");
                    }
                });
            });

            $("#DepartamentoOrigen").change(function () {
                $.ajax({
                    url: "../controladores/controladorCI.ashx",
                    method: "POST",
                    data: { "op": 700, "departamento": $("#DepartamentoOrigen").val() },
                    dataType: "json",
                    async: true,
                    success: function (result) {
                        var toAppend2 = '';
                        $.each(result, function (i, o) {
                            toAppend2 += '<option>' + o.Municipio + '</option>';
                        });
                        $('#MunicipioOrigen option').remove();
                        $('#MunicipioOrigen').append(toAppend2);
                        toAppend2 = '';
                    },
                    error: function (result) {
                        alert("failed");
                    }
                });
            });

            getDataTarifaTerrestre();
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataTarifaTerrestre() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "datos", "subaction": "terrestre" },
        dataType: "json",
        async: true,
        success: function (result) {
            var arrColumns = [];

            arrColumns.push({ "data": "DepartamentoOrigen", "sTitle": "Departamento Origen", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "MunicipioOrigen", "sTitle": "Municipio Origen", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "DepartamentoDestino", "sTitle": "Departamento Destino", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "MunicipioDestino", "sTitle": "Municipio Destino", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "PrimerDia", "sTitle": "Primer Dia", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "SegundoDia", "sTitle": "Segundo Dia", "orderable": true, "sType": "string" });
            arrColumns.push({ "data": "Transporte", "sTitle": "Transporte", "orderable": true, "sType": "string" });

            var tbl = $("#tbltarifaterrestre").DataTable({
                data: result,
                "columns": arrColumns,
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

                },
                "fnDrawCallback": function (oSettings) {
                    $("#tbltarifaterrestre tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el registro: "
                                        + tbl.row('.selected').data()['DepartamentoOrigen'] + ", "
                                        + tbl.row('.selected').data()['MunicipioOrigen'] + ", "
                                        + tbl.row('.selected').data()['DepartamentoDestino'] + ", "
                                        + tbl.row('.selected').data()['MunicipioDestino']
                                        + " ?") == true) {

                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 600
                                                , "action": "eliminar"
                                                , "subaction": "terrestre"
                                                , "departamentoorigen": tbl.row('.selected').data()['DepartamentoOrigen']
                                                , "municipioorigen": tbl.row('.selected').data()['MunicipioOrigen']
                                                , "departamentodestino": tbl.row('.selected').data()['DepartamentoDestino']
                                                , "municipiodestino": tbl.row('.selected').data()['MunicipioDestino']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                alert("El registro se ha eliminado satisfactoriamente");
                                            },
                                            error: function (result) {
                                                alert("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":

                                    $("#ModTerrestreDepartamentoOrigen option").remove();
                                    $('#ModTerrestreMunicipioOrigen option').remove();
                                    $('#ModTerrestreDepartamentoDestino option').remove();
                                    $('#ModTerrestreMunicipioDestino option').remove();
                                    $('#ModTerrestreTransporte option').remove();


                                    $('#ModTerrestreDepartamentoOrigen').append($('<option>', {
                                        value: tbl.row('.selected').data()['DepartamentoOrigen'],
                                        text: tbl.row('.selected').data()['DepartamentoOrigen']
                                    }));
                                    $('#ModTerrestreMunicipioOrigen').append($('<option>', {
                                        value: tbl.row('.selected').data()['MunicipioOrigen'],
                                        text: tbl.row('.selected').data()['MunicipioOrigen']
                                    }));
                                    $('#ModTerrestreDepartamentoDestino').append($('<option>', {
                                        value: tbl.row('.selected').data()['DepartamentoDestino'],
                                        text: tbl.row('.selected').data()['DepartamentoDestino']
                                    }));
                                    $('#ModTerrestreMunicipioDestino').append($('<option>', {
                                        value: tbl.row('.selected').data()['MunicipioDestino'],
                                        text: tbl.row('.selected').data()['MunicipioDestino']
                                    }));
                                    $('#ModTerrestreTransporte').append($('<option>', {
                                        value: tbl.row('.selected').data()['Transporte'],
                                        text: tbl.row('.selected').data()['Transporte']
                                    }));

                                    $("#ModTerrestreDepartamentoOrigen").val(tbl.row('.selected').data()['DepartamentoOrigen']).attr('disabled', 'disabled');
                                    $("#ModTerrestreMunicipioOrigen").val(tbl.row('.selected').data()['MunicipioOrigen']).attr('disabled', 'disabled');
                                    $("#ModDepartamentoDestino").val(tbl.row('.selected').data()['DepartamentoDestino']).attr('disabled', 'disabled');
                                    $("#ModTerrestreMunicipioDestino").val(tbl.row('.selected').data()['MunicipioDestino']).attr('disabled', 'disabled');
                                    $("#ModTerrestrePrimerDia").val(tbl.row('.selected').data()['PrimerDia']);
                                    $("#ModTerrestreSegundoDia").val(tbl.row('.selected').data()['SegundoDia']);
                                    $("#ModTerrestreTransporte").val(tbl.row('.selected').data()['Transporte']).attr('disabled', 'disabled');;
                                    $("#modalTarifaTerrestre").modal('toggle');

                                    break;
                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    })
                }
            });

            $('#tbltarifaterrestre tbody tr:first').addClass('selected');

            $('#tbltarifaterrestre tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function modTarifaTerrestre(departamentoorigen, municipioorigen, departamentodestino, municipiodestino, primerdia, segundodia, transporte) {
    var tbl = $("#tbltarifaterrestre").DataTable();

    if (departamentoorigen == tbl.row('.selected').data()['DepartamentoOrigen'] & municipioorigen == tbl.row('.selected').data()['MunicipioOrigen']
        , departamentodestino == tbl.row('.selected').data()['DepartamentoDestino'] & municipiodestino == tbl.row('.selected').data()['MunicipioDestino']
        , primerdia == tbl.row('.selected').data()['PrimerDia'] & segundodia == tbl.row('.selected').data()['SegundoDia']) {
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista. </br> Por favor sirvase cambiar el supervisor o autorizador.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 600
                , "action": "modificar"
                , "subaction": "terrestre"
                , "departamentoorigen": departamentoorigen
                , "municipioorigen": municipioorigen
                , "departamentodestino": departamentodestino
                , "municipiodestino": municipiodestino
                , "primerdia": primerdia
                , "segundodia": segundodia
                , "transporte": transporte
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({ DepartamentoOrigen: departamentoorigen, MunicipioOrigen: municipioorigen, DepartamentoDestino: departamentodestino, MunicipioDestino: municipiodestino, PrimerDia: primerdia, SegundoDia: segundodia, Transporte: transporte }).draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function agregarNuevaTarifaTerrestre(departamentoorigen, municipioorigen, departamentodestino, municipiodestino, primerdia, segundodia, transporte) {
    var tbl = $("#tbltarifaterrestre").DataTable();
    
    if (document.getElementById("DepartamentoOrigen").selectedIndex == null | document.getElementById("MunicipioOrigen").selectedIndex == null | document.getElementById("DepartamentoDestino").selectedIndex == null | document.getElementById("MunicipioDestino").selectedIndex == null | primerdia.length == 0 | segundodia.length == 0 | transporte.length == 0) {
        $("#alertamensaje").html("No se permite valores vacios. Por favor sirvase cambiar alguno de los parametros.");
        $("#modalAlerta").modal('toggle');
    } else {
        if ($('#tbltarifaterrestre tr > td:contains(' + departamentoorigen + ') + td:contains(' + municipioorigen + ') + td:contains(' + departamentodestino + ') + td:contains(' + municipiodestino + ') + td:contains(' + primerdia + ') + td:contains(' + segundodia + ') + td:contains(' + transporte + ')').length > 0) {
            $("#alertamensaje").html("<b>" + departamentoorigen + ", " + municipioorigen + ", " + departamentodestino + ", " + municipiodestino + "</b> , ya se encuentra en la lista. </br></br> Si desea modificarlo, dirijase a la caja buscar, y digite el nombre a modificar, luego posicionese en el registro y de click derecho para posteriormente seleccionar del menu desplegable: <b>Modificar</b>");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 600
                    , "action": "agregar"
                    , "subaction": "terrestre"
                    , "departamentoorigen": departamentoorigen
                    , "municipioorigen": municipioorigen
                    , "departamentodestino": departamentodestino
                    , "municipiodestino": municipiodestino
                    , "primerdia": primerdia
                    , "segundodia": segundodia
                    , "transporte": transporte
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        tbl.row.add({ DepartamentoOrigen: departamentoorigen, MunicipioOrigen: municipioorigen, DepartamentoDestino: departamentodestino, MunicipioDestino: municipiodestino, PrimerDia: primerdia, SegundoDia: segundodia, Transporte: transporte }).draw();

                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function AdminTarifaExtranjera() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "menu", "subaction": "extranjero" },
        dataType: "json",
        async: true,
        success: function (result) {
            selectOptionMenu($("#admintarifaextranjera").text());
            $("#panelRigth").empty();
            $("#panelRigth").append(result);

            getDataTarifaExtranjera();

            $("#btnGuardarNuevatarifaExtranjera").click(function () {
                agregarNuevaTarifaExtranjera($("#ModCargoExtranjero").val()
                                     , $("#ModTarifaExtranjero").val());
            });
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function getDataTarifaExtranjera() {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 600, "action": "datos", "subaction": "extranjero" },
        dataType: "json",
        async: true,
        success: function (results) {
            var arrColumnsSecre = [];

            arrColumnsSecre.push({ "data": "Cargo", "sTitle": "Cargo", "orderable": true, "sType": "string" });
            arrColumnsSecre.push({ "data": "Tarifa", "sTitle": "Tarifa", "orderable": true, "sType": "string" });

            var tbl = $("#tbltarifaextranjera").DataTable({
                data: results,
                "columns": arrColumnsSecre,
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
                },
                "fnDrawCallback": function (oSettings) {
                    $("#tbltarifaextranjera tbody tr").contextmenu({
                        menu: [
                          { title: "Eliminar", cmd: "Eliminar", uiIcon: "ui-icon-volume-off ui-icon-filter" },
                          { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                        ],
                        select: function (event, ui) {
                            switch (ui.cmd) {
                                case "Eliminar":
                                    if (confirm("Desea eliminar el registro: " + tbl.row('.selected').data()['Cargo'] + "?") == true) {

                                        $.ajax({
                                            url: "../controladores/controladorCI.ashx",
                                            method: "POST",
                                            data: {
                                                "op": 600
                                                , "action": "eliminar"
                                                , "subaction": "extranjero"
                                                , "cargo": tbl.row('.selected').data()['Cargo']
                                            },
                                            dataType: "json",
                                            async: true,
                                            success: function (result) {
                                                tbl.row('.selected').remove();
                                                tbl.draw();
                                                $("#alertamensaje").html("El registro se ha eliminado satisfactoriamente.");
                                                $("#modalAlerta").modal('toggle');
                                            },
                                            error: function (result) {
                                                $("#alertamensaje").html("El registro no se ha eliminado satisfactoriamente, intentelo nuevamente.");
                                                $("#modalAlerta").modal('toggle');
                                            }
                                        });
                                    }
                                    break;
                                case "Modificar":
                                    $("#ModCargoExtranjero").val(tbl.row('.selected').data()['Cargo']);
                                    $("#ModTarifaExtranjero").val(tbl.row('.selected').data()['Tarifa']);

                                    $("#modalModTarifaExtranjero").modal('toggle');
                            }
                        },
                        beforeOpen: function (event, ui) {
                            var $menu = ui.menu,
                                $target = ui.target,
                                extraData = ui.extraData;
                            ui.menu.zIndex(9999);
                        }
                    });
                }
            });
            $('#tbltarifaextranjera tbody').on('click', 'tr', function () {
                tbl.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });

            $('#tbltarifaextranjera tbody tr:first').addClass('selected');
        },
        error: function (result) {
            alert("failed");
        }
    });
}

function modTarifaExtranjera(cargo, tarifa) {
    var tbl = $("#tbltarifaextranjera").DataTable();

    if (cargo == tbl.row('.selected').data()['Cargo'] & tarifa == tbl.row('.selected').data()['Tarifa']) {
        $("#alertamensaje").html("El item que intenta modificar, ya se encuentra en la lista. </br> Por favor sirvase cambiar el supervisor o autorizador.");
        $("#modalAlerta").modal('toggle');
    } else {
        $.ajax({
            url: "../controladores/controladorCI.ashx",
            method: "POST",
            data: {
                "op": 600
                , "action": "modificar"
                , "subaction": "extranjero"
                , "cargo": cargo
                , "tarifa": tarifa
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    tbl.row('.selected').data({ Cargo: cargo, Tarifa: tarifa }).draw();

                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalAlerta").modal('toggle');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    }
}

function agregarNuevaTarifaExtranjera(cargo, tarifa) {
    var tbl = $("#tbltarifaextranjera").DataTable();

    if (cargo.length == 0 | tarifa.length == 0) {
        $("#alertamensaje").html("No se permite valores vacios. Por favor sirvase cambiar alguno de los parametros.");
        $("#modalAlerta").modal('toggle');

    } else {
        if ($('#tbltarifaextranjera tr > td:contains(' + cargo + ') + td:contains(' + tarifa + ')').length > 0) {
            $("#alertamensaje").html("<b>" + cargo + ", " + tarifa + "</b> , ya se encuentra en la lista. </br></br> Si desea modificarlo, dirijase a la caja buscar, y digite el nombre a modificar, luego posicionese en el registro y de click derecho para posteriormente seleccionar del menu desplegable: <b>Modificar</b>");
            $("#modalAlerta").modal('toggle');
        } else {
            $.ajax({
                url: "../controladores/controladorCI.ashx",
                method: "POST",
                data: {
                    "op": 600
                    , "action": "agregar"
                    , "subaction": "extranjero"
                    , "cargo": cargo
                    , "tarifa": tarifa
                },
                dataType: "json",
                async: true,
                success: function (result) {
                    if (result) {
                        tbl.row.add({ Cargo: cargo, Tarifa: tarifa }).draw();

                        $("#alertamensaje").text("     El registro fue agregado satisfactoriamente.");
                        $("#modalAlerta").modal('toggle');
                    }
                },
                error: function (result) {
                    $("#alertamensaje").text("     El registro no fue agregado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                }
            });
        }
    }
}

function selectOptionMenu(option) {
    if (option.length > 0) {
        
        document.getElementById("adminalimentacionterrestre").style.backgroundColor = "#FFF";
        document.getElementById("adminhotelasumido").style.backgroundColor = "#FFF";
        document.getElementById("admintarifapeaje").style.backgroundColor = "#FFF";
        document.getElementById("admintarifaterrestre").style.backgroundColor = "#FFF";
        document.getElementById("admintarifaextranjera").style.backgroundColor = "#FFF";

        if (option == $("#adminalimentacionterrestre").text()) {
            document.getElementById("adminalimentacionterrestre").style.backgroundColor = "#2c93c6";
        }
        if (option == $("#adminhotelasumido").text()) {
            document.getElementById("adminhotelasumido").style.backgroundColor = "#2c93c6";
        }
        if (option == $("#admintarifapeaje").text()) {
            $("#admintarifapeaje").css("background-color", "#2c93c6");
        }
        if (option == $("#admintarifaterrestre").text()) {
            $("#admintarifaterrestre").css("background-color", "#2c93c6");
        }
        if (option == $("#admintarifaextranjera").text()) {
            $("#admintarifaextranjera").css("background-color", "#2c93c6");
        }       
    }
}
