function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function playSound(number, time, synth, on, error) {

    if (on == true){
        if(error == true){
            synth.triggerAttackRelease("C2", time);
        }
        else if (number == 1) {
            synth.triggerAttackRelease("C4", time);
        }
        else if (number == 2) {
            synth.triggerAttackRelease("D4", time);
        }
        else if (number == 3) {
            synth.triggerAttackRelease("E4", time);
        }
        else if (number == 4) {
            synth.triggerAttackRelease("F4", time);
        }
        else if (number == 5) {
            synth.triggerAttackRelease("G4", time);
        }
        else if (number == 6) {
            synth.triggerAttackRelease("A4", time);
        }
        else if (number == 7) {
            synth.triggerAttackRelease("B4", time);
        }
        else if (number == 8) {
            synth.triggerAttackRelease("C5", time);
        }
        else if (number == 9) {
            synth.triggerAttackRelease("D5", time);
        }
    }

};

let synth = new Tone.Synth().toDestination();

let root = document.documentElement;

var on

if(sessionStorage.getItem("on") == '0'){
    $('.sound').attr('src','images/mute.svg');
    $('.sound').val('off');
    on = false
}
else{
    $('.sound').attr('src','images/volume.svg');
    $('.sound').val('on');
    on = true
}

$(".sound").on('click', function () {
    
    if($(this).val() == 'on'){
        $('.sound').attr('src','images/mute.svg');
        $('.sound').val('off');
        sessionStorage.setItem("on", "0")
        on = false
    }
    else{
        $('.sound').attr('src','images/volume.svg');
        $('.sound').val('on');
        sessionStorage.setItem("on", "1")
        on = true
    }
    
});

function beginGame() {

    $("#index").remove()
    $("#game").css("display", "unset")

    //if pressed 1-9 on keyboard or 1-9 on numlock it will focus on the number
    $(document).on('keypress', function (e) {
        if (e.which >= 49 && e.which <= 57) {
            let res = (e.which - 48)
            let colFinal = "n" + res
            $("." + colFinal).focus()
        }
        if (e.which >= 97 && e.which <= 105) {
            let res = (e.which - 96)
            let colFinal = "n" + res
            $("." + colFinal).focus()
        }
    });

    //keycode 37 arrow left
    //keycode 38 arrow up
    //keycode 39 arrow right
    //keycode 40 arrow bottom

    $('.numbers .row .col').keydown(function (e) {
        var col = parseInt($(this).text())
        //if pressed bottom, will focus on the number at the 
        if (e.keyCode == 40) {
            let res = (col + 3).toString()
            let colFinal = "n" + res
            $("." + colFinal).focus()
        }
        if (e.keyCode == 38) {
            let res = (col - 3).toString()
            let colFinal = "n" + res
            $("." + colFinal).focus()
        }
        if (e.keyCode == 39) {
            $(this).nextAll('.numbers .row .col:first').focus();
        }
        if (e.keyCode == 37) {
            $(this).prev('.numbers .row .col:first').focus();
        }
    });


    var randomNumber = Math.floor(Math.random() * 9) + 1;
    var i = 0;
    var score = 0
    var numbers = []
    var numbersInput = []
    var j = 0
    var error = false

    setTimeout(function () {
        numbers.push(randomNumber)
        playSound(randomNumber, "32n", synth, on, error)
        $(".sk-chase").remove()
        $(".current-number-frame p").text(randomNumber);
        $('.current-number-frame p').fadeOut(300)
    }, 1000);

    $(".numbers .row .col").on('click', function () {

        var elem = $(this)
        elem.addClass("col-hover")
        setTimeout(function () {
            elem.removeClass('col-hover');
            elem.blur();
        }, 300);
        var number = $(this).text();
        numbersInput.push(number)

        if (numbers[i] != numbersInput[i]) {
            error = true
            playSound(number, "8n", synth, on, error)
            setTimeout(function () {
                sessionStorage.setItem("score", score)
                window.location.href = "end.html"
            }, 300);
        }
        else {
            
            playSound(number, '16n', synth, on, error)
            i = i + 1

            if (score < numbersInput.length) {
                setTimeout(function () {
                    i = 0
                    randomNumber = Math.floor(Math.random() * 9) + 1;
                    numbers.push(randomNumber);
                    numbersInput = []
                    score = score + 1
                    j = 0;

                    function myLoop() {
                        setTimeout(function () {
                            if(j < numbers.length){
                                $('.current-number-frame p').fadeOut(0)
                                playSound(numbers[j], "16n", synth, on, error)
                                $('.current-number-frame p').html(numbers[j]).fadeToggle(100);
    
                                j = j + 1
                                
                                if (j <= numbers.length) {
                                    myLoop();
                                }
                            }
                            else{
                                $('.current-number-frame p').fadeOut(0)
                                $('.current-number-frame p').html(" ").fadeToggle(100);
                            }
                           
                        }, 400)
                    }

                    myLoop()

                }, 400);
            }
        }
    });

}



