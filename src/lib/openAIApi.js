// src/lib/openAIApi.js

// Importa la función para obtener la API KEY desde apiKey.js
import { getApiKey } from '../lib/apiKey.js';

export function handleAPIError(response) {
  let errorMessage = 'Ocorreu um erro ao interagir com a API.';

  if (response && response.status === 429) {
    errorMessage = 'Você atingiu a cota de tokens por minuto. Por favor, aguarde um momento antes de tentar novamente.';
  } else {
    errorMessage += ' Por favor, tente novamente mais tarde.';
  }

  return errorMessage
}


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
    const response = await fetch(url, req);
   
    if (!response.ok) {
      const errorMessage= handleAPIError(response);
      throw new Error(errorMessage);
    }
   
    const data = await response.json();
  
    return data;
  } catch (error) {
    // handleAPIError(error);
    throw new Error('Falha na conexão com a Api');
  }
};



