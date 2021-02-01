var urlget = "https://cors-anywhere.herokuapp.com/https://us-central1-prova-front-letras.cloudfunctions.net/ranking"
var urlpost = "https://cors-anywhere.herokuapp.com/https://us-central1-prova-front-letras.cloudfunctions.net/save"


$(".form-end-game").submit(function (e) {

    e.preventDefault();

    var score = parseInt($(".score-number").text())
    var name = $(".name-form").val()
    var data = {
        "name": name, "score": score
    }

    $.ajax({
        url: urlpost,
        type: "POST",
        dataType: "jsonp",
        contentType: "application/json",
        crossDomain: true,
        cache: true,
        data: data,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "X-Requested-With": "XMLHttpRequest"
        },
        success: function (response) {
            console.log("a")
            //console.log((response[0].name))
        }
    })








});

$(document).ready(function () {

    if (location.pathname.indexOf("/ranking.html")) {
        console.log("foi")
        $.ajax({
            url: urlget,
            dataType: "json",
            type: "GET",
            contentType: "application/json",
            crossDomain: true,
            cache: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "X-Requested-With": "XMLHttpRequest"
            },
            success: function (response) {
                console.log("foi")
                var html = " "
                var size = response.length - 1
                var position = 0
                for (i = size; i > 0; i--) {
                    position = position + 1
                    html = html + "<li class='ranking-names'> <div> <p>" + position + "</p> <p>" + response[i].name + "</p>"
                    html = html + "</div> <p class='ranking-score'>" + response[i].score + "</p> </li>"
                }
                $(".listWrapper ul").append(html)

            }
        })
    }


});

/* Script Gaming */

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

var randomNumber = Math.floor(Math.random() * 9) + 1;
var i = 0;
var score = 0
var numbers = []
var numbersInput = []
var counter = 0;
var j = 0

$(".current-number-frame p").text(randomNumber);
$('.current-number-frame p').fadeOut(1000)
numbers.push(randomNumber)



$(".numbers .row .col").on('click', function () {
    var number = $(this).text();
    numbersInput.push(number)

    if (numbers[i] != numbersInput[i]) {
        sessionStorage.setItem("score", score)
        window.location.href = "end.html"
    }
    i = i + 1

    if (score < numbersInput.length) {
        i = 0
        randomNumber = Math.floor(Math.random() * 9) + 1;
        numbers.push(randomNumber);
        numbers.push(" ");
        numbersInput = []
        score = score + 1
        j = 0;
        function myLoop() {
            setTimeout(function () {
                $('.current-number-frame p').fadeOut(0)
                $('.current-number-frame p').html(numbers[j]).fadeToggle(100);
                j = j + 1
                if (j < numbers.length) {
                    myLoop();
                }
            }, 400)
        }
        myLoop()

    }
    sleep(100)
    if (j == numbers.length) {
        numbers.pop()
    }


});

$(".score-number").text(sessionStorage.getItem("score"));

/* End script Gaming */
