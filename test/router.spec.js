import { setRootEl, setRoutes, navigateTo} from '../src/router';
const ERRORPATH = '/error'
let rootEl;
let ROUTES;
const routerFunctions = {
  renderView: (pathname, props = { name: " ", id: "" }) => {

    //limpa o elemento raiz
    rootEl.textContent = "";

    let path = "";

    //encontra a visualização correta em ROUTES para o nome do caminho
    if (pathname in ROUTES) {
      path = pathname;
    }
    else {
      // caso não seja encontrado renderiza a view do erro
      path = ERRORPATH
    }

    // renderiza a view correta passando o valor das props
    //adiciona o elemento view ao elemento raiz do DOM
    rootEl.appendChild(ROUTES[path](props));


  }
};
describe('setRootEl', () => {
  it('deve retornar erro se root element não for objeto', () => {
    //argumento invalido para a função.
    const fakeRootEl = "testando o elemento";


    //esperando que ao chamar o setRootEl com fakeRootEl lance um erro.
    //pois o fakeRootEl é uma string e não objeto.
    expect(() => setRootEl(fakeRootEl)).toThrow('root el precisa ser um objeto');
  });
  it('deve retornar o  objeto', () => {
    //criando uma 'div'
    const fakeRootEl = document.createElement('div');


    //esperando que não lance um erro
    expect(() => setRootEl(fakeRootEl)).not.toThrow('root el precisa ser um objeto');
  });
});

describe('setRoutes', () => {
  it('lança um erro se routes não for um objeto', () => {
    expect(() => {
      setRoutes('não é um objeto');
    }).toThrow('As rotas devem ser um objeto');
  });

  it('lança um erro se routes não for um objeto e define uma rota /error', () => {
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
      // "/chat-individual": chatIndividual,
    };
    //ele espera que não seja lançado uma mensagem defina rota error
    //esperando que seja um objeto.
    expect(() => setRoutes(routes)).not.toThrow('As rotas devem definir uma rota /error');
  });
});

//teste da função da navigetoTo
describe('NavigateTo', () => {
  //Apenas verificar history.pushState garante que navigateTo está atualizando o histórico e, 
  //consequentemente, chamando renderView.

  //armazena originalmente o método pushState
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

//teste para onURLChange
describe('onURLChange', () => {

  beforeAll(() => {
    //criando um novo elemento "div", para redenrizar as visuaslizações durante os testes.
    rootEl = document.createElement('div');
    setRootEl(rootEl);

    //está adicionando novos elementos recém-criado ao corpo do documento HTML.
    document.body.appendChild(rootEl);

    //simulando as rotas e criando elementos para a rota..
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
      },
      // "/chat-individual": chatIndividual,
      "/chat-individual": () => {
        
        const div = document.createElement("div");
        div.innerHTML = "chat-individual";
        return div;
      }
    };

    //atribuição das rotas.
    ROUTES = routes;
  });

  //está limpando o ambiente do teste 
  afterAll(() => {
    document.body.removeChild(rootEl);
    // renderView();
    // queryStringToObject();
  });

  it('deve renderizar a visualização individual do chat com os parâmetros de consulta corretos', () => {
    const spyRenderView = jest.spyOn(routerFunctions, 'renderView');
    //Simula o clique em um anime com ID 'death-note'
    const location = {
      pathname: '/chat-individual',
      search: '?id=death-note' //Simula o parâmetro de consulta para 'death-note'
    };

    //Atualiza o ID em queryStringToObjectSpy para corresponder ao anime clicado
    const queryStringToObject = (queryString) => {

      const params = new URLSearchParams(queryString);
      const id = params.get('id') || 'defaultId';
      return { id };
    };

    const props = queryStringToObject(location.search);
    
    routerFunctions.renderView(location.pathname, props);
  
    expect(props).toEqual({ id: 'death-note' });
    expect(spyRenderView).toHaveBeenCalledWith('/chat-individual', { id: 'death-note' });
    
    
  });
});













