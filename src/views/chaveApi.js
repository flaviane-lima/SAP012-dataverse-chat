import { getApiKey, setApiKey, removeApiKey } from "../lib/apiKey.js";


export default function chaveApi(props) {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `<main>
  <h3>Administrador de chave de API</h3>
  <P>A partir daqui você pode gerenciar a chave de API a ser usada</P>
  <label for="chave"></label>
  <input type="text" id="chave" name="chave" maxlength="53" required>
  <button id="salvarOuDeletarChave" type="button">Salvar</button>
</main>`;

const button = viewEl.querySelector('#salvarOuDeletarChave'); // Use querySelector em vez de getElementById
  const chaveSalva = getApiKey()

  if (chaveSalva) {
    button.textContent = 'Deletar';
  }

  button.addEventListener('click', function() {
    const chave = viewEl.querySelector('#chave').value; // Use .value para obter o valor do input

    if (getApiKey()) {
      removeApiKey(); // remove a chave-api'
      button.textContent = 'Salvar';
    } else {
      setApiKey(chave); // Corrija a variável para 'chave'
      button.textContent = 'Deletar';
    }
  });

  return viewEl;
}

// Definir funciones/componentes similares para otras rutas