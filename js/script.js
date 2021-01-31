$(".form-end-game").submit(function (e) {

    e.preventDefault();
    var score = parseInt($(".score-number").text())
    var name = $(".name-form").val()
    console.log(score, name)

    var data = ({
        "name": name, "score": score
    })

    $.ajax({
        type: "POST",
        crossDomain: true,
        headers: {
            'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        dataType: 'jsonp',
        url: 'https://us-central1-prova-front-letras.cloudfunctions.net/save',
        data: data
    });


});

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

$(".current-number-frame p").text(randomNumber);
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
        numbersInput = []
        score = score + 1
        var j = 0
        function myLoop(){
            setTimeout(function(){
                $('.current-number-frame p').fadeOut(0, function()
                {     
                    $(this).html(numbers[j]).fadeIn(100);
                });
                j = j + 1
                if (j < numbers.length){
                    myLoop();
                }
            }, 300)
        }
        myLoop()
    }
    sleep(100)

});

$(".score-number").text(sessionStorage.getItem("score"));

$.fn.extend({
    disableSelection: function() {
        this.each(function() {
            this.onselectstart = function() {
                return false;
            };
            this.unselectable = "on";
            $(this).css('-moz-user-select', 'none');
            $(this).css('-webkit-user-select', 'none');
        });
    }
});

$('.numbers .row .col').disableSelection();
     


