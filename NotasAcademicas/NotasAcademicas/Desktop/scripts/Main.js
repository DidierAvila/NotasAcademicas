var loginUsuario;
var storage;
var mod = true;
var CurrentTable;

$(document).ready(function () {
    $(".collapseExample").collapse();
    init();
    poseePermiso();
    CorregirColoresB();

    $("#btnLogOut").click(function () {
        storage = $.sessionStorage;
        storage.remove('loginusuario');
        document.location.href = "LoginStudent.html";
    });

    $("#panelHome").hide();
    $("#panelNewItinerary").hide();
    $("#panelMyItinerary").hide();
    $("#panelLegalizeItinerary").hide();
    $("#panelMyProfile").hide();

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
    loginUsuario = storage.get("loginusuario");
    if (!loginUsuario) {
        window.location.href = "LoginStudent.html";
    }
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

function getCurrentStudent() {
    var IdCurrentStudent = 1;
    $.ajax({
        url: "../Controllers/Controlador.ashx?op=300&IdCurrentStudent=" + IdCurrentStudent,
        method: "POST",
        dataType: "json",
        async: true,
        success: function (result) {
            $("#UserName").val();

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