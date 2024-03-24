# Dataverse Chat

## Índice

* [1. Sobre o produto](#1-sobre-o-produto)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Os objetivos do projeto](#3-os-objetivos-do-projeto)
* [4. Funcionalidades](#4-funcionalidades)
* [5. Considerações técnicas](#5-considerações-técnicas)
* [6. Protótipo de alta fidelidade](#6-protótipo-de-alta-fidelidade)
* [7. Testes de usabilidade](#7-testes-de-usabilidade)
* [8. Referência](#8-referência)
* [9. Desenvolvido](#4-desenvolvido)
* [10. Estado do projeto](#5-estado-do-projeto)


## 1. Sobre o produto

Esse produto foi idealizado para permiti uma interação entre o usuário e o anime, trazendo um mundo de magia que transforma o personagem do anime comunicativo que de certa forma, trás informações bastantes uteis, que muitos usuário sempre teve vontade, e sou super fã de animes então acho muito legal ter uma resposta do que perguntar ao anime. Então esse produto trás versatilidade que antes era só sobre informações e agora o suário consegue interagir com o personagem através de um chat, além disso no mesmo site o usuário consegue verificar curiosidades sobre o anime, filtrar por plataforma de streaming e com toda essa usabilidade foi pensado na acessibilidade visul do produto.

## 2. Resumo do projeto

O projeto, irá transformar o antigo projeto Dataverse em uma [Single Page Application (SPA)](https://pt.wikipedia.org/wiki/Aplicativo_de_p%C3%A1gina_%C3%BAnica), será mantido as funcionalidades de visualização, filtragem, ordenação e cálculo de alguma estatística. Será adicionado  uma nova visualização (tela) para consultar informações detalhadas de cada personagem/entidade e acrescentar
a possibilidade de interagir com um personagem/entidade ou todos eles através
de um sistema de chat impulsionado pela [API da OpenAI](https://openai.com/product).

## 3. Os objetivos do projeto 

* Desenvolver uma [Single Page Application (SPA)](https://pt.wikipedia.org/wiki/Aplicativo_de_p%C3%A1gina_%C3%BAnica)
* Aplicar os conceitos de responsividade no desenvolvimento das telas
* Implementar um router para a navegação entre as diferentes visualizações/telas
  da aplicação
* Integrar uma API externa
* Compreender a assincronia em JavaScript
* Criar um conjunto de testes unitários que permitam testar código assíncrono


## 4. Funcionalidades

Será entregue uma  Single Page Application (SPA) que permitirá **visualizar os dados, filtrá-los, ordená-los e calcular alguma estatística**  que  foi feito no projto Dataverse, mas também acessar uma página de detalhes
de cada personagem e poder _interagir_ com os personagens ou entidades do conjunto de dados que foi utilizado anteriormente.

Aqui estão definidas de forma mais detalhada as funcionalidades
mínimas que a aplicação deve ter:

* A aplicação deve ser _responsiva_
* A aplicação deve ser uma SPA com várias visualizações:
  - Implementar um sistema de roteamento que permita a navegação dentro
    da aplicação.
  - Cada visualização da aplicação deve ser carregada dinamicamente por meio
    do JavaScript.
  - Garantir que a URL seja atualizada de acordo com a visualização carregada,
    assim como o `title` do documento (a aba do navegador).
  - A aplicação deve ser capaz de carregar a visualização correspondente
    à URL atual ao iniciar a aplicação.
* A aplicação deve: visualizar,iltrar, ordenar e calcular estatísticas dos dados.
* Ao clicar em um card de personagem/entidade, a aplicação deve redirecionar
  para uma visualização **com sua própria URL** que mostre informações
  detalhadas sobre aquele personagem/entidade em particular.
* A aplicação deve permitir ao usuário configurar a API Key para
  interagir com a API da Open AI.
* Utilizando a API da Open AI, a aplicação deve permitir que o usuário interaja
  com um personagem/entidade através de um chat.
  - Indicar visualmente quando um ou vários personagens/entidades estiverem
  gerando uma resposta à mensagem enviada
* A aplicação deve informar à usuária sobre os erros que possam surgir ao
  interagir com a API, como atingir a cota de tokens por minuto ou qualquer outro
  erro relacionado à API. Deve ser fornecida uma descrição clara da causa do
  problema e possíveis soluções.

Para que as conversas anteriores funcionem, é essencial que a aplicação seja
integrada à IA por meio da API da OpenAI. foi fornecido uma Chave de API que a usuária deverá ser capaz de inserir na aplicação que você construirá.

## 5. Considerações técnicas
Modelo de boilerplate 
.
├── src
|  ├── components 
|  ├── data
|  |  └── dataset.js
|  ├── lib
|  |  └── dataFunctions.js
|  ├── views
|  ├── index.html
|  ├── index.js
|  ├── router.js
|  └── style.css
├── test
|  └── dataFunctions.spec.js
|  └── example.spec.js
├── README.md
└── package.json


## 6. Protótipo de alta fidelidade
Usei o figma para desenhar o prototipo para ter uma idéia de como queria que fosse feita a parte visual do projeto.

## 7. Testes de usabilidade
Durante o os teste do projeto foi feita algumas modificações na parte responsiva do projeto para que o usuário tanto de telas maiores e menores pudesse acessar o site e de que certa forma não quebrasse tanto as imagens e informações.. Foi bem complicado fazer essas modificações.

Durante a parte de códigos foi preciso fazer testes das funções para verificar se as funções realmente do projeto estava de acordo com o que foi implementado, mais tive alguns problema para ajustar os teste do router pois tinha função que era privada e só estava no arquivo do router e foi complicado testar as funções pois algumas dependia de outras. Mais foi possivel reverter essa situação através de mocks para testar a usabilidade das funções.


## 8. Referência
Para compor este projeto para ficar real e trazer informações veridicas dos animes, foi feita uma pesquisa detalhadas, sobre musicas, ano de lançamento, autor e quantidades de episódios e buscamos essa informações em banco de dados no google e para montar o arquivo json desse projeto usamos o chatgpt.

### Tecnologias utilizadas 
1.Html5
2.Css
3.JavaScript
4.Git
5.GitHub
6.GitHub Pages
7.Eslint
8.Jest
9.NodeJS
10.Figma
11.OpenIA

## 9. Desenvolvido
Flaviane Lima

## 10. Estado do projeto
Finalizado 
