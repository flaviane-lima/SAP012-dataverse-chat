export const renderItems = (data) => {
  const cartoes = document.createElement('ul');
  cartoes.classList.add('cartoes');
 
  data.forEach((item) => {
    const ratingValue = parseFloat(item.extraInfo.assessment);
    const fullStars = Math.floor(ratingValue);
    const emptyStars = 5 - fullStars;
    
    const ratingStars = '\u2605'.repeat(fullStars)  + '\u2606'.repeat(emptyStars);

    cartoes.innerHTML += `
    <li class="cartao" itemscope itemtype="${item.id}">
      <section class="info-externa">
        <p class="classificacao cl-${item.extraInfo.classification}"><span itemprop="classification">${item.extraInfo.classification}</span></p>
        <figure class="container-img"> <img class"imgAnime" itemprop="imageUrl" src="${item.imageUrl}"  title="${item.name}"></figure>
        <h5 class="nomeAnime"><span itemprop="name">${item.name}</span></h5>
        <p class="avaliacao"><span itemprop="assessment">${ratingValue}</span> ${ratingStars}</p>
        <p class="temporadasPlataforma"><span itemprop="seasons">${item.extraInfo.seasons}</span> Temporada${(item.extraInfo.seasons>1)?'s':''} - <span itemprop="streaming">${item.extraInfo.streaming}</span></p>
        <button class="botaoModal" onclick="openModal('${item.id}')">Curiosidades</button>
        <button class="chat" onclick="">Chat</button>
      </section>
      <section class="curiosidades" id="modal-${item.id}">
        <span class="close" onclick="closeModal('${item.id}')">&times;</span>
        <h6 class="genero"><span itemprop="shortDescription">${item.shortDescription}</span ></h6 >
        <p class="descricao"><span itemprop="description">${item.description}</span></p>
        <p class="episodios">Episódios: <span class="valor" itemprop="episodes">${item.extraInfo.episodes}</span></p>
        <p class="musica">Canção: <span class="valor" itemprop="song">${item.extraInfo.song.join(", ")}</span></p>
        <p class="criador">Criador: <span class="valor" itemprop="creator">${item.facts.creatorOfManga}</span></p>
        <p class="produtor">Produtor: <span class="valor" itemprop="producer">${item.facts.producerOfManga}</span></p>
        <p class="studio">Studio: <span class="valor" itemprop="studio">${item.facts.studioOfManga}</span></p>
      </section >
    </li >
  `;
  })
  return cartoes;
};

