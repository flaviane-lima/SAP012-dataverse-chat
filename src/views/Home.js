// src/views/Home.js

import { renderItems } from '../components/cards.js';
import data from '../data/dataset.js';
import { filterBy, computeStats, sortBy } from '../lib/dataFunctions.js';
import { renderListClassification } from '../components/estatistica.js';
let dadosExibidos = data;


export default function home() {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `<section class="menu">
<section id="filtro">
  <label for="streaming">Filtrar por</label>
  <select data-testid="select-filter" id="streaming" name="streaming">
    <option value=""></option>
    <option value="Netflix">Netflix</option>
    <option value="Crunchyroll">Crunchyroll</option>
    <option value="Star+">Star+</option>
  </select>
</section>

<section id="ordem">
  <label for="ordenacao">Ordenar</label>
  <select data-testid="select-sort" id="ordenacao" name="name">
    <option value=""></option>
    <option value="asc">A - Z</option>
    <option value="desc">Z - A</option>
  </select>
</section>

<button id="limpar-filtro" data-testid="button-clear">Limpar</button>
</section>

<details class="meu-menu">
<summary>Confira as Estatísticas</summary>
<section class="estatisticas"></section>
</details>

<main>
<h2>Deseja saber mais sobre animes?</h2>
<section id="caixa-card"></section>
</main>`;

  
  //neste caso está redenrisando o cartão não foi preciso o uso  do addEventListener
  const exibirCartao = viewEl.querySelector('#caixa-card');
  exibirCartao.appendChild(renderItems(data))

  //filtrar os card

  const botaoFiltra = viewEl.querySelector('#streaming');

  botaoFiltra.addEventListener('change', (event) => {

    const valorFiltro = event.target.value;

    dadosExibidos = filterBy(data, 'streaming', valorFiltro)
    exibirCartao.innerHTML = ""  //apaga a lista antiga
    exibirCartao.appendChild(renderItems(dadosExibidos)) //renderisa uma nova lista
  })

  // botão de limpar
  const limparBotao = viewEl.querySelector('#limpar-filtro');

  limparBotao.addEventListener('click', () => {
    exibirCartao.innerHTML = ""; //apaga a lista antiga
    ordenacao.value = "";
    botaoFiltra.value = "";
    exibirCartao.appendChild(renderItems(data)) //redenrisa a nova lista
  })

  //ordenar os cards
  const ordenacao = viewEl.querySelector('#ordenacao');

  ordenacao.addEventListener('change', (event) => {
    const valorOrdenacao = event.target.value;
    const valorOrdenado = sortBy(dadosExibidos, 'name', valorOrdenacao)
    exibirCartao.innerHTML = "" //apaga a lista antiga
    exibirCartao.appendChild(renderItems(valorOrdenado)) //redenrisa a nova lista

  })
  //estatistica
  const classificationList = viewEl.querySelector('.estatisticas');
  classificationList.appendChild(renderListClassification(computeStats(data)));

  //modal
  window.closeModal = (id) => {
    const modal = viewEl.querySelector("#modal-" + id);
    modal.style.display = "none";
  }
  window.openModal = (id) => {
    const modal = viewEl.querySelector("#modal-" + id);
    modal.style.display = "block";
    // Criar e adicionar o elemento de fundo transparente
    const overlay = viewEl.createElement('div');
    overlay.classList.add('modal-overlay');
    viewEl.body.appendChild(overlay);

    // Adicionar um evento de clique ao overlay para fechar o modal
    overlay.addEventListener('click', () => {
      window.closeModal(id);
      viewEl.body.removeChild(overlay); // Remover o overlay quando o modal for fechado
    });
  }

  //para fazer conexão com o chat 
  const botoesChat = viewEl.getElementsByClassName('chat');

  for (let index = 0; index < botoesChat.length; index++) {
    const botao = botoesChat[index];
    botao.addEventListener('click', (event) =>{
      const animeId = event.target.dataset.id;
      // const props = {id:animeId};
      window.location.href = window.location.origin + '/chat-individual?id=' + animeId;
      // window.navigateToPage('/Chat', props);
    });
  }
  

  return viewEl;


}



