export const filterById = (data, value) => {
  const selecaoId = data.filter(item => {
    return item["id"] === value;
  });
  return selecaoId[0];
};

export const filterBy = (data, filterBy, value) => {

  const itemSelecionado = data.filter(item => {
    if (item && item.extraInfo && filterBy in item.extraInfo &&
      item.extraInfo[filterBy] === value
    ) {
      return true;
    }
    return false;
  });

  return itemSelecionado;
};


export const computeStats = (data) => {
  const classifications = data.map(obj => obj.extraInfo.classification);

  const count = classifications.reduce((accumulator, classification) => {
    accumulator[classification] = (accumulator[classification] || 0) + 1;
    return accumulator;
  }, {});
  const productCount = classifications.length;

  const percents = Object.keys(count).reduce((accumulator, classification) => {
    accumulator[classification] = parseFloat(((count[classification] / productCount) * 100).toFixed(2));
    return accumulator;
  }, {});
  return percents;
};

export const sortBy = (data, sortBy, sortOrder) => {
  const ordenacao = [...data];
  ordenacao.sort((a, b) => {
    let result = 0;

    if (a[sortBy] < b[sortBy]) {

      result = -1;
    } else {
      result = 1;
    }

    return result;
  });

  if (sortOrder === 'asc') {
    return ordenacao;
  } else {
    return ordenacao.reverse();
  }

};

// export function handleAPIError(error) {
//   let errorMessage = 'Ocorreu um erro ao interagir com a API.';

//   if (error.response && error.response.status === 429) {
//     errorMessage = 'Você atingiu a cota de tokens por minuto. Por favor, aguarde um momento antes de tentar novamente.';
//   } else {
//     errorMessage += ' Por favor, tente novamente mais tarde.';
//   }

//   return errorMessage
// }