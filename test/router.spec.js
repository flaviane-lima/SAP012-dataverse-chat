import { setRootEl, setRoutes, navigateTo } from '../src/router';


describe('setRootEl', () => {
  it('deve retornar erro se root element não for objeto', () => {
    const fakeRootEl = "testando o elemento";


    // Verifique se a propriedade rootEl foi definida corretamente
    expect(() => setRootEl(fakeRootEl)).toThrow('root el precisa ser um objeto');
  });
  it('deve retornar o  objeto', () => {
    const fakeRootEl = document.createElement('div');


    // Verifique se a propriedade rootEl foi definida corretamente
    expect(() => setRootEl(fakeRootEl)).not.toThrow('root el precisa ser um objeto');
  });
});

describe('setRoutes', () => {
  it('lança um erro se routes não for um objeto', () => {
    expect(() => {
      setRoutes('not an object');
    }).toThrow('As rotas devem ser um objeto');
  });

  it('lança um erro se routes não define uma rota /error', () => {
    expect(() => {
      setRoutes({});
    }).toThrow('As rotas devem definir uma rota /error');
  });

  it('atribui corretamente as rotas', () => {
    const routes = {
      "/": () => {
        const div = document.createElement("div");
        div.innerHTML = "Home";
        return div;
      },
      "/error": () => {
        const div = document.createElement("div");
        div.innerHTML = "error";
        return div;
      } 
      // "/chave-api": chaveApi,
      // '/chat-grupo' : chatGrupo,
      // "/chat-individual": chatIndividual,
      // "/error": error,
    };

    expect(() => setRoutes(routes)).not.toThrow('As rotas devem definir uma rota /error');
  });
});

//teste da função da navigetoTo
describe('NavigateTo', () => {
  //Apenas verificar history.pushState garante que navigateTo está atualizando o histórico e, 
  //consequentemente, chamando renderView.
  let originalPushState;

  beforeAll(() => {
    const mockHistory = {
      pushState: jest.fn(),
    };
    originalPushState = window.history.pushState;
    Object.defineProperty(window, 'history', {
      value: mockHistory,
    });
  });

  afterAll(() => {
    window.history.pushState = originalPushState;
  });

  it('deve atualizar o histórico da janela com os argumentos corretos', () => {
    const pathname = '/pagina';
    const props = { id: 1 };

    navigateTo(pathname, props);

    expect(window.history.pushState).toHaveBeenCalledWith({}, "", new URL(pathname, location.toString()));
  });
});





// describe('requerObjeto', () => {
//   it('deve retornar uma propriedade nome', () => {
//     const queryString = 'nome = exemplo'
//     const resultado= queryStringToObject(queryString)
//     expect(resultado).toHaveProperty('nome');
//   });

//   test('deve retornar um objeto sem a propriedade nome', () => {
//     const queryString = 'sobrenome = exemplo'
//     const resultado = queryStringToObject(queryString)
//     expect(resultado).not.toHaveProperty('nome');
//   });
// });

