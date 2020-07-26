var queryURL = "https://cors-anywhere.herokuapp.com/https://emailrep.io/"


$(document).ready(function() {
    $("#emailrepSubmit").click(function(e) {
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
                console.log('CORS anywhere response', response);
            }).fail(function (jqXHR, textStatus) {
                if(jqXHR.status === 429) {
                    $("#emailrepResult").text("Vous avez effectué trop de requêtes, l'api emailrep ne permet que quelques requêtes gratuites par jour.");
                }
                else{
                    $("#emailrepFail").text("La requête n'a pas fonctionné");
                }
                $('#emailrepModal').modal('show');
            })
    });
});

