var UserCurrentName;
var CurrentUserType;
var IdCurrentUser;
var CurrentRole;
var storage;
var mod = true;
var CurrentTable;

$(document).ready(function () { 
    init();
    poseePermiso();
    CorregirColoresB();
    Hide();

    //Menu buttons
    $("#btnLogOut").click(function () {
        storage = $.sessionStorage;
        storage.remove('loginusuario');
        document.location.href = "LoginStudent.html";
    });

    $("#btnHome").click(function () {
        Home();
    });

    $("#btnCalendary").click(function () {
        Calendary();
    });

    $("#btnMattersStuden").click(function () {
        GetCurrentMatters();
    });

    $("#mnuMattersTeacher").click(function () {
        GetCurrentMatters();
    });

    $("#btnMyProfile").click(function () {
        MyProfile();
        GetCurrentProfile();
    });

    $("#btnPanelAdminUsuarios").click(function () {
        AdminUsuarios();
    });

    $('#modalAlerta').on('hide.bs.modal', function () {
        $("#alertamensaje").html('');
    });

    $("#btnUpdateMyProfile").click(function () {
        $("#modalModNewItinerary").modal('toggle');
    });

    $('#modalAdminUser').on('hide.bs.modal', function () {
        mod = true;
    });
});

function poseePermiso() {
    storage = $.sessionStorage;
    UserCurrentName = storage.get("userCurrentName");
    CurrentUserType = storage.get("typeCurrentUser");
    IdCurrentUser = storage.get("idCurrentUser");
    CurrentRole = "Estudiante";//storage.get("currentRole");
    //if (!CurrentUserType) {
    //    window.location.href = "LoginStudent.html";
    //}
    //if (!loginUsuario) {
    //    window.location.href = "LoginStudent.html";
    //}
    if (CurrentUserType === "student") {
        $("#currentRole").text("Estudiante");
        $("#mnuMattersTeacher").hide();
        $("#panelTeacher").hide();
    } else {
        $("#currentRole").text("Profesor");
        $("#mnuMattersStuden").hide();
        $("#panelStuden").hide();
    }
}

//**************************Left Panel********************************

function Hide() {
    $("#panelHome").hide();
    $("#panelMyProfile").hide();
    $("#panelNotesStuden").hide();
    $("#panelCalendary").hide();
    $("#panelNotesTeacher").hide();
}

function CorregirColoresB() {
    $(".navbar-default").css("background-color", "#1F6591");
    colorFondoPanelHeadingA = "#216692";
    colorTextoPanelHeadingA = "#ffffff";
    colorFondoBodyPanelA = "#474747";
    estilo1 = "background-color:" + colorFondoPanelHeadingA + ";\n"
        + "color:" + colorTextoPanelHeadingA;
    $(".panel-heading").attr("style", estilo1);
}

function Home() {
    $("#panelHome").show();
    $("#panelMyProfile").hide();
    $("#panelNotesStuden").hide();
    $("#panelCalendary").hide();
    $("#panelNotesTeacher").hide();
}

function MyProfile() {
    $("#panelMyProfile").show();
    $("#panelHome").hide();
    $("#panelNotesStuden").hide();
    $("#panelCalendary").hide();
    $("#panelNotesTeacher").hide();
}

function GetCurrentMattersMenu(){
    $("#panelHome").hide();
    $("#panelMyProfile").hide();
    $("#panelMyItinerary").hide();
    $("#panelNotesTeacher").hide();
    $("#panelCalendary").hide();
}

function Calendary() {
    $("#panelHome").hide();
    $("#panelMyProfile").hide();
    $("#panelCalendary").show();
    $("#panelNotesTeacher").hide();
    $("#panelNotesStuden").hide();
}

//**************************Right Panel********************************

function GetCurrentProfile() {
    if (IdCurrentUser !== '' || CurrentUserType !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=300&IdCurrentStudent=" + IdCurrentUser + "&typeUser=" + CurrentUserType,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    $("#UserName").val(result["UserName"]);
                    $("#LastName").val(result["LastName"]);
                    $("#UserDocument").val(result["Document"]);
                    $("#UserEmail").val(result["Email"]);
                    $("#UserPhone").val(result["PhoneNumber"]);
                    $("#Nationality").val(result["Nationality"]);
                    $("#UserPassword").val(result["Password"]);
                    $("#UserBirthDate").val(result["Birthdate"]);
                    if (result["Gender"] === "Masculino") {
                        $("#CheckMale").prop('checked', true);
                    } else {
                        $("#CheckFemale").prop('checked', true);
                    }
                    $("#TypeDocument").val(result["DocumentType"]);

                    if (CurrentUserType === "student") {
                        $("#CareerPrograms").val(result["Career"]);
                        $("#CurrentLevel").val(result["CurrentLevel"]);
                        $("#GeneralAverage").val(result["GeneralAverage"]);
                        $("#DateAdmission").val(result["AdmissionDate"]);
                        $("#headquarters").val(result["Headquarters"]);             
                    } else {
                        $("#faculty").val(result["Faculty"]);
                        $("#educationLevel").val(result["CurrentLevel"]);
                        $("#profession").val(result["profession"]);
                        $("#languages").val("Ingles-Español");
                    }
                }
                else {
                    alert('Error:' + result["error"]);
                }
            },
            error: function (result) {
                alert("failed");
            }
        });
    } else {
        alert("Parámetros vacios!");
    }
}

