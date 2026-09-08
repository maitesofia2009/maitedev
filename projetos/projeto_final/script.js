let imPalavras = [
    "TORTA",
    "LIVRO",
    "CASAS",
    "FRUTA",
    "CLARO",
    "CAMPO",
    "FELIZ",
    "BRAVO",
    "NUVEM",
    "PEDRA",
    "JOVEM",
    "GRITO",
    "VERDE",
    "PLUMA",
    "CAIXA",
    "SONHO",
    "FOLHA",
    "TRIGO",
    "MARTE"
]

const imBtnEnviar = document.querySelector(".btnEnviar");

const modalVitoria = document.querySelector("#modalVitoria");
const modalDerrota = document.querySelector("#modalDerrota");
const btnReiniciar = document.querySelectorAll(".btnReiniciar");

let imPalavraSecreta = "";
let imTentativa = 0;

function sortearPalavra(){
    let imindice = Math.floor(Math.random() * imPalavras.length);
    imPalavraSecreta = imPalavras[imindice];

    console.log(imPalavraSecreta);
}


function criarQuadro() {
    const imQuadro = document.querySelector(".quadro");

    for (let c = 1; c <= 6; c++) {
        let imLinha = document.createElement("div");
        imLinha.classList.add("linha")

        for (let i = 1; i <= 5; i++) {
            let imCasa = document.createElement("div");
            imCasa.classList.add("casa");
            imLinha.appendChild(imCasa);

            if((c + i) % 2 == 0) {
                imCasa.classList.add("preto");
            }
        }

        imQuadro.appendChild(imLinha)
    }
}


function verificar() {

    const iminput = document.querySelector(".inputPalavra");
    let imInputValue = iminput.value.toUpperCase();

   

    let imLinha = document.querySelectorAll(".linha")[imTentativa];

    for(let i = 0; i < 5; i++) {
        let imWord = imLinha.children[i];
        imWord.textContent = imInputValue[i];

        if(imInputValue[i] == imPalavraSecreta[i]) {
            imWord.classList.add("acerto");
        } else if(imPalavraSecreta.includes(imInputValue[i])) {
            imWord.classList.add("erro");
        }
    }

    imTentativa++;
    document.querySelector(".usadas").textContent = imTentativa;
    iminput.value = "";

    if (imInputValue === imPalavraSecreta) {
        modalVitoria.classList.add("is-active");
        return;
    }

    if (imTentativa === 6) {
        modalDerrota.classList.add("is-active");
    }

}


criarQuadro();
sortearPalavra();

imBtnEnviar.addEventListener("click", function(){
    verificar();
});

function reiniciarJogo() {
    imTentativa = 0;

    sortearPalavra();
    document.querySelector(".quadro").innerHTML = "";
    criarQuadro();
    document.querySelector(".inputPalavra").value = "";
    document.querySelector(".usadas").textContent = imTentativa;

    modalVitoria.classList.remove("is-active");
    modalDerrota.classList.remove("is-active");
}

const imReturn = document.querySelector(".return");

imReturn.addEventListener("click", function() {
    reiniciarJogo();
});

btnReiniciar.forEach(function(botao) {
    botao.addEventListener("click", function() {
        reiniciarJogo();
    });
});