// //estrutura do chat em grupo

// import data from "../data/dataset.js";
// import { communicateWithOpenAI } from "../lib/openAIApi.js";

// export default function chatGrupo() {
//   document.title = "Chat em grupo";
//   // const dataAnime = filterById(data, props["id"]);
//   console.log(data[0].extraInfo);
  
//   const viewEl = document.createElement('div');

//   data.forEach((item) => {
//     viewEl.innerHTML += `
//     <div class="chat-group">
//       <section>
//         <div class="chat-container">
//           <figure class="chat-imagem">
//             <img class="imgAnime" src="${item.extraInfo.characters.image}" title="imagem ${item.extraInfo.characters.characterName}protagonista do ${item.name}">
//           </figure>
//           <div>
//             <h5 class="nomeAnime"><span>${item.extraInfo.characters.characterName}</span></h5>
//             <p> ${item.extraInfo.characters.personality}</p>
//           </div>
//         </div>
//         <div class="conversação">
//           <ul id="chat-menssagem">
//           </ul>
//         </div>
//         <div class="chat-respondendo" style="display:none">${item.extraInfo.characters.characterName} esta digitando... ></div>
//       </section>
      
//     </div>`;

//   })
//   viewEl.innerHTML += 
//   `<div class="input-button">
//         <input type="text" class="chat-input" id="message-input" placeholder="digite uma mensagem">
//         <button class="envio">enviar</button>
//   </div>`

 

//   const chatRespondendo = viewEl.querySelector('.chat-respondendo');
//   const inputButton = viewEl.querySelector('.chat-input');
//   let menssagens = [];

//   const envioDeMenssagem = (event) => {
//     event.preventDefault();
//     const resposta = inputButton.value;
//     const ul = viewEl.querySelector('#chat-menssagem');
//     const li = document.createElement('li');
//     li.classList.add('mensagem-enviada');
//     li.innerHTML = `<span>${resposta}</span>`;
//     ul.appendChild(li);
//     inputButton.value = "";

//     chatRespondendo.style.display = "block";

//     data.forEach((item) => {
//       if (menssagens.length === 0) {
//         menssagens = [{
//           "role": "system",
//           "content": `a partir de agora responda a tudo que eu disser nesta conversa como se fosse ${item.extraInfo.characters.characterName} do anime ${dataAnime.name}. Considere a seguinte personalidade: ${dataAnime.extraInfo.characters.personality}`
//         }];
//       }
  
//       menssagens.push({
//         "role": "user",
//         "content": resposta
//       });

//     })

   

//     Promise.all([
//       communicateWithOpenAI(menssagens),
//       communicateWithOpenAI(menssagens),
//       communicateWithOpenAI(menssagens)
//     ]).then(responses => {
//       responses.forEach(assistentAnswer => {
//         const choice = assistentAnswer?.choices?.[0];
//         const assistantMessage = choice?.message?.content?.trim();

//         if (assistantMessage) {
//           const message = {
//             role: "assistant",
//             content: assistantMessage
//           };

//           menssagens.push(message);
//           chatRespondendo.style.display = "none";

//           const liSegundo = document.createElement('li');
//           liSegundo.classList.add('mensagem-resposta');
//           liSegundo.innerHTML = `<span>${assistantMessage}</span>`;
//           ul.appendChild(liSegundo);
//         } else {
//           console.error("Resposta do assistente inválida:", assistentAnswer);
//         }
//       });
//     }).catch(error => {
//       console.error("Erro ao comunicar com OpenAI:", error);
//     });
//   }

//   viewEl.querySelector('.envio').addEventListener("click", envioDeMenssagem);

//   return viewEl;
// }