function GetCurrentMatters() {
    $("#panelCalendary").hide();
    if (IdCurrentUser !== '' || CurrentUserType !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=400&IdCurrentStudent=" + IdCurrentUser + "&typeUser=" + CurrentUserType,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    if (CurrentUserType === "student") {
                        $("#ulNotes").children().remove();
                        for (var i = 0; i < result.length; i++) {
                            $("#ulNotes").append("<a id=" + result[i].IdMatter + " href=\"javascript:GetCurrentDetailMatters(" + result[i].IdRegistration + "," + result[i].IdMatter + ");\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-book\"></span>" + " " + result[i].NameMatter + "</a>");
                        }
                    } else {
                        $("#ulNotesT").children().remove();
                        for (var j = 0; j < result.length; j++) {
                            $("#ulNotesT").append("<a id=" + result[j].IdMatter + " href=\"javascript:GetCurrentDetailStudents(" + result[j].IdRegistration + "," + result[j].IdMatter + ");\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-book\"></span>" + " " + result[j].NameMatter + "</a>");
                        }
                    }
                    $("#panelHome").hide();
                    $("#panelMyProfile").hide();
                    $("#panelMyItinerary").hide();
                }
                else {
                    alert('Error:' + result["error"]);
                }
            },
            error: function (result) {
                alert("failed");
            }
        });
    } else {
        alert("Parámetros vacios!");
    }
}

function GetCurrentDetailMatters(IdRegistration, IdMatter) {
    if (IdRegistration !== '' && CurrentUserType !== '' && IdMatter !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=500&IdRegistration=" + IdRegistration + "&IdCurrentUser=" + IdCurrentUser + "&typeUser=" + CurrentUserType,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    if (CurrentUserType === "Student") {
                        $("#CademicPeriod").text(result[IdMatter].CademicPeriod);
                        $("#schedule").text(result[IdMatter].Schedule);
                        $("#nameMatter").text(result[IdMatter].Name);
                        $("#codeMatter").text(result[IdMatter].Code);
                        $("#teacherMatterName").text(result[IdMatter].TeacherName);
                        $("#numberCredits").text(result[IdMatter].NamberCredits);
                        $("#levelMatter").text(result[IdMatter].Level);
                        $("#noteOne").text(result[IdMatter].Qualifications[0]);
                        $("#noteTwo").text(result[IdMatter].Qualifications[1]);
                        $("#noteThree").text(result[IdMatter].Qualifications[2]);
                        $("#noteFour").text(result[IdMatter].Qualifications[3]);
                        $("#panelNotesStuden").show();
                    } else {
                        $("#CademicPeriodStudent").text(result[0].CademicPeriod);
                        $("#scheduleStudent").text(result[0].Schedule);
                        $("#nameMatterStudent").text(result[0].Name);
                        $("#codeMatterStudent").text(result[0].Code);
                        $("#teacherMatterNameStudent").text(result[0].TeacherName);
                        $("#numberCreditsStudent").text(result[0].NamberCredits);
                        $("#levelMatterStaudent").text(result[0].Level);
                        $("#panelNotesTeacher").show();
                    }                
                }
                else {
                    alert('Error:' + result["error"]);
                }
            },
            error: function (result) {
                alert("failed");
            }
        });
    } else {
        alert("Parámetros vacios!");
    }
}

function UpdateCurrentUser() {
    $("#modalModNewItinerary").display();
    if (CurrentUserType !== '' && IdCurrentUser !== '') {
        var currentUser = "IdCurrentUser:" + IdCurrentUser + "Email:" + $("#UserEmail").text() + "Telephono" + "";
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=600&IdRegistration=" + IdRegistration + "&IdCurrentUser=" + IdCurrentUser + "&typeUser=" + CurrentUserType,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    $("#UserName").val(result["UserName"]);
                    $("#LastName").val(result["LastName"]);
                    $("#UserDocument").val(result["Document"]);
                    $("#UserEmail").val(result["Email"]);
                    $("#UserPhone").val(result["PhoneNumber"]);
                    $("#Nationality").val(result["Nationality"]);
                    $("#UserPassword").val(result["Password"]);
                    $("#UserBirthDate").val(result["Birthdate"]);
                    if (result["Gender"] === "Masculino") {
                        $("#CheckFemale").prop('checked', true);
                    } else {
                        $("#CheckMale").prop('checked', true);
                    }
                    $("#TypeDocument").val(result["DocumentType"]);

                    var currentArray = result;
                    var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
                    for (var i = 0; i < result.length; i++) {
                        //$("#ulNotes").append("<a id=" + result[i].IdMatter + " href=\"javascript:AdminAlimentacionTerrestre();\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-book\"></span>" + " " + result[i].NameMatter + "</a>");
                    }
                }
                else {
                    alert('Error:' + result["error"]);
                }
            },
            error: function (result) {
                alert("failed");
            }
        });
    } else {
        alert("Parámetros vacios!");
    }
}

function GetCurrentDetailStudents(IdRegistration, IdMatter) {
    if (IdRegistration !== '' && CurrentUserType !== '' && IdMatter !== '') {
        GetCurrentDetailMatters(IdRegistration, IdMatter);
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=700&IdRegistration=" + IdRegistration + "&IdCurrentMatter=" + IdMatter + "&typeUser=" + CurrentUserType,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    var arrColumns = [];
                    arrColumns.push({ "data": "IdStuden", "sTitle": "IdStuden", "orderable": true, "sType": "int" });
                    arrColumns.push({ "data": "StudenName", "sTitle": "Nombre", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "Note1", "sTitle": "Note1", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "Note2", "sTitle": "Note2", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "Note3", "sTitle": "Note3", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "Note4", "sTitle": "Note4", "orderable": true, "sType": "string" });

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

                    $("#panelNotesTeacher").show();
                }
                else {
                    alert('Error:' + result["error"]);
                }
            },
            error: function (result) {
                alert("failed");
            }
        });
    } else {
        alert("Parámetros vacios!");
    }
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