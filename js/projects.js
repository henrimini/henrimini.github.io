var queryURL = "https://cors-anywhere.herokuapp.com/https://emailrep.io/"
let loadingScreen = $('#loadingScreen');

for(var i=0;i<9;i++) {
    var x = $('#dancingNotes > li')[i];
    $(x).css('-webkit-animation','music 1s '+i+'00ms ease-in-out both infinite');
}

$(document).ready(function() {
    $("#yourEmail").change(function(e) {
        if (isEmail($("#yourEmail").val())) {
            $("#emailrepSubmit").prop('disabled', false);
        } else {
            $("#emailrepSubmit").prop('disabled', true);
        }
    });


    $("#emailrepSubmit").click(function(e) {
        loadingScreen.modal('show');
        var email = $("#yourEmail").val();
        queryURL += email;
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
            headers: {
                "x-requested-with": "xhr"
            }
            }).done(function (response) {
                $("#emailrepResult").text(JSON.stringify(response, null, 4));
                $('#emailrepModal').modal('show');
                loadingScreen.modal('hide');
            }).fail(function (jqXHR, textStatus) {
                if(jqXHR.status === 429) {
                    $("#emailrepFail").text("Vous avez effectué trop de requêtes, l'api emailrep ne permet que quelques requêtes gratuites par jour.");
                }
                else{
                    $("#emailrepFail").text("La requête n'a pas fonctionné");
                }
                $('#emailrepModal').modal('show');
                loadingScreen.modal('hide');
            })
    });
});


function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
}



