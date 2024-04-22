const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarIcon = document.querySelector(".app__card-primary-butto-icon");

const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("assets/sounds/luna-rise-part-one.mp3");
const audioPlay = new Audio("assets/sounds/play.wav");
const audioPause = new Audio("assets/sounds/pause.mp3");
const audioTempoFinalizado = new Audio("assets/sounds/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
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
    tempoDecorridoEmSegundos = 1500;
    focoBt.classList.add("active");
});

curtoBt.addEventListener("click", function(){
    tempoDecorridoEmSegundos = 300;
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active");
});

longoBt.addEventListener("click", function(){
    tempoDecorridoEmSegundos = 900;
    alterarContexto("descanso-longo");
    longoBt.classList.add("active");
});

function alterarContexto(contexto){
    mostrarTempo();
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
        audioTempoFinalizado.play();
        zerar();
        return
    }else{
        tempoDecorridoEmSegundos -= 1;
        mostrarTempo();
    }
}

function iniciarOuPausar(){
    if(intervaloId){
        audioPause.play()
        zerar();        
        return;
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarIcon.src = "assets/images/pause.png";
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarIcon.src = "assets/images/play_arrow.png";
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();