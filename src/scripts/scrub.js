// Vídeo controlado pela rolagem (hero da Home).
// O progresso da seção sticky define o instante do vídeo, relacionado à duração real após os metadados.
// - Atualização coordenada por requestAnimationFrame, com filtro exponencial para suavizar.
// - Uma única busca por vez: nova busca só após o evento 'seeked'.
// - Busca só quando o frame alvo muda de fato (meio quadro de tolerância), evitando buscas redundantes.
// Só memória muito baixa (<= 2 GB) força o modo estático; núcleos de CPU não são critério confiável.
const poucosRecursos = navigator.deviceMemory !== undefined && navigator.deviceMemory <= 2;

const FPS = 30;              // taxa do clipe (40 quadros em 1,33 s)
const MEIO_QUADRO = 0.5 / FPS;
const SUAVIZACAO = 0.14;     // fração do caminho percorrida a cada quadro
const PASSO_MINIMO = 0.0004; // abaixo disso o progresso assenta no alvo

document.querySelectorAll('[data-scrub]').forEach((secao) => {
  const video = secao.querySelector('[data-scrub-video]');
  const barra = secao.querySelector('[data-scrub-bar]');
  if (!video) return;

  /* ---- Modo estático: somente dispositivo com pouca memória. ----
     Com "reduzir movimento" ativo, o vídeo continua vinculado à rolagem: o movimento é controlado pelo
     próprio usuário, sem animação automática. */
  if (poucosRecursos) {
    secao.classList.add('is-static');
    // Reprodução convencional com controles: o vídeo não acompanha a rolagem e só toca quando o usuário decide.
    video.removeAttribute('aria-hidden');
    video.setAttribute('aria-label', 'Vídeo de apresentação da PharmaUtility, sem áudio');
    video.controls = true;
    return;
  }

  let duracao = 0;
  let pronto = false;
  let atual = 0; // progresso exibido (suavizado), 0 a 1
  let alvo = 0;  // progresso definido pela rolagem, 0 a 1
  let laco = false;

  video.pause();

  // Carregamento em duas etapas: o HTML pede só metadados e o primeiro quadro (preload="metadata");
  // o arquivo completo é baixado depois que a página terminou de carregar, sem disputar banda
  // com texto, fontes e CSS. Com "economia de dados" ativa, o restante vem sob demanda na rolagem.
  const economiaDeDados = navigator.connection && navigator.connection.saveData;
  const carregarCompleto = () => {
    if (!economiaDeDados) video.preload = 'auto';
  };
  if (document.readyState === 'complete') carregarCompleto();
  else window.addEventListener('load', carregarCompleto, { once: true });

  video.addEventListener('loadeddata', () => secao.classList.add('is-ready'));
  video.addEventListener('loadedmetadata', () => {
    duracao = video.duration;
    pronto = Number.isFinite(duracao) && duracao > 0;
    agendar();
  });
  // Uma busca terminou: o laço pode emitir a próxima com o alvo mais recente.
  video.addEventListener('seeked', agendar);
  // Falha: a capa permanece visível e a seção segue como conteúdo estático.
  video.addEventListener('error', () => {
    secao.classList.add('is-fallback');
    secao.classList.remove('is-ready');
  });

  // Geometria da seção lida só dentro do ResizeObserver, que roda logo após o navegador calcular o layout.
  // Assim o laço de animação usa apenas window.scrollY e valores em cache, sem forçar recálculo de layout
  // ("reflow forçado") a cada quadro nem no carregamento.
  let topoSecao = 0;
  let alturaSecao = 0;
  new ResizeObserver(() => {
    topoSecao = secao.offsetTop;
    alturaSecao = secao.offsetHeight;
    agendar();
  }).observe(secao);

  // Progresso de 0 (início da seção no topo) a 1 (fim da seção), mapeado a uma altura de tela.
  function progressoDaSecao() {
    const faixa = alturaSecao - window.innerHeight;
    if (faixa <= 0) return 0;
    return Math.min(1, Math.max(0, (window.scrollY - topoSecao) / faixa));
  }

  function agendar() {
    if (!laco) {
      laco = true;
      window.requestAnimationFrame(passo);
    }
  }

  function passo() {
    laco = false;
    if (!pronto) return;

    alvo = progressoDaSecao();
    atual += (alvo - atual) * SUAVIZACAO;
    if (Math.abs(alvo - atual) < PASSO_MINIMO) atual = alvo;

    const instante = atual * duracao;
    // Só busca se o frame mudou de fato e nenhuma busca está em andamento.
    const frameMudou = Math.abs(video.currentTime - instante) > MEIO_QUADRO;
    if (!video.seeking && frameMudou) {
      video.currentTime = instante;
    }

    if (barra) barra.style.transform = `scaleX(${atual})`;
    secao.style.setProperty('--sp', atual.toFixed(4));

    // Continua enquanto houver movimento, busca em curso ou frame pendente.
    if (atual !== alvo || video.seeking || frameMudou) agendar();
  }

  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar, { passive: true });
  window.addEventListener('pageshow', agendar);
  agendar();
});
