//*****************Common function*********************

function GetCurrentProfile() {
    typeUser = $("#txtTypeUser").val();
    IdCurrentStudent = 1;
    $.ajax({
        url: "../Controllers/Controlador.ashx?op=300&IdCurrentStudent=" + IdCurrentStudent + "&typeUser=" + typeUser,
        method: "POST",
        dataType: "json",
        async: true,
        success: function (result) {
            if (typeUser === "Student") {
                $("#UserName").val(result["UserName"]);
                $("#LastName").val(result["LastName"]);
                $("#UserDocument").val(result["UserDocument"]);
            } else {
                $('#Cargo option').remove();
            }
            $("#typeUser").val();

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