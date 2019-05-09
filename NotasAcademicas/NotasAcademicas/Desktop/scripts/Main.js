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
        if (CurrentUserType === "student") {
            window.location.href = "LoginStudent.html";
        } else {
            window.location.href = "LoginTeacher.html";
        }
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

    $("#btnUpdateMyProfile").click(function () {
        GetCurrentUser();
    });

    $("#btnGuardarModTeacher").click(function () {
        UpdateCurrentTeacher();
    });

    $("#btnGuardarModStuden").click(function () {
        UpdateCurrentStuden();
    });

    $("#btnUpdateNotes").click(function () {
        var idRegistration = $("#currentIdRegistration").text();
        var idMatter = $("#currentIdMatter").text();
        var currentGroup = $("#currentGroup").val();
        UpdateCurrentStudenNotes(idRegistration, idMatter, currentGroup);
    });

    $('#modalAlerta').on('hide.bs.modal', function () {
        $("#alertamensaje").html('');
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
    if (!CurrentUserType || !UserCurrentName) {
        window.location.href = "LoginTeacher.html";
    }
    $("#currentUserName").text(UserCurrentName);
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
                            $("#ulNotes").append("<a id=" + result[i].IdMatter + " href=\"javascript:GetCurrentDetailMatters(" + result[i].IdRegistration + "," + result[i].IdMatter + "," + result[i].Group +");\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-book\"></span>" + " " + result[i].NameMatter + "</a>");
                        }
                    } else {
                        $("#ulNotesT").children().remove();
                        for (var j = 0; j < result.length; j++) {
                            $("#ulNotesT").append("<a id=" + result[j].IdMatter + " href=\"javascript:GetCurrentDetailStudents(" + result[j].IdRegistration + "," + result[j].IdMatter + "," + result[j].Group +");\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-book\"></span>" + " " + result[j].NameMatter + "</a>");
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

function GetCurrentDetailMatters(IdRegistration, IdMatter, Group ) {
    if (IdRegistration !== '' && CurrentUserType !== '' && IdMatter !== '' && Group !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=500&IdRegistration=" + IdRegistration + "&IdCurrentUser=" + IdCurrentUser + "&typeUser=" + CurrentUserType + "&IdMatter=" + IdMatter + "&Group=" + Group,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    if (CurrentUserType === "student") {
                        $("#CademicPeriod").text(result[0].CademicPeriod);
                        $("#schedule").text(result[0].Schedule);
                        $("#nameMatter").text(result[0].Name);
                        $("#codeMatter").text(result[0].Code);
                        $("#teacherMatterName").text(result[0].TeacherName);
                        $("#numberCredits").text(result[0].NamberCredits);
                        $("#levelMatter").text(result[0].Level);
                        $("#noteOne").text(result[0].Qualifications[0]);
                        $("#noteTwo").text(result[0].Qualifications[1]);
                        $("#noteThree").text(result[0].Qualifications[2]);
                        $("#noteFour").text(result[0].Qualifications[3]);
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

function UpdateCurrentTeacher() {
    if (CurrentUserType !== '' && IdCurrentUser !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=600&IdCurrentUser=" + IdCurrentUser + "&typeUser=" + CurrentUserType,
            method: "POST",
            data: {
                "celular": $("#celularTeacher").val()
                , "email": $("#EmailTeacher").val()
                , "facultad": $("#FacultadTeacher").val()
                , "grado": $("#gradoTeacher").val()
                , "profesion": $("#ProfesionTeacher").val()
                , "idioma": $("#IdiamasTeacher").val()
                , "password": $("#PasswordTeacher").val()
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    $("#UserEmail").val($("#EmailTeacher").val());
                    $("#UserPhone").val($("#celularTeacher").val());
                    $("#faculty").val($("#FacultadTeacher").val());
                    $("#educationLevel").val($("#gradoTeacher").val());
                    $("#profession").val($("#ProfesionTeacher").val());
                    $("#languages").val($("#IdiamasTeacher").val());
                    $("#UserPassword").val($("#PasswordTeacher").val());
                    $("#alertamensaje").text("     El registro fue modificado satisfactoriamente.");
                    $("#modalTeacher").modal('hide');
                    $("#modalAlerta").modal('toggle');
                } else {
                    $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                    $("#modalTeacher").modal('hide');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    } else {
        alert("Parámetros vacios!");
    }
}

function UpdateCurrentStuden() {
    if (CurrentUserType !== '' && IdCurrentUser !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=600&IdCurrentUser=" + IdCurrentUser + "&typeUser=" + CurrentUserType,
            method: "POST",
            data: {
                "celular": $("#celularStuden").val()
                , "email": $("#EmailStudent").val()
                , "facultad": $("#FacultadTeacher").val()
                , "grado": $("#gradoTeacher").val()
                , "profesion": $("#ProfesionTeacher").val()
                , "idioma": $("#IdiamasTeacher").val()
                , "password": $("#PasswordStudent").val()
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    $("#UserEmail").val($("#EmailStudent").val());
                    $("#UserPhone").val($("#celularStuden").val());
                    $("#UserPassword").val($("#PasswordStudent").val());
                    $("#alertamensaje").text("     La información fue modificado satisfactoriamente.");
                    $("#modalStuden").modal('hide');
                    $("#modalAlerta").modal('toggle');
                } else {
                    $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                    $("#modalTeacher").modal('hide');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    } else {
        alert("Parámetros vacios!");
    }
}

function UpdateCurrentStudenNotes(IdRegistration, IdMatter, Group) {
    if (IdCurrentUser !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=800&IdCurrentUser=" + IdCurrentUser + "&IdRegistration=" + IdRegistration + "&IdCurrentMatter=" + IdMatter + "&Group=" + Group,
            method: "POST",
            data: {
                "note1": $("#mNote1").val()
                , "note2": $("#mNote2").val()
                , "note3": $("#mNote3").val()
                , "note4": $("#mNote4").val()
            },
            dataType: "json",
            async: true,
            success: function (result) {
                if (result) {
                    var tbl = $("#tblusuarios").DataTable();
                    tbl.row('.selected').data({
                        Note1: $("#mNote1").val()
                        , Note2: $("#mNote2").val()
                        , Note3: $("#mNote3").val()
                        , Note4: $("#mNote4").val()
                    }).draw();

                    $("#alertamensaje").text("     La información fue modificado satisfactoriamente.");
                    //$("#modalStuden").modal('hide');
                    $("#modalAlerta").modal('toggle');
                } else {
                    $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                    $("#modalAlerta").modal('toggle');
                    $("#modalTeacher").modal('hide');
                }
            },
            error: function (result) {
                $("#alertamensaje").text("     El registro no fue modificado satisfactoriamente. intentelo nuevamente.");
                $("#modalAlerta").modal('toggle');
            }
        });
    } else {
        alert("Parámetros vacios!");
    }
}

function GetCurrentDetailStudents(IdRegistration, IdMatter, Group) {
    if (IdRegistration !== '' && CurrentUserType !== '' && IdMatter !== '' && Group !== '') {
        GetCurrentDetailMatters(IdRegistration, IdMatter, Group);
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=700&IdRegistration=" + IdRegistration + "&IdCurrentMatter=" + IdMatter + "&Group=" + Group,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    $("#currentTable").children().remove();
                    $("#currentTable").append("<table id=\"tblusuarios\">");
                    var arrColumns = [];
                    arrColumns.push({ "data": "IdStuden", "sTitle": "IdStuden", "orderable": true, "sType": "int" });
                    arrColumns.push({ "data": "StudenName", "sTitle": "Nombre", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "Note1", "sTitle": "Nota 1", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "Note2", "sTitle": "Nota 2", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "Note3", "sTitle": "Nota 3", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "Note4", "sTitle": "Nota 4", "orderable": true, "sType": "string" });
                    arrColumns.push({ "data": "NoteTotal", "sTitle": "Nota Total", "orderable": true, "sType": "string" });

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
                                    { title: "Modificar", cmd: "Modificar", uiIcon: "ui-icon-volume-off ui-icon-filter" }
                                ],
                                select: function (event, ui) {
                                    var celltext = ui.target.text();
                                    var colvindex = ui.target.parent().children().index(ui.target);
                                    var colindex = $('#tblusuarios thead tr th:eq(' + colvindex + ')').data('column-index');
                                    switch (ui.cmd) {
                                        case "Modificar":
                                            $("#currentIdMatter").val(IdMatter);
                                            $("#currentIdRegistration").text(IdRegistration);
                                            $("#currentGroup").text(Group);
                                            $("#currentIdStudent").text(tbl.row('.selected').data()['IdStuden']);
                                            $("#cStudentName").text('Notas ' + tbl.row('.selected').data()['StudenName']);
                                            $("#mNote1").val(tbl.row('.selected').data()['Note1']);
                                            $("#mNote2").val(tbl.row('.selected').data()['Note2']);
                                            $("#mNote3").val(tbl.row('.selected').data()['Note3']);
                                            $("#mNote4").val(tbl.row('.selected').data()['Note4']);
                                            $("#modalNotes").modal('toggle');
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

function GetCurrentUser() {
    if (CurrentUserType !== '' && IdCurrentUser !== '') {
        
        if (CurrentUserType === "student") {
            $("#EmailStudent").val($("#UserEmail").val());
            $("#celularStuden").val($("#UserPhone").val());
            $("#PasswordStudent").val($("#UserPassword").val());
            $("#modalStuden").modal('toggle');
        }
        else {
            $("#EmailTeacher").val($("#UserEmail").val());
            $("#celularTeacher").val($("#UserPhone").val());
            $("#FacultadTeacher").val($("#faculty").val());
            $("#gradoTeacher").val($("#educationLevel").val());
            $("#ProfesionTeacher").val($("#profession").val());
            $("#IdiamasTeacher").val($("#languages").val());
            $("#PasswordTeacher").val($("#UserPassword").val());
            $("#modalTeacher").modal('toggle');
        }
    } else {
        alert("Parámetros vacios!");
    }
}
