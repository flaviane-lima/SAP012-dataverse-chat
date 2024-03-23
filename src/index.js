// En este archivo definirás tus rutas e importarás los componentes que vas a renderizar.

// ... import other views
import home from './views/Home.js';
import chaveApi from './views/chaveApi.js';
import error from './views/error.js';
import chatIndividual from './views/chatIndividual.js';
// import chatGrupo from './views/chatgrupo.js';


//... import das funções do router
import { setRootEl, setRoutes, onURLChange } from './router.js';

// Defina suas rotas e suas visualizações associadas
const routes = {
  "/": home,
  "/chave-api": chaveApi,
  // '/chat-grupo' : chatGrupo,
  "/chat-individual": chatIndividual,
  "/error": error,
};



// Defina o elemento raiz onde as visualizações serão renderizadas
const rootElement = document.getElementById('root')

window.addEventListener("DOMContentLoaded", () => {
  //referência ao elemento HTML que é definido como elemento raiz.
  setRootEl(rootElement);
  //está lidando com mudança url após o carregamento completo do documento HTML.
  onURLChange(window.location);
});


// Atribuir as rotas
setRoutes(routes);