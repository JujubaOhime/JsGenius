function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function playSound(number, time, synth) {

    if(number == 1){
        synth.triggerAttackRelease("C4", time);
    }
    else if(number == 2){
        synth.triggerAttackRelease("D4", time);
    }
    else if(number == 3){
        synth.triggerAttackRelease("E4", time);
    }
    else if(number == 4){
        synth.triggerAttackRelease("F4", time);
    }
    else if(number == 5){
        synth.triggerAttackRelease("G4", time);
    }
    else if(number == 6){
        synth.triggerAttackRelease("A4", time);
    }
    else if(number == 7){
        synth.triggerAttackRelease("B4", time);
    }
    else if(number == 8){
        synth.triggerAttackRelease("C5", time);
    }
    else if(number == 9){
        synth.triggerAttackRelease("D5", time);
    }

};


$(document).ready(function(){

    $('.numbers .row .col').keydown(function(e) {
        if (e.keyCode==39) {
          $(this).nextAll('.numbers .row .col:first').focus();
        }
        if (e.keyCode==37) {
          $(this).prev('.numbers .row .col:first').focus();
        }
      });

    const synth = new Tone.Synth().toDestination();
    var randomNumber = Math.floor(Math.random() * 9) + 1;
    //playSound(randomNumber, "4n", synth)
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
                    playSound(numbers[j], "16n", synth)
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
});

