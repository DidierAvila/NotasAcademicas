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

    $("#btnLegalizeItinerary").click(function () {
        LegalizeItinerary();
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
    $("#panelNewItinerary").hide();
    $("#panelMyItinerary").hide();
    $("#panelLegalizeItinerary").hide();
    $("#panelMyProfile").hide();
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
    $("#panelMyItinerary").hide();
    $("#panelLegalizeItinerary").hide();
    $("#panelMyProfile").hide();
}

function NewItinerary() {
    LoadNewItinerary();
    $("#panelNewItinerary").show();
    $("#panelHome").hide();
    $("#panelMyItinerary").hide();
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

function LoadNewItinerary() {
    LoadCombo('DeptHometown');
    LoadCombo('DeptDestinationCity');
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
                    if (CurrentUserType === "student") {
                        $("#UserName").val(result["UserName"]);
                        $("#LastName").val(result["LastName"]);
                        $("#UserDocument").val(result["UserDocument"]);
                        $("#UserEmail").val(result["Email"]);
                        $("#UserPhone").val(result["PhoneNumber"]);
                        $("#UserBirthDate").val(result["Birthdate"]);
                        $("#nationality").val(result["Nationality"]);
                        $("#CareerPrograms").val(result["Career"]);
                        $("#CurrentLevel").val(result["CurrentLevel"]);
                        $("#GeneralAverage").val(result["GeneralAverage"]);
                        $("#DateAdmission").val(result["AdmissionDate"]);
                        $("#headquarters").val(result["Headquarters"]);
                        $("#UserPassword").val(result["Password"]);
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



function LoadCombo(combo) {
    $.ajax({
        url: "../controladores/controladorCI.ashx",
        method: "POST",
        data: { "op": 900, "action": combo },
        dataType: "json",
        async: true,
        success: function (result) {
            FillComboBox(result, combo);
        },
        error: function (result) {
            return null;
        }
    });
}

function FillComboBox(resultTable, combo) {
    if (resultTable !== null) {
        $.each(resultTable, function (i, o) {
            $("#" + combo).append("<option id =" + o.Codigo + ">" + o.Municipio + "</option>");
        });
    }
}

function LoadGridView(gridView) {

}