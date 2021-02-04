$(".score-number").text(sessionStorage.getItem("score"));

var urlget = "https://cors-anywhere.herokuapp.com/https://us-central1-prova-front-letras.cloudfunctions.net/ranking"
var urlpost = "https://us-central1-prova-front-letras.cloudfunctions.net/save"


$(".form-end-game").submit(function (e) {

    e.preventDefault();

    var score = parseInt($(".score-number").text())
    var name = $(".name-form").val()
    var data = {
        "name": name, "score": score
    }
    data = JSON.stringify(data)
    console.log(data)

    $.ajax({
        url: urlpost,
        type: "POST",
        dataType: "xml",
        contentType: "application/json",
        crossDomain: true,
        cache: true,
        data: data,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "*",
        },
        success: function (response) {
            console.log("a")
            //console.log((response[0].name))
        }
    })

});