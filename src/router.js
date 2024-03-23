let ROUTES = {};
let rootEl;

const ERRORPATH = '/error'

export const setRootEl = (el) => {
  //está verificando se o el é um objeto, se não for vai mostrar o error.
  if (typeof el !== 'object'){
    throw new Error('root el precisa ser um objeto')
  }
  // o el sendo um objeto ele atribui ao rootEl, está fazendo referência a um elemento HTML.
  rootEl = el;

}


export const setRoutes = (routes) => {
  // lança um erro se não for um objeto.
  if (typeof routes !== 'object') {
    throw new Error('As rotas devem ser um objeto');
  }
  
  //se esse routes não tiver uma palavra-chave ERRORPATH
  if (!routes[ERRORPATH]) {
    // lança erro se não for definido uma rota error
    throw new Error('As rotas devem definir uma rota /error');
  }
  //atribuindo rotas
  ROUTES = routes; 
}

const queryStringToObject = (queryString) => {
  //criando um novo objeto a partir do argumento queryString
  const urlParametros = new URLSearchParams(queryString);

  //aqui está convertendo pares/chaves em um objeto com o object
  //entrie está percorrendo todos os pares/chaves
  return Object.fromEntries(urlParametros.entries());
  
}

const renderView = (pathname, props = { name: " ", id: "" }) => {

  //limpa o elemento raiz
  rootEl.textContent = "";
  //vai armazenar o caminho da URL
  let path = "";

  //verificando se o pathname está presente no objeto routes.
  if (pathname in ROUTES) {
    //se tiver atribui o pathaname ao path
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
  // aqui está criando um novo objeto URL
  const url = new URL(location);

  //está atualizando o novo objeto com base na url atual
  url.pathname = pathname;
  
  //atualizando a parte consulta
  url.search = new URLSearchParams(props).toString();

  //adiciona uma nova entrada ao navegado e atualiza a página
  history.pushState({}, "", url);

  //ele renderiza a nova vizualização usando como base o pathname e o props
  renderView(pathname, props);
}

export const onURLChange = (location) => {
  
  // analisa a localização do nome do caminho e dos parâmetros de pesquisa e converte os parâmetros de pesquisa em um objeto
  const props = queryStringToObject(location.search);
 
  // renderiza a view com o caminho e o objeto
  renderView(location.pathname, props);
}