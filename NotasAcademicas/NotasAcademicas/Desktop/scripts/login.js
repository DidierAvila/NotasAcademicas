﻿$(document).ready(function () {

    $(".imgEspera").hide();

    $("#DivAlert").hide();

    $("#btnIngresar").click(AutenticarUsuarioAdmin);

    $(".imgEspera").show();

    init();

    $(".imgEspera").hide();

    $("#divForm").removeClass("hidden");
    $("#divForm").addClass("show");

    $(window).resize(cambiarTamanoVentana);

    cambiarTamanoVentana();
});

function AutenticarUsuarioAdmin() {
    $(".imgEspera").show();
    $("#vtnAlerta").hide();

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
                if (result.toString().indexOf("false") > -1) {
                    $("#lblInfoError").val("Usuario y/o contraseña no valido");
                    $("#DivAlert").show();
                } else {
                    storage = $.sessionStorage;
                    storage.set("loginusuario", user);
                    if (typeUser==="Student") {
                        document.location.href = "Main.html";
                    } else {
                        document.location.href = "Main.html";
                    }  
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

