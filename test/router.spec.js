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
      // "/chat-individual": chatIndividual,
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

//teste para onURLChange
describe('onURLChange', () => {

  beforeAll(() => {
    //criando um novo elemento "div", para redenrizar as visuaslizações durante os testes.
    rootEl = document.createElement('div');
    setRootEl(rootEl);

    //está adicionado novos elementos recém-criado ao corpo do documento HTML.
    document.body.appendChild(rootEl);

    //criando um "spay" que é um tipo de espião 
    // renderView = jest.fn();
    // queryStringToObject = jest.fn();

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
        
        console.log("teste");
        const div = document.createElement("div");
        div.innerHTML = "chat-individual";
        return div;
      }
    };


    ROUTES = routes;
  });

  //está para limpar o ambiente do teste e restaura as funções "espionadas" ("spy").
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













