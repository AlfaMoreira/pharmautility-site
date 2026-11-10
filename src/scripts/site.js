// Comportamento do site: menu, cabeçalho, revelação ao rolar e formulários.

/* ---------- Cada página abre independente ----------
   Sem isso, o navegador restaura a rolagem ao voltar (ex.: da Serviços para a Home) e a Home
   reaparece no meio da sequência. Recarregar a página mantém a posição; entrar por link ou voltar abre no topo. */
// Com restauração manual o navegador não reposiciona a rolagem ao navegar: a página já abre no topo.
// (Não chamar scrollTo/scrollY no carregamento: isso força recálculo de layout — "reflow forçado".)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', (evento) => {
  // Restaurado do cache do navegador (bfcache): também começa no topo.
  if (evento.persisted) window.scrollTo(0, 0);
});
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Botão WhatsApp (dúvidas): mesmo efeito de borda, em verde ---------- */
document.querySelectorAll('a.btn--whatsapp').forEach((botao) => {
  [1, 2].forEach(() => {
    const anel = document.createElement('i');
    anel.className = 'btn__ring';
    anel.setAttribute('aria-hidden', 'true');
    botao.prepend(anel);
  });
});

/* ---------- Botões "Solicitar proposta": borda animada em todas as páginas ---------- */
document.querySelectorAll('a.btn').forEach((botao) => {
  if (!/solicitar proposta/i.test(botao.textContent)) return;
  botao.classList.add('btn--proposta');
  // Abre a conversa com um atendente no WhatsApp (número oficial), com mensagem pré-preenchida.
  // data-proposta="Nome do serviço" personaliza a mensagem; sem ele, usa a mensagem geral.
  const servico = botao.dataset.proposta;
  const mensagem = servico
    ? `Olá, PharmaUtility! Gostaria de solicitar uma proposta técnica para ${servico}.`
    : 'Olá, PharmaUtility! Gostaria de solicitar uma proposta técnica.';
  botao.href = `https://wa.me/5511944744013?text=${encodeURIComponent(mensagem)}`;
  botao.target = '_blank';
  botao.rel = 'noopener';
  // Duas luzes simultâneas: a segunda fica meio giro à frente (ver .btn__ring + .btn__ring no CSS).
  [1, 2].forEach(() => {
    const anel = document.createElement('i');
    anel.className = 'btn__ring';
    anel.setAttribute('aria-hidden', 'true');
    botao.prepend(anel);
  });
});

/* ---------- Cabeçalho: sombra ao rolar ---------- */
const header = document.querySelector('[data-header]');

/* ---------- Estado de rolagem do cabeçalho ----------
   Lê só window.scrollY (não força recálculo de layout). O vídeo da Home tem controle próprio (scrub.js). */
let emFrame = false;
function atualizarProgresso() {
  emFrame = false;
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}
function aoRolar() {
  if (!emFrame) {
    emFrame = true;
    window.requestAnimationFrame(atualizarProgresso);
  }
}
window.addEventListener('scroll', aoRolar, { passive: true });
window.addEventListener('resize', aoRolar, { passive: true });
// Sem leitura inicial: a página sempre abre no topo (sem sombra) e ler scrollY durante o carregamento
// força recálculo de layout (reflow forçado). A sombra é aplicada na primeira rolagem.

/* ---------- Menu móvel ---------- */
const botaoMenu = document.querySelector('[data-menu-toggle]');
const painelMenu = document.querySelector('[data-menu-panel]');

function definirMenu(aberto) {
  if (!botaoMenu || !painelMenu) return;
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  painelMenu.classList.toggle('is-open', aberto);
}

botaoMenu?.addEventListener('click', () => {
  definirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
});
painelMenu?.addEventListener('click', (evento) => {
  if (evento.target.closest('a')) definirMenu(false);
});
window.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') definirMenu(false);
});
window.matchMedia('(min-width: 961px)').addEventListener('change', (evento) => {
  if (evento.matches) definirMenu(false);
});

/* ---------- Revelação ao rolar ---------- */
const revelaveis = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduzirMovimento) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-in');
          observador.unobserve(entrada.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revelaveis.forEach((el) => observador.observe(el));
} else {
  revelaveis.forEach((el) => el.classList.add('is-in'));
}
document.querySelectorAll('.scribble').forEach((el) => {
  if (reduzirMovimento) el.classList.add('is-in');
});

/* ---------- Formulário de contato (monta mensagem para o WhatsApp) ---------- */
const WHATSAPP = '5511944744013';

document.querySelectorAll('[data-whatsapp-form]').forEach((form) => {
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let primeiroInvalido = null;
    form.querySelectorAll('[required]').forEach((campo) => {
      const valido = campo.value.trim() !== '' && campo.checkValidity();
      campo.setAttribute('aria-invalid', String(!valido));
      const erro = form.querySelector(`#${campo.id}-erro`);
      if (erro) erro.hidden = valido;
      if (!valido && !primeiroInvalido) primeiroInvalido = campo;
    });

    const status = form.querySelector('[data-form-status]');
    if (primeiroInvalido) {
      primeiroInvalido.focus();
      if (status) status.textContent = 'Revise os campos destacados antes de enviar.';
      return;
    }

    const dados = new FormData(form);
    const linhas = [
      `Olá, PharmaUtility! Meu nome é ${dados.get('nome')}.`,
      dados.get('empresa') ? `Empresa: ${dados.get('empresa')}` : null,
      `Telefone: ${dados.get('telefone')}`,
      dados.get('email') ? `E-mail: ${dados.get('email')}` : null,
      `Assunto: ${dados.get('assunto')}`,
      '',
      String(dados.get('detalhes') || '').trim(),
    ].filter((linha) => linha !== null);

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
    if (status) status.textContent = 'Abrimos o WhatsApp com a sua mensagem. Revise e envie por lá para concluir.';
  });
});
