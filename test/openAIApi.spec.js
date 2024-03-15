import { communicateWithOpenAI } from "../src/lib/openAiApi";
/* eslint-disable */
// global.fetch = jest.fn().mockResolvedValue({
//     status: 200, json: jest.fn().mockResolvedValue({})
// });
describe('Testes de integração com OpenAi', () => {
  it('Testa se existe falha na comunicação com a API', async () => {
    const mockMessages = [{ role: 'user', content: 'Olá' }];
    const mockError = new Error('Falha na conexão com a Api');
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });
    await expect(communicateWithOpenAI(mockMessages)).rejects.toThrow(mockError);
  });
  it('Testa se existe sucesso na comunicação com Api', async () => {
    const mockMessages = [{ role: 'user', content: 'Olá' }];
    const mockData = { choices: [{ message: { content: 'Olá, como vai?' } }] }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });
    const response = await communicateWithOpenAI(mockMessages);
    expect(response).toEqual(mockData);
  });
  it('Testa se existe falha ao analisar a resposta da API', async () => {
    const mockMessages = [{ role: 'user', content: 'Olá' }];
    const mockResponse = { ok: true, json: () => Promise.reject(new Error('Erro ao analisar resposta')) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    await expect(communicateWithOpenAI(mockMessages)).rejects.toThrow('Falha na conexão com a Api');
  });
  it('Testa se existe falha ao fornecer mensagens inválidas', async () => {
    const mockMessages = []; // Mensagens vazias
    const mockError = new Error('Falha na conexão com a Api');
    await expect(communicateWithOpenAI(mockMessages)).rejects.toThrow(mockError);
  });
});