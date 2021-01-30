$(".form-end-game").submit(function(e){

    e.preventDefault();
    var score = parseInt($(".score-number").text())
    var name = $(".name-form").val()
    console.log(score, name)

    $.post("https://us-central1-prova-front-letras.cloudfunctions.net/save", {
        Nome : name, Score : score
    })

    
});