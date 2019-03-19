var colorFondoPanelHeading;
var colorTextoPanelHeading;
var colorFondoBodyPanel;


function init() {
    //Activar los tooltips
    $(function () {
        try {
            $('[data-toggle="tooltip"]').tooltip();
        } catch (err)
        {
            alert(err.message);
        }
    })
    colorFondoPanelHeading = "#006594";
    colorFondoPanelHeading = "#193866";
    colorTextoPanelHeading = "#ffffff";
    colorFondoBodyPanel = "#474747";
    $("#logincontainer").css("position", "fixed");
}

///Asigna colores a algunos elementos que no se pueden cambiar por bootstrap
function CorregirColores()
{
    estilo1 = "background-color:" + colorFondoPanelHeading + ";\n"
    + "color:" + colorTextoPanelHeading;
    $(".panel-heading").attr("style", estilo1);
}