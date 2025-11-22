let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("header input");
let botaoBusca = document.querySelector("#botao-busca");

const API_URL = "https://api.scryfall.com";

async function buscarCards(nome) {
  // Se a busca estiver vazia, limpa os resultados
  if (!nome) {
    exibirMensagemInicial();
    return;
  }

  cardContainer.innerHTML = '<div class="loader"></div>'; // Mostra o loader

  try {
    // Usamos o endpoint de busca da Scryfall
    const resposta = await fetch(`${API_URL}/cards/search?q=${nome}`);
    if (!resposta.ok) {
      // Se a API retornar um erro (ex: card não encontrado), limpamos os resultados
      renderizarCards([]);
      return;
    }
    const dados = await resposta.json();
    renderizarCards(dados.data); // A API retorna os cards dentro de uma propriedade "data"
  } catch (error) {
    console.error("Erro ao buscar cards:", error);
    renderizarCards([]);
  }
}

function iniciarBusca() {
  let termoBusca = inputBusca.value;
  buscarCards(termoBusca);
  fecharListasAutocomplete();
}

function formatarCustoMana(manaCost) {
  if (!manaCost) return "";
  // A Scryfall usa a API Symbology para os ícones.
  // Ex: {W} -> https://svgs.scryfall.io/card-symbols/W.svg
  return manaCost
    .split(/({[^{}]+})/) // Divide a string por símbolos como {W}, {2}, {U/B}
    .filter(Boolean) // Remove strings vazias do array
    .map((symbol) => symbol.replace(/[{}]/g, "")) // Remove as chaves, ex: {W} -> W
    .map(
      (symbol) =>
        `<img src="https://svgs.scryfall.io/card-symbols/${symbol}.svg" alt="${symbol}" class="mana-symbol">`
    )
    .join("");
}

function renderizarCards(dados) {
  cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
  if (dados.length === 0 && inputBusca.value) {
    cardContainer.innerHTML =
      '<p class="mensagem-feedback">Nenhum card encontrado.</p>';
    return;
  }

  for (let dado of dados) {
    let article = document.createElement("article");
    article.classList.add("card");
    // Usamos a imagem do card e as informações retornadas pela API
    article.innerHTML = `
      <img src="${dado.image_uris?.normal}" alt="${
      dado.name
    }" class="card-image">
      <div class="card-content">
        <div class="card-header">
          <h2>${dado.name}</h2>
          <span class="mana-cost">
            ${formatarCustoMana(dado.mana_cost)}
          </span>
        </div>
        <p class="card-type">${dado.type_line}</p>
        <p class="card-text">${dado.oracle_text || ""}</p>
      </div>`;

    cardContainer.appendChild(article);
  }
}

function exibirMensagemInicial() {
  cardContainer.innerHTML = `
    <div class="welcome-message">
      <h2>Bem-vindo ao Buscador de Cards de Magic!</h2>
      <p>
        Magic: The Gathering é um jogo de cartas colecionáveis criado por Richard Garfield.
        Em Magic, você assume o papel de um planinauta que luta contra outros planinautas por glória,
        conhecimento e conquista. Seu baralho de cartas representa todas as armas em seu arsenal.
        Ele contém os feitiços que você conhece e as criaturas que você pode invocar para lutar por você.
      </p>
      <p>Use a barra de busca acima para encontrar seus cards favoritos.</p>
    </div>
  `;
}

function fecharListasAutocomplete() {
  let items = document.querySelector("#autocomplete-list");
  if (items) items.innerHTML = "";
}

inputBusca.addEventListener("input", async function () {
  let termoBusca = this.value;
  fecharListasAutocomplete();
  if (!termoBusca) {
    exibirMensagemInicial();
    return false;
  }

  // A Scryfall tem um endpoint específico para autocomplete
  try {
    const resposta = await fetch(
      `${API_URL}/cards/autocomplete?q=${termoBusca}`
    );
    const sugestoes = await resposta.json();
    let listaAutocomplete = document.querySelector("#autocomplete-list");

    sugestoes.data.forEach((sugestao) => {
      let item = document.createElement("div");
      item.innerHTML = `<strong>${sugestao.substring(
        0,
        termoBusca.length
      )}</strong>${sugestao.substring(termoBusca.length)}`;
      item.addEventListener("click", function () {
        inputBusca.value = sugestao;
        iniciarBusca();
      });
      listaAutocomplete.appendChild(item);
    });
  } catch (error) {
    console.error("Erro no autocomplete:", error);
  }
});

botaoBusca.addEventListener("click", iniciarBusca);
inputBusca.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    iniciarBusca();
  }
});

document.addEventListener("click", function (e) {
  if (e.target !== inputBusca) {
    fecharListasAutocomplete();
  }
});

exibirMensagemInicial(); // Exibe a mensagem inicial ao carregar a página
