var UserCurrentName;
var CurrentUserType;
var IdCurrentUser;
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

    $("#btnNewItinerario").click(function () {
        NewItinerary();
    });

    $("#btnMyItinerary").click(function () {
        MyItinerary();
    });

    $("#btnMattersStuden").click(function () {
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

    $("#btnGuardarDoMyProfiledfress").click(function () {
        modColaboradorAutorizador($("#ModColaborador").val()
            , $("#ModAutorizador").val());
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

    //if (!CurrentUserType) {
    //    window.location.href = "LoginStudent.html";
    //}
    //if (!loginUsuario) {
    //    window.location.href = "LoginStudent.html";
    //}
    $("#currentUserName").text(UserCurrentName);
}

//**************************Left Panel********************************

function Hide() {
    $(".collapseExample").collapse();
    $("#panelHome").hide();
    $("#panelCalendary").hide();
    $("#panelMyItinerary").hide();
    $("#panelLegalizeItinerary").hide();
    $("#panelMyProfile").hide();
    $("#panelNotesStuden").hide();
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
    $("#panelNewItinerary").hide();
    $("#panelCalendary").hide();
    $("#panelLegalizeItinerary").hide();
    $("#panelMyProfile").hide();
}

function MyItinerary() {
    $("#panelMyItinerary").show();
    $("#panelNewItinerary").hide();
    $("#panelHome").hide();
    $("#panelLegalizeItinerary").hide();
    $("#panelMyProfile").hide();
}

function LegalizeItinerary() {
    $("#panelLegalizeItinerary").show();
    $("#panelNewItinerary").hide();
    $("#panelHome").hide();
    $("#panelMyItinerary").hide();
    $("#panelMyProfile").hide();
}

function MyProfile() {
    $("#panelMyProfile").show();
    $("#panelLegalizeItinerary").hide();
    $("#panelNewItinerary").hide();
    $("#panelHome").hide();
    $("#panelMyItinerary").hide();
}

function GetCurrentMattersMenu(){
    $("#panelHome").hide();
    $("#panelMyProfile").hide();
    $("#panelMyItinerary").hide();
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
                    var items = ["CC", "TI", "PASAPORTE"];
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

                    if (CurrentUserType === "student") {
                        $("#CareerPrograms").val(result["Career"]);
                        $("#CurrentLevel").val(result["CurrentLevel"]);
                        $("#GeneralAverage").val(result["GeneralAverage"]);
                        $("#DateAdmission").val(result["AdmissionDate"]);
                        $("#headquarters").val(result["Headquarters"]);             
                    } else {
                        $("#UserName").val(result["UserName"]);
                        $("#LastName").val(result["LastName"]);
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
    if (IdCurrentUser !== '' || CurrentUserType !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=400&IdCurrentStudent=" + IdCurrentUser + "&typeUser=" + CurrentUserType,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    $("#ulNotes").children().remove();
                    for (var i = 0; i < result.length; i++) {
                        $("#ulNotes").append("<a id=" + result[i].IdMatter + " href=\"javascript:GetCurrentDetailMatters(" + result[i].IdRegistration + ");\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-book\"></span>" + " " + result[i].NameMatter + "</a>");
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

function GetCurrentDetailMatters(IdRegistration) {
    if (IdRegistration !== '' || CurrentUserType !== '') {
        $.ajax({
            url: "../Controllers/Controlador.ashx?op=500&IdRegistration=" + IdRegistration + "&typeUser=" + CurrentUserType,
            method: "POST",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result !== null) {
                    $("#panelNotesStuden").show();
                    $(document).ready(function () {
                        $('#example').DataTable();
                    });
                    var currentArray = result;
                    var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
                    for (var i = 0; i < result.length; i++) {
                        //$("#ulNotes").append("<a id=" + result[i].IdMatter + " href=\"javascript:AdminAlimentacionTerrestre();\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-book\"></span>" + " " + result[i].NameMatter + "</a>");
                    }
                    //$.each(result, function (i, o) {
                    //    $("#ulNotes").append("<a id=" + i + " href=\"javascript:AdminAlimentacionTerrestre();\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-book\"></span>" + o + "</a>");
                    //});

                    //$("#ulNotes").append(
                    //    + '<a id="adminalimentac">didier</a>'
                    //    + '<a id="adminalimentac" href="javascript:AdminAlimentacionTerrestre();" class="list-group-item"><span class="glyphicon glyphicon-book"></span> Materia 1</a>'
                    //    + '<a id="adminhotelasumido" href="javascript:AdminHotelAsumido()" class="list-group-item"><span class="glyphicon glyphicon-book"></span> Materia 2</a>'
                    //    + '<a id="admintarifapeaje" href="javascript:AdminTarifaPeaje()" class="list-group-item"><span class="glyphicon glyphicon-book"></span> Materia 3</a>'
                    //);

                    //if (CurrentUserType === "student") {

                    //} else {
                    //}
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