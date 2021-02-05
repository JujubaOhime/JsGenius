$(".score-number").text(sessionStorage.getItem("score"));

var urlget = "https://young-reaches-88428.herokuapp.com/https://us-central1-prova-front-letras.cloudfunctions.net/ranking"
var urlpost = "https://young-reaches-88428.herokuapp.com/https://us-central1-prova-front-letras.cloudfunctions.net/save"


$(".form-end-game").submit(function (e) {

    e.preventDefault();

    var score = parseInt($(".score-number").text())
    var name = $(".name-form").val()
    var data = {
        "name": name, "score": score
    }
    data = JSON.stringify(data)
    if(name.length > 1 && isNaN(score) == false){
        $.ajax({
            url: urlpost,
            type: "POST",
            dataType: "json",
            contentType: "application/xml",
            cors: true ,
            crossDomain: true,
            cache: true,
            data: data,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "X-Requested-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "https://us-central1-prova-front-letras.cloudfunctions.net/save",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
                "Access-Control-Allow-Headers": "Origin, x-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization",
            },
            success:function(response){
                window.location.href = "ranking.html"
                //console.log((response[0].name))
            },
    
        })
    }
    else if(name.length <= 1 && isNaN(score) == true){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, escreva seu nome e obtenha uma pontuação',
          })
    }
    else if(name.length <= 1){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, escreva seu nome',
          })
    }
    else if(isNaN(score) == true){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, obtenha uma pontuação',
          })
    }
    
    
    
    
    
});