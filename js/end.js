$(".score-number").text(sessionStorage.getItem("score"));

var urlget = "https://young-reaches-88428.herokuapp.com/https://us-central1-prova-front-letras.cloudfunctions.net/ranking"
var urlpost = "https://young-reaches-88428.herokuapp.com/https://us-central1-prova-front-letras.cloudfunctions.net/save"

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(".form-end-game").submit(function (e) {
    $(".score-form").blur()

    e.preventDefault();

    var score = parseInt(sessionStorage.getItem("score"))
    var name = $(".name-form").val()
    name = capitalizeFirstLetter(name)
    var data = {
        "name": name, "score": score
    }
    data = JSON.stringify(data)
    if (name.length > 1 && isNaN(score) == false) {
        $(".score-form").val("Salvando...")
        $.ajax({
            url: urlpost,
            type: "POST",   
            dataType: "json",
            contentType: "application/xml",
            cors: true,
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
            success: function (response) {
                window.location.href = "ranking.html"
            },
            error: function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Houve algum erro de servidor. Tente novamente mais tarde',
                })
                $(".score-form").val("Salvar Ranking")

            }

        })
    }
    else if (name.length <= 1 && isNaN(score) == true) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, escreva seu nome e obtenha uma pontuação',
        })
    }
    else if (name.length <= 1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, escreva seu nome',
        })
    }
    else if (isNaN(score) == true) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, obtenha uma pontuação',
        })
    }
    else if (name.length >= 20) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Apenas é permitido até 20 caracteres no nome!',
        })
    }





});