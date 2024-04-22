const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector('#start-pause');

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("assets/sounds/luna-rise-part-one.mp3");
const audioPlay = new Audio("assets/sounds/play.wav");
const audioPause = new Audio("assets/sounds/pause.mp3");
const audioTempoFinalizado = new Audio("assets/sounds/beep.mp3");

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true


musicaFocoInput.addEventListener("change", function(){
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

focoBt.addEventListener("click", function(){
   alterarContexto("foco");
    focoBt.classList.add("active");
});

curtoBt.addEventListener("click", function(){
   alterarContexto("descanso-curto");
   curtoBt.classList.add("active");
});

longoBt.addEventListener("click", function(){
   alterarContexto("descanso-longo");
   longoBt.classList.add("active");
});

function alterarContexto(contexto){
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/assets/images/${contexto}.png`);
    switch(contexto){
        case contexto = "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
        break;
        case contexto = "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;
        case contexto = "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        break; 
    }  
}

startPauseBt.addEventListener('click', iniciarOuPausar);

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!');
        zerar();
        return
    }else{
        tempoDecorridoEmSegundos -= 1;
        console.log("Temporarizador:" + tempoDecorridoEmSegundos);
    }
}

function iniciarOuPausar(){
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;

}