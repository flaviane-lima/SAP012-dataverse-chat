
let ROUTES = {};
let rootEl;

const ERRORPATH = '/Error'

export const setRootEl = (el) => {
  // atribui rootEl
  console.log("setRootEl")
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
  ROUTES = routes;
}

// export const queryStringToObject = (queryString) => {
//   // convert query string to URLSearchParams
//   // convert URLSearchParams to an object
//   // return the object
// }
 const renderView = (pathname, props = {name: " ", id: ""}) => {
  console.log("renderView");
  //limpa o elemento raiz
  rootEl.innerHTML = "";

  let path = "";

  //encontra a visualização correta em ROUTES para o nome do caminho
  if(!pathname in ROUTES){
    path = pathname;
  }
  else{
    // caso não seja encontrado renderiza a view do erro
    path =  ERRORPATH
  }

  // renderiza a view correta passando o valor das props
 //adiciona o elemento view ao elemento raiz do DOM
  rootEl.appendChild(ROUTES[path](props));

  
} 

// export const navigateTo = (pathname, props={}) => {
//   // update window history with pushState
//   // render the view with the pathname and props
// }

export const onURLChange = (location) => {
  console.log("onURLChange");
  // analisa a localização do nome do caminho e dos parâmetros de pesquisa
  

  // converte os parâmetros de pesquisa em um objeto

 // renderiza a view com o caminho e o objeto
 renderView(location.pathname);
}