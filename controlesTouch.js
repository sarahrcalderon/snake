const container = document.getElementById('containerJogo'); 




function criarBotao(simbolo, callback) {
  const botao = document.createElement('button');
  botao.textContent = simbolo;
  Object.assign(botao.style, estiloBotao);
  botao.addEventListener('click', callback);
  return botao;
}

const botaoCima = criarBotao('⬆️', () => {
  if (direcao !== 'BAIXO') direcao = 'CIMA';
});
const botaoBaixo = criarBotao('⬇️', () => {
  if (direcao !== 'CIMA') direcao = 'BAIXO';
});
const botaoEsquerda = criarBotao('⬅️', () => {
  if (direcao !== 'DIREITA') direcao = 'ESQUERDA';
});
const botaoDireita = criarBotao('➡️', () => {
  if (direcao !== 'ESQUERDA') direcao = 'DIREITA';
});


const linhaCima = document.createElement('div');
linhaCima.appendChild(botaoCima);

const linhaMeio = document.createElement('div');
linhaMeio.style.display = 'flex';
linhaMeio.style.justifyContent = 'center';
linhaMeio.appendChild(botaoEsquerda);
linhaMeio.appendChild(botaoDireita);

const linhaBaixo = document.createElement('div');
linhaBaixo.appendChild(botaoBaixo);


controles.appendChild(linhaCima);
controles.appendChild(linhaMeio);
controles.appendChild(linhaBaixo);

container.appendChild(controles);
