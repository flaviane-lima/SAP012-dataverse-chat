import { filterBy, sortBy, computeStats, filterById } from '../src/lib/dataFunctions.js';
import { data as fakeData, mockCrescente, mockDecrescente } from './data.js';


describe('filterById', () => {
  //será feito um array data ficticio
  const data =[
    {id : 1, extraInfo: {characters: {characterName: 'Nome1'}}},
    {id : 2, extraInfo: {characters: {characterName: 'Nome2'}}},
    {id : 3, extraInfo: {characters: {characterName: 'Nome3'}}}
  ];
  it('vai filtrar os nome dos animes pelo Id do anime ', () => { 
    const value = 2; //vai filtrar pelo ID que quero filtrar 

    const result = filterById(data,value);

    // Verifica se o objeto retornado tem o ID correto
    expect(result.id).toEqual(value);
    // Verifica se o nome do personagem está correto
    expect(result.extraInfo.characters.characterName).toBe("Nome2");
  });
  
});

describe('filterBy', () => {
  it('filtra dados por plataforma de streaming', () => {
    fakeData.length;

    const filteredData = filterBy(fakeData, 'streaming', 'Netflix');
    expect(filteredData.every(item => item.extraInfo.streaming === 'Netflix')).toBe(true);
  });
  it('filtra dados por plataforma de streaming Crunchyroll', () => {
    const filteredData = filterBy(fakeData, 'streaming', 'Crunchyroll');
    expect(filteredData.every(item => item.extraInfo.streaming === 'Crunchyroll')).toBe(true);
  });
  it('filtra dados por plataforma de streaming Star+', () => {
    const filteredData = filterBy(fakeData, 'streaming', 'Star+');
    expect(filteredData.every(item => item.extraInfo.streaming === 'Star+')).toBe(true);

  });
  it('Retornar array vazio quando não há correspondências', () => {
    const filteredData = filterBy(fakeData, 'streaming', 'Disney+');
    expect(filteredData.length).toBe(0);
  });

});
describe('computeStats', () => {
  it('Calculando as estatisticas de acordo com a classificação', () => {
    const resultado = computeStats(fakeData);
    const resultadoEsperado = {
      L: 20.0,
      A12: 20.0,
      A14: 20.0,
      A16: 40.0,
    }
    expect(resultado).toEqual(resultadoEsperado);
  });
  it('A soma das porcentagens deve ser 100', () => {
    const resultado = computeStats(fakeData);
    let somaPorcentagens = 0;
    for (const classificacao in resultado) {
      somaPorcentagens += resultado[classificacao];
    }
    expect(somaPorcentagens).toBe(100);
  })
});

describe('sortBy', () => {

  it('ordenação de dados pelos os anime de A-Z', () => {
    const ordenarData = sortBy(fakeData, 'name', 'asc')

    expect(ordenarData).toStrictEqual(mockCrescente);
  });
  it('ordenação de dados pelos os animes de Z-A', () => {
    const ordenarData = sortBy(fakeData, 'name', 'desc')
    expect(ordenarData).toStrictEqual(mockDecrescente);
  })
});




