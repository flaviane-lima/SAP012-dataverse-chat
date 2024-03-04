// En este archivo definirás tus rutas e importarás los componentes que vas a renderizar.

// ... import other views
import home from './views/Home.js';
import chaveApi from './views/ChaveApi.js';
import error from './views/error.js';


//... import das funções do router
import { setRootEl, setRoutes, onURLChange } from './router.js';

// Defina suas rotas e suas visualizações associadas
const routes = {
  "/": home,
  "/ChaveApi": chaveApi,
  // '/chatEmGrupo' : ChatEmGrupo,
  "/Error": error,
};



// Defina o elemento raiz onde as visualizações serão renderizadas
const rootElement = document.getElementById('root')

window.addEventListener("DOMContentLoaded", () => {
  setRootEl(rootElement);
  onURLChange(window.location);
});

// // Lidar com alterações de URL
// window.addEventListener('popstate', ({objetivo}) => {
//     onURLChange(/* location */);
//  });

// Atribuir as rotas
setRoutes(routes);