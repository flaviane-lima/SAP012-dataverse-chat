// views/error.js
export default function error() {
  const viewEl = document.createElement('p');
  viewEl.textContent = 'Error! Volte para a página inicial';
  viewEl.classList.add('error-message');
  return viewEl;
}



