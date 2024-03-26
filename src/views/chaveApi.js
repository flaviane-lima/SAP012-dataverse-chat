import { getApiKey, setApiKey, removeApiKey } from "../lib/apiKey.js";


export default function chaveApi() {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `<main class="caixa-api">
  <div class="flex-container">
  <h3>Administrador de chave de API</h3>
  <p class="texto">A partir daqui você pode gerenciar a chave de API a ser usada</p>
  <label for="chave"></label>
  <input type="text" id="chave" name="chave" maxlength="53" required>
  <button id="salvarOuDeletarChave" type="button">Salvar</button>
  </div>
</main>`;

  const button = viewEl.querySelector('#salvarOuDeletarChave');
  const chaveSalva = getApiKey();
  const input = viewEl.querySelector('#chave');
  input.value = chaveSalva || ''; // Define o valor do input para a chave salva, se existir

  if (chaveSalva) {
    //se a chave estiver salva o botão muda para deletar
    button.textContent = 'Deletar';
  }

  button.addEventListener('click', function () {
    //aqui está obtendo o valor atual do botão
    const chave = input.value;

    // if (getApiKey()) {
    //   removeApiKey();
    //   button.textContent = 'Salvar';
    //   input.value = ''; // Limpa o valor do input
    // } else {
    //   setApiKey(chave);
    //   button.textContent = 'Deletar';
    // }
    if (getApiKey()) {
      setApiKey(chave);
      button.textContent = 'Deletar';
    } else {
      removeApiKey();
      button.textContent = 'Salvar';
      input.value = ''; // Limpa o valor do input
    }
  });

  return viewEl;
}
