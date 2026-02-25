const input = document.querySelector("#input-jogo");
const btnBusca = document.querySelector("#btn-buscar");

const cardPrincipal = document.querySelector("#card-jogo");
const imgCapa = document.querySelector("#img-capa");
const tituloJogo = document.querySelector("#txt-titulo");
const preco = document.querySelector("#txt-preco");

let jogoEncontrado;

async function api() {
  const valor = input.value;
  if (valor === "") {
    alert("Digite o jogo que você deseja encontrar!");
    return;
  }
  const url = `https://www.cheapshark.com/api/1.0/games?title=${valor}`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("ERROOOOO");
    }

    const dados = await resposta.json();
    if (dados.length === 0) {
      alert("Jogo não encontrado!");
      input.value = "";
      return;
    }
    console.log(dados);

    jogoEncontrado = dados[0];
    console.log(jogoEncontrado);

    imgCapa.src = jogoEncontrado.thumb;
    tituloJogo.innerText = jogoEncontrado.external;
    preco.innerText = "$ " + jogoEncontrado.cheapest;

    input.value = "";

    cardPrincipal.classList.remove("escondido");
  } catch (error) {
    console.log(error);
  }
}

btnBusca.addEventListener("click", api);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btnBusca.click();
  }
});
