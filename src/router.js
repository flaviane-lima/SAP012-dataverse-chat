let ROUTES = {};
let rootEl;

const ERRORPATH = '/error'

export const setRootEl = (el) => {
  
  if (typeof el !== 'object'){
    throw new Error('root el precisa ser um objeto')
  }
  // atribui rootEl
  rootEl = el;

}


export const setRoutes = (routes) => {
  // optional Throw errors if routes isn't an object
  if (typeof routes !== 'object') {
    throw new Error('As rotas devem ser um objeto');
  }
  // optional Throw errors if routes doesn't define an /error route
  if (!routes[ERRORPATH]) {
    throw new Error('As rotas devem definir uma rota /error');
  }
  // assign ROUTES
  ROUTES = routes; //recebendo as rotas
}

const queryStringToObject = (queryString) => {
  
  // converter string de consulta em URLSearchParam
  // converter URLSearchParams em um objeto
  // devolver o objeto
  const urlParametros = new URLSearchParams(queryString);
  return Object.fromEntries(urlParametros.entries());
  
}

const renderView = (pathname, props = { name: " ", id: "" }) => {

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

export const navigateTo = (pathname, props = {}) => {
  // atualizar o histórico da janela com pushState
  // renderize a visualização com o nome do caminho e adereços
  const url = new URL(location);
  
  url.pathname = pathname;
  url.search = new URLSearchParams(props).toString();
  history.pushState({}, "", url);
  renderView(pathname, props);
}

export const onURLChange = (location) => {
  // console.log('Search:', location.search);
  // console.log('Pathname:', location.pathname);
  // console.log(rootEl,renderView);
  // analisa a localização do nome do caminho e dos parâmetros de pesquisa e converte os parâmetros de pesquisa em um objeto
  const props = queryStringToObject(location.search);
 
  // renderiza a view com o caminho e o objeto
  renderView(location.pathname, props);
}