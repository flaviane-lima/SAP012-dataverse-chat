//estrutura do chat individual
import { filterById } from "../lib/dataFunctions.js";
import data from "../data/dataset.js";
import { communicateWithOpenAI } from "../lib/openAIApi.js";

export default function chatIndividual(props) {
  document.title = "Chat individual";

  const dataAnime = filterById(data, props["id"]);

  const viewEl = document.createElement('div'); // Definir viewEl antes de usá-lo
  viewEl.id = 'chat-individual-container'
  

  viewEl.innerHTML = `
  <div class="chat-individual">
    <section>
    <div class="chat-container">
      <figure class="chat-imagem">
        <img class="imgAnime"  src="${dataAnime.extraInfo.characters.image}"  title="imagem ${dataAnime.extraInfo.characters.characterName}protagonista do ${dataAnime.name}">
      </figure>
      <div>
      <h5 class="personagem"><span>${dataAnime.extraInfo.characters.characterName}</span></h5>
      <p class="personalidade"> ${dataAnime.extraInfo.characters.personality}</p>
      </div>
      </div>
      <div class="conversação">
      <ul id="chat-menssagem">
      </ul>
      </div>
      <div class="chat-respondendo" style="display:none">${dataAnime.extraInfo.characters.characterName} esta digitando... ></div>
    </section>
    <div class="input-button">
    <input type="text" class="chat-input" id="message-input" placeholder="digite uma mensagem">
    <button class="envio">enviar</button>
    </div>
  </div>`;

  const chatRespondendo = viewEl.querySelector('.chat-respondendo');

  const inputButton = viewEl.querySelector('.chat-input');

  //para recebeber uma lista de objetos vazios
  let menssagens = [];

  //função de enviar e receber menssagem
  const envioDeMenssagem = (event) => {
    event.preventDefault();
    const resposta = inputButton.value;

    //capturar uma ul
    const ul = viewEl.querySelector('#chat-menssagem');
    //criar li dinamicamente
    const li = document.createElement('li');
    //criando uma classe
    li.classList.add('mensagem-enviada');
    //recebendo conteudo do input
    li.innerHTML = `<span>${resposta}</span>`;
    ul.appendChild(li);
    inputButton.value = "" //limpa


    //para bloquear o nome digitando
    chatRespondendo.style.display = "block";

    //if para mensagem iniciar com system
    if (menssagens.length === 0) {
      menssagens = [{
        "role": "system",
        "content": `a partir de agora responda a tudo que eu disser nesta conversa como se fosse ${dataAnime.extraInfo.characters.characterName} do anime ${dataAnime.name}. Considere a seguinte personalidade: ${dataAnime.extraInfo.characters.personality}`
      }];

    }
    // console.log(typeof menssagens);
    menssagens.push({
      "role": "user",
      "content": resposta
    });

    //integrar com openAI
    communicateWithOpenAI(menssagens).then(assistentAnswer => {
      // console.log("Resposta da OpenAI:", assistentAnswer); // Adicione este console.log

      const choice = assistentAnswer?.choices?.[0];
      const assistantMessage = choice?.message?.content?.trim();

      if (assistantMessage) {
        const message = {
          role: "assistant",
          content: assistantMessage
        };

        menssagens.push(message);

        chatRespondendo.style.display = "none"; //aparece digitando


        // Exibir a mensagem na interface do usuário
        // const chatMensagens = document.getElementById('chat-menssagem');
        const liSegundo = document.createElement('li');
        liSegundo.classList.add('mensagem-resposta');
        liSegundo.innerHTML = `<span>${assistantMessage}</span>`;
        ul.appendChild(liSegundo);
      } else {
        console.error("Resposta do assistente inválida:", assistentAnswer);
      }
    }).catch(error => {
      console.error("Erro ao comunicar com OpenAI:", error);
    });


  }

  //evento de click do botão de enviar
  viewEl.querySelector('.envio').addEventListener("click", envioDeMenssagem);


  return viewEl;
}