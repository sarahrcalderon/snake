const canvas = document.getElementById('campoJogo');
const contexto = canvas.getContext('2d');
const tamanhoCelula = 20; 
const tamanhoCampo = canvas.width; 
const totalCelulas = tamanhoCampo / tamanhoCelula;

let cobrinha = [{ x: 9, y: 9 }];
let direcao = 'DIREITA'; 
let comida = gerarComida();
let pontuacao = 0;
let velocidade = 150;

function desenharCobrinha() {
  contexto.fillStyle = 'verde';
  cobrinha.forEach(parte => {
    contexto.fillRect(parte.x * tamanhoCelula, parte.y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
  });
}

function gerarComida() {
  return {
    x: Math.floor(Math.random() * totalCelulas),
    y: Math.floor(Math.random() * totalCelulas)
  };
}

function desenharComida() {
  contexto.fillStyle = 'vermelho';
  contexto.fillRect(comida.x * tamanhoCelula, comida.y * tamanhoCelula, tamanhoCelula, tamanhoCelula);
}

function moverCobrinha() {
  const cabeca = { ...cobrinha[0] };
  if (direcao === 'CIMA') cabeca.y -= 1;
  if (direcao === 'BAIXO') cabeca.y += 1;
  if (direcao === 'ESQUERDA') cabeca.x -= 1;
  if (direcao === 'DIREITA') cabeca.x += 1;

  cobrinha.unshift(cabeca);

  if (cabeca.x === comida.x && cabeca.y === comida.y) {
    pontuacao++;
    document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacao}`;
    comida = gerarComida();

    if (pontuacao % 2 === 0) {
      aumentarVelocidade();
    }
  } else {
    cobrinha.pop();
  }
}

function verificarColisao() {
  const [cabeca, ...corpo] = cobrinha;

  if (
    cabeca.x < 0 || cabeca.x >= totalCelulas ||
    cabeca.y < 0 || cabeca.y >= totalCelulas
  ) {
    return true;
  }

  return corpo.some(parte => parte.x === cabeca.x && parte.y === cabeca.y);
}

function atualizarJogo() {
  if (verificarColisao()) {
    alert(`Fim de jogo! Sua pontuação foi: ${pontuacao}`);
    document.location.reload();
  }

  contexto.clearRect(0, 0, tamanhoCampo, tamanhoCampo);
  desenharComida();
  desenharCobrinha();
  moverCobrinha();
}

function aumentarVelocidade() {
  velocidade = Math.max(50, velocidade - 10);
  clearInterval(intervaloJogo);
  intervaloJogo = setInterval(atualizarJogo, velocidade);
}

document.addEventListener('keydown', evento => {
  if (evento.key === 'ArrowUp' && direcao !== 'BAIXO') direcao = 'CIMA';
  if (evento.key === 'ArrowDown' && direcao !== 'CIMA') direcao = 'BAIXO';
  if (evento.key === 'ArrowLeft' && direcao !== 'DIREITA') direcao = 'ESQUERDA';
  if (evento.key === 'ArrowRight' && direcao !== 'ESQUERDA') direcao = 'DIREITA';
});

let intervaloJogo = setInterval(atualizarJogo, velocidade);
