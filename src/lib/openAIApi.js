// src/lib/openAIApi.js

// Importa la función para obtener la API KEY desde apiKey.js
import { getApiKey } from '../lib/apiKey.js';


export const communicateWithOpenAI = async (messages) => {
  //É aqui que você deve implementar a solicitação com fetch ou axios
  const url = 'https://api.openai.com/v1/chat/completions';
  const api = "Bearer " + getApiKey();
 
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
  
  try {
    const options = await fetch(url, req);
   
    if (!options.ok) {
      throw new Error('Falha na conexão com a API');
    }
   
    const data = await options.json();
  
    return data;
  } catch (error) {
    
    throw new Error('Falha na conexão com a Api');
  }
};



