console.log("FlappyBird");

let frames = 0;
const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");
const somHit = new Audio();
somHit.src = "./efeitos_hit.wav";

// Plano de fundo
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x + planoDeFundo.largura,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
  },
};

//chao

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentaçao = chao.x - movimentoDoChao;

      chao.x = movimentaçao % repeteEm;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX,
        chao.spriteY,
        chao.largura,
        chao.altura,
        chao.x,
        chao.y,
        chao.largura,
        chao.altura
      );
      contexto.drawImage(
        sprites,
        chao.spriteX,
        chao.spriteY,
        chao.largura,
        chao.altura,
        chao.x + chao.largura,
        chao.y,
        chao.largura,
        chao.altura
      );
    },
  };
  return chao;
}
function fazColisao(FlappyBird, chao) {
  const FlappyBirdY = FlappyBird.y + FlappyBird.altura;
  const chaoY = chao.y;

  if (FlappyBirdY >= chaoY) {
    return true;
  }
  return false;
}

function criaFlappyBird() {
  const FlappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 10,
    pulo: 4.6,
    pula() {
      FlappyBird.velocidade = -FlappyBird.pulo;
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if (fazColisao(FlappyBird, globais.chao)) {
        console.log("Fez colisão");
        somHit.play();
        mudaParaTela(telas.GameOver);
        return;
      }
      FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade;
      FlappyBird.y = FlappyBird.y + FlappyBird.velocidade;
    },
    movimentos: [
      { spriteX: 0, spriteY: 0 }, //asa pra cima
      { spriteX: 0, spriteY: 26 }, // asa no meio
      { spriteX: 0, spriteY: 52 }, // asa pra baixo
      { spriteX: 0, spriteY: 26 }, // asa no meio
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;
      if (passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + FlappyBird.frameAtual;
        const baseRepeticao = FlappyBird.movimentos.length;
        FlappyBird.frameAtual = incremento % baseRepeticao;
      }
    },
    desenha() {
      FlappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = FlappyBird.movimentos[FlappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX,
        spriteY, //sprite X, sprite Y,
        FlappyBird.largura,
        FlappyBird.altura, //tamanho do recorte do sprite
        FlappyBird.x,
        FlappyBird.y,
        FlappyBird.largura,
        FlappyBird.altura
      );
    },
  };
  return FlappyBird;
}

// msg getReady
const mensagemGetReady = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 140,
  x: canvas.width / 2 - 174 / 2,
  y: 100,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.spriteX,
      mensagemGetReady.spriteY,
      mensagemGetReady.width,
      mensagemGetReady.height,
      mensagemGetReady.x,
      mensagemGetReady.y,
      mensagemGetReady.width,
      mensagemGetReady.height
    );
  },
};
// mensagem game over
const mensagemGameOver = {
  spriteX: 134,
  spriteY: 153,
  width: 226,
  height: 200,
  x: canvas.width / 2 - 226 / 2,
  y: 100,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.spriteX,
      mensagemGameOver.spriteY,
      mensagemGameOver.width,
      mensagemGameOver.height,
      mensagemGameOver.x,
      mensagemGameOver.y,
      mensagemGameOver.width,
      mensagemGameOver.height
    );
  },
};
// canos
function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function (par) {
        const yRandom = par.y;
        const espaçamentoEntreCanos = 120;
        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        // cano do ceu
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX,
          canos.ceu.spriteY,
          canos.largura,
          canos.altura,
          canoCeuX,
          canoCeuY,
          canos.largura,
          canos.altura
        );
        // cano do chao
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espaçamentoEntreCanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX,
          canos.chao.spriteY,
          canos.largura,
          canos.altura,
          canoChaoX,
          canoChaoY,
          canos.largura,
          canos.altura
        );

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY,
        };
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY,
        };
      });
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.FlappyBird.y;
      const peDoFlappy = globais.FlappyBird.y + globais.FlappyBird.altura;

      if (globais.FlappyBird.x + globais.FlappyBird.largura >= par.x) {
        if (cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }
        if (peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },

    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function (par) {
        par.x = par.x - 2;

        if (canos.temColisaoComOFlappyBird(par)) {
          somHit.play();
          mudaParaTela(telas.GameOver);
        }

        if (par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });
    },
  };
  return canos;
}

function criaPlacar() {
  const placar = {
    pontuação: 0,
    desenha() {
      contexto.font = '35px " VT323 " ';
      contexto.textAlign = "right";
      contexto.fillStyle = "white";
      contexto.fillText(` ${placar.pontuação}`, canvas.width - 10, 35);
    },
    atualiza() {
      const intervaloDeFrames = 25;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        placar.pontuação = placar.pontuação + 1;
      }
    },
  };
  return placar;
}

//TELAS
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const telas = {
  INICIAL: {
    inicializa() {
      globais.FlappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.canos.desenha();
      globais.chao.desenha();
      globais.FlappyBird.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    },
  },
};
telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.FlappyBird.desenha();
    globais.placar.desenha();
  },
  click() {
    globais.FlappyBird.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.FlappyBird.atualiza();
    globais.chao.atualiza();
    globais.placar.atualiza();
  },
};

telas.GameOver = {
  desenha() {
    mensagemGameOver.desenha();
  },
  atualiza() {},
  click() {
    mudaParaTela(telas.INICIAL);
  },
};

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});
mudaParaTela(telas.INICIAL);
loop();
