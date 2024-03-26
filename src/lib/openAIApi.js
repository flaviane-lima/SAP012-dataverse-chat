// src/lib/openAIApi.js

// Importa la función para obtener la API KEY desde apiKey.js
import { getApiKey } from '../lib/apiKey.js';
// import { handleAPIError } from '../lib/apiKey.js';


export const communicateWithOpenAI = async (messages) => {
  //define a URL do endpoint da API OpenAI para solicitar completions de chat.
  const url = 'https://api.openai.com/v1/chat/completions';

  //criando um cabeçalho de autorização para ter acesso a recursos da API
  const api = "Bearer " + getApiKey();
  
  //está contendo detalhes da requisição HTTP
  const req = {
    method: 'POST', //indicando que estás enviando dados para o sevidor
    headers: {
      'Content-Type': 'application/json',
      'Authorization': api
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      max_tokens: 1500,
      temperature: 0.7,
      messages //contens as entradas para geração  de texto pelo API
    }),
  }
  
  try {
    const options = await fetch(url, req);
   
    if (!options.ok) {
      throw new Error('Falha na conexão com a API');
    }
   
    const data = await options.json();
  
    return data;
  } catch (error) {
    // handleAPIError(error);
    throw new Error('Falha na conexão com a Api');
  }
};



