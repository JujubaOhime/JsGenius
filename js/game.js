

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

const synth = new Tone.Synth().toDestination();
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

function playSound(number) {
    if(number == 1){
        synth.triggerAttackRelease("C4", "16n");
    }
    else if(number == 2){
        synth.triggerAttackRelease("D4", "16n");
    }
    else if(number == 3){
        synth.triggerAttackRelease("E4", "16n");
    }
    else if(number == 4){
        synth.triggerAttackRelease("F4", "16n");
    }
    else if(number == 5){
        synth.triggerAttackRelease("G4", "16n");
    }
    else if(number == 6){
        synth.triggerAttackRelease("A4", "16n");
    }
    else if(number == 7){
        synth.triggerAttackRelease("B4", "16n");
    }
    else if(number == 8){
        synth.triggerAttackRelease("D5", "16n");
    }
    else if(number == 9){
        synth.triggerAttackRelease("E5", "16n");
    }

};

$(".numbers .row .col").on('click', function () {
    var clickedNumber = $(this).find('p').text();
    console.log(clickedNumber)
    //playSound(clickedNumber)
    

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
                playSound(numbers[j])
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