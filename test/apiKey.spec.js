//test/apiKey.spec.js

import { getApiKey, setApiKey, removeApiKey } from '../src/lib/apiKey.js';

const mockApiKey = "123abc";

const APIKEY = "chave-api";

describe('ApiKey Functions', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  it('Deve definir corretamente o valor da chave API', () => {
    
    setApiKey(mockApiKey);

    expect(localStorage.getItem(APIKEY)).toEqual(mockApiKey);
  });

  it('Deve retornar o valor da chave API', () => {
    
    localStorage.setItem(APIKEY, mockApiKey);

    expect(getApiKey()).toEqual(mockApiKey);
  });

  it('Deve remover o valor da chave API', () => {
   
    localStorage.setItem(APIKEY, mockApiKey);
    removeApiKey();

    expect(localStorage.getItem(APIKEY)).toBeNull();
  });
});







