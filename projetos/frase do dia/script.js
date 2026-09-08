const frases = [
  "Acredite em você e siga em frente.",
  "Cada pequeno passo te aproxima do seu objetivo.",
  "Você é capaz de superar desafios maiores do que imagina.",
  "Não desista: grandes conquistas levam tempo.",
  "Transforme seus sonhos em metas e suas metas em ação.",
  "O sucesso começa quando você decide tentar.",
  "Aprenda com os erros e continue evoluindo.",
  "Tenha coragem para começar e persistência para continuar.",
  "Seu esforço de hoje constrói o seu amanhã.",
  "Você não precisa ser perfeito, apenas não parar de avançar."
]

const fraseTexto = document.querySelector(".frase")
const btnFrase = document.querySelector(".btnFrase")

function mostrarFrase() {
    let indice = fraseTexto.textContent = Math.floor(Math.random() * frases.length)
    fraseTexto.textContent = frases[indice]
}

btnFrase.addEventListener("click", function () {
    mostrarFrase()
})