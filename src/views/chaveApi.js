import { getApiKey, setApiKey, removeApiKey } from "../lib/apiKey.js";


export default function chaveApi() {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `<main>
  <h3>Administrador de chave de API</h3>
  <P>A partir daqui você pode gerenciar a chave de API a ser usada</P>
  <label for="chave"></label>
  <input type="text" id="chave" name="chave" maxlength="53" required>
  <button id="salvarOuDeletarChave" type="button">Salvar</button>
</main>`;


  // const button = viewEl.querySelector('#salvarOuDeletarChave');
  // const chaveSalva = getApiKey();

  // if (chaveSalva) {
  //   button.textContent = 'Deletar';
  // }

  // button.addEventListener('click', function() {
  //   const chave = viewEl.querySelector('#chave').value;

  //   if (getApiKey()) {
  //     removeApiKey();
  //     button.textContent = 'Salvar'; // Atualiza o texto do botão após remover a chave
  //   } else {
  //     setApiKey(chave);
  //     button.textContent = 'Deletar';
  //   }
  // });

  // return viewEl;
  // }
  const button = viewEl.querySelector('#salvarOuDeletarChave');
  const chaveSalva = getApiKey();
  const input = viewEl.querySelector('#chave');
  input.value = chaveSalva || ''; // Define o valor do input para a chave salva, se existir

  if (chaveSalva) {
    button.textContent = 'Deletar';
  }

  button.addEventListener('click', function () {
    const chave = input.value;

    if (getApiKey()) {
      removeApiKey();
      button.textContent = 'Salvar';
      input.value = ''; // Limpa o valor do input
    } else {
      setApiKey(chave);
      button.textContent = 'Deletar';
    }
  });

  return viewEl;
}

// Definir funciones/componentes similares para otras rutas