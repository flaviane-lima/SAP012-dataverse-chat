// src/lib/apiKey.js

export const getApiKey = () => {
  // Implemente o código para obter a API KEY do armazenamento local, obtém a API KEY.
  const apiKey = localStorage.getItem('chave-api')

  
  return apiKey;

};

export const setApiKey = (key) => {

  // Implemente o código para salvar a API KEY no armazenamento local
  localStorage.setItem('chave-api', key); //ela já está salva pois localStorage.setItem já faz isso
};

export const removeApiKey = () => {
  localStorage.removeItem('chave-api');
}
