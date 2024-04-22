const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button"); 
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("assets/sounds/luna-rise-part-one.mp3")

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