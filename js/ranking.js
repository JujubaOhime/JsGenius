$(document).ready(function () {
    var urlget = "https://young-reaches-88428.herokuapp.com/https://us-central1-prova-front-letras.cloudfunctions.net/ranking"
    $.ajax({
        url: urlget,
        dataType: "json",
        type: "GET",
        contentType: "application/json",
        crossDomain: true,
        cache: true,
        headers: {
            "Access-Control-Allow-Origin": "https://us-central1-prova-front-letras.cloudfunctions.net/ranking",
            "Access-Control-Allow-Credentials": true,
            "X-Requested-With": "XMLHttpRequest"
        },
        success: function (response) {
            $(".loader").remove()
            $(".listWrapper").css("display", "block")
            var html = " "
            var size = response.length - 1
            var position = 0

            response.sort(function(a, b){
                if (a.score > b.score) {
                    return 1;
                  }
                  if (a.score < b.score) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            })

            for (i = size; i > -1; i--) {

                position = position + 1
                html = html + "<li class='ranking-names'> <div> <p>" + position + "</p> <p>" + response[i].name + "</p>"
                html = html + "</div> <p class='ranking-score'>" + response[i].score + "</p> </li>"
            }
            
            $(".listWrapper ul").append(html)

        },
        error: function(error){
            $(".loader").remove()
            console.log(error)
            var html = "<p>Desculpe, não está funcionando no momento <br>"
            html = html + error.responseText + "</p>"
            $(".listWrapper").append(html)
            $(".listWrapper p").css("text-align", "center")
        }
    })
});