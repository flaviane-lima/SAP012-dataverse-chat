// src/lib/openAIApi.js

// Importa la función para obtener la API KEY desde apiKey.js
import { getApiKey } from '../lib/apiKey.js';


export const communicateWithOpenAI =  async  (messages) => {
   //É aqui que você deve implementar a solicitação com fetch ou axios
   const url = 'https://api.openai.com/v1/chat/completions';
   const api = "Bearer " + getApiKey();
   console.log('Iniciando solicitação à API...');
const req = {
   method: 'POST',
   headers: {
   'Content-Type': 'application/json',
   'Authorization': api
   },
   body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages
   }),
 }
 console.log(req);
 try{
   const options = await fetch(url,req);
   console.log('Solicitação concluída, verificando status...');
if(!options.ok){
   throw new Error('Falha na conexão com a API');
}
console.log('Status da solicitação OK, aguardando resposta JSON...');
const data = await options.json();
console.log('Resposta JSON recebida com sucesso:', data);
return data;
}catch(error){
   console.error('Ocorreu um erro:', error.messages);
   throw error;
}
};



