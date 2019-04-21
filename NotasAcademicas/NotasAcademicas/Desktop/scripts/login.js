$(document).ready(function () {
    $("#btnIngresar").click(Login);
    $("#txtContrasena").click(HideDivAlert);
    $("#txtUsuario").click(HideDivAlert);
    init();
    $("#DivAlert").hide();
    $(".imgEspera").hide();
    $("#divForm").removeClass("hidden");
    $("#divForm").addClass("show");
    $(window).resize(cambiarTamanoVentana);
    cambiarTamanoVentana();
});

function Login() {
    $(".imgEspera").show();
    user = $("#txtUsuario").val();
    pwd = $("#txtContrasena").val();
    typeUser = $("#txtTypeUser").val();
    if (user.length === 0) {
        $("#DivAlert").show();
        $("#vtnAlerta").show();
        $("#lblInfoError").text("Debe ingresar un usuario!");
        $(".imgEspera").hide();
        $('#vtnAlerta').attr("disabled", false);
        return;
    }
    if (pwd.length === 0) {
        $("#DivAlert").show();
        $("#vtnAlerta").show();
        $("#lblInfoError").text("Debe ingresar una contraseña!");
        $(".imgEspera").hide();
        $('#vtnAlerta').attr("disabled", false);
        return;
    }
    $('#btnIngresar').attr("disabled", true);

    $.ajax({
        url: "../Controllers/Controlador.ashx?op=200&usuario=" + user + "&contrasena=" + pwd + "&typeUser=" + typeUser,
        method: "POST",
        dataType: "json",
        async: true,
        success: function (result) {
            $(".imgEspera").hide();
            $('#btnIngresar').attr("disabled", false);
            if (result.toString().indexOf("ERROR") > -1) {
                $("#lblInfoError").val("Usuario y/o contraseña no valido");
                $("#DivAlert").show();
            } else {
                if (result["IdCurrentUser"] === null || result["CurrentUser"] === null) {
                    $("#lblInfoError").text("Usuario y/o contraseña no valido");
                    $("#DivAlert").show();
                    $("#vtnAlerta").show();
                } else {
                    storage = $.sessionStorage;
                    storage.set("idCurrentUser", result["IdCurrentUser"]);
                    storage.set("userCurrentName", result["CurrentUser"]);
                    storage.set("typeCurrentUser", typeUser);
                    document.location.href = "Main.html"; 
                }
            }
        },
        error: function (result) {
            $(".imgEspera").hide();
            $('#btnIngresar').attr("disabled", false);
            $("#lblInfoError").text("Usuario y/o contraseña no valido");
            $("#DivAlert").show();
            $("#vtnAlerta").show();
        }
    });
}

function cambiarTamanoVentana() {
    if ($(window).width() < 780) {
        $("#divVersion").removeClass("show");
        $("#divVersion").addClass("hidden");
    } else {
        $("#divVersion").removeClass("hidden");
        $("#divVersion").addClass("show");
    }
}

function HideDivAlert() {
    $("#DivAlert").hide();
    $(".imgEspera").hide();
}


