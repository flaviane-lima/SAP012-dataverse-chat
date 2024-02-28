// En este archivo definirás tus rutas e importarás los componentes que vas a renderizar.
import Error from './views/Error.js';

import Home from './views/Home.js';
// ... import other views
import { setRootEl, setRoutes, onURLChange } from './router.js';

// Defina suas rotas e suas visualizações associadas
const routes = {
  "/": Home,
  // '/chatIndividual': ChatIndividual,
  // '/chatEmGrupo' : ChatEmGrupo,
  "/error": Error,
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