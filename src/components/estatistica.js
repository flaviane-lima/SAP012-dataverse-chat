
export const renderListClassification = (percents)=>{
  const ul = document.createElement('ul');
  ul.id = "listaClassificacao";

  for(const classification in percents){
    const li = document.createElement('li');
    li.textContent = `Classicação ${classification}: ${percents[classification]}%`;
    ul.appendChild(li);
  }

  return ul;
}