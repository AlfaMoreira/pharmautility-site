// Gera um único index.html autocontido com TODO o site (todas as páginas do build),
// para compartilhar por WhatsApp/e-mail e abrir direto no celular, sem servidor.
//
// Uso: npm run exportar   (faz o build e depois roda este script)
// Saída: exportar/index.html
//
// Como funciona:
// - Cada página do dist/ vira um bloco <div data-pagina="/rota/"> dentro de um único <main>.
// - Links internos ("/contato/") viram rotas por hash ("#/contato/"); um roteador mostra a página certa.
// - IDs repetidos entre páginas recebem prefixo por página (p3-contato), com rótulos e âncoras ajustados.
// - CSS, fontes WOFF2, imagens e o vídeo da Home são embutidos (o vídeo vira Blob URL ao abrir).
// - Scripts idênticos entre páginas são executados uma única vez.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(raiz, 'dist');
const pub = path.join(raiz, 'public');
const saida = path.join(raiz, 'exportar', 'index.html');

/* ---------- utilidades ---------- */
const ler = (p) => fs.readFileSync(p, 'utf8');
const mime = { '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4' };
const arquivoDe = (url) => {
  const limpo = decodeURI(url.split('?')[0]);
  const candidatos = [path.join(dist, limpo), path.join(pub, limpo)];
  return candidatos.find((c) => fs.existsSync(c));
};
const cacheUri = new Map();
const dataUri = (url) => {
  if (cacheUri.has(url)) return cacheUri.get(url);
  const arquivo = arquivoDe(url);
  if (!arquivo) throw new Error(`Arquivo não encontrado: ${url}`);
  const uri = `data:${mime[path.extname(arquivo)]};base64,${fs.readFileSync(arquivo).toString('base64')}`;
  cacheUri.set(url, uri);
  return uri;
};

/* ---------- 1. páginas do build (sem as páginas de redirecionamento) ---------- */
function listarPaginas(dir, base = '/') {
  const lista = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === '_astro' || item.name === 'assets') continue;
      lista.push(...listarPaginas(p, `${base}${item.name}/`));
    } else if (item.name === 'index.html') {
      const html = ler(p);
      if (!/http-equiv="refresh"/.test(html)) lista.push({ rota: base, html });
    }
  }
  return lista;
}
const paginas = listarPaginas(dist).sort((a, b) => (a.rota === '/' ? -1 : b.rota === '/' ? 1 : a.rota.localeCompare(b.rota)));
const home = paginas.find((p) => p.rota === '/');

/* ---------- 2. CSS: todos os arquivos usados, sem repetir; fontes e imagens embutidas ---------- */
const cssVistos = new Set();
let css = '';
for (const { html } of paginas) {
  for (const [, href] of html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)) {
    if (cssVistos.has(href)) continue;
    cssVistos.add(href);
    css += ler(path.join(dist, href)) + '\n';
  }
}
css = css.replace(/src:\s*url\(["']?(\/assets\/fonts\/[^"')]+\.woff2)["']?\)\s*format\(["']woff2["']\)\s*,\s*url\([^)]*\)\s*format\([^)]*\)/g,
  (_, fonte) => `src:url("${dataUri(fonte)}") format("woff2")`);
css = css.replace(/url\(["']?(\/assets\/[^"')]+)["']?\)/g, (_, url) => `url("${dataUri(url)}")`);

/* ---------- 3. scripts: cada script distinto uma única vez, na ordem em que aparece ---------- */
const scriptsVistos = new Set();
const scripts = [];
for (const { html } of paginas) {
  for (const [, attrs, corpo] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const hash = crypto.createHash('md5').update(corpo).digest('hex');
    if (scriptsVistos.has(hash)) continue;
    scriptsVistos.add(hash);
    scripts.push(`<script${attrs}>${corpo}</script>`);
  }
}

/* ---------- 4. conteúdo de cada página, com IDs prefixados ---------- */
const prefixarIds = (trecho, prefixo) => {
  const ajustarLista = (valor) => valor.split(/\s+/).map((v) => (v ? `${prefixo}${v}` : v)).join(' ');
  return trecho
    .replace(/\sid="([^"]+)"/g, (m, v) => (v.startsWith('i-') ? m : ` id="${prefixo}${v}"`))
    .replace(/\sfor="([^"]+)"/g, (_, v) => ` for="${prefixo}${v}"`)
    .replace(/\s(aria-(?:labelledby|describedby|controls))="([^"]+)"/g, (_, a, v) => ` ${a}="${ajustarLista(v)}"`)
    .replace(/\shref="#([^"/][^"]*)"/g, (m, v) => (v.startsWith('i-') ? m : ` href="#${prefixo}${v}"`));
};
const blocos = paginas.map(({ rota, html }, i) => {
  const titulo = (html.match(/<title>([^<]*)<\/title>/) || [, 'PharmaUtility'])[1];
  const conteudo = (html.match(/<main id="conteudo"[^>]*>([\s\S]*?)<\/main>/) || [, ''])[1];
  return `<div data-pagina="${rota}" data-titulo="${titulo.replace(/"/g, '&quot;')}"${rota === '/' ? '' : ' hidden'}>${prefixarIds(conteudo, `p${i}-`)}</div>`;
});

/* ---------- 5. moldura (cabeçalho, ícones, rodapé) a partir da Home ---------- */
const abreHtml = home.html.match(/<html[^>]*>/)[0];
const abreBody = home.html.match(/<body[^>]*>/)[0];
const antesMain = home.html.slice(home.html.indexOf(abreBody) + abreBody.length, home.html.indexOf('<main id="conteudo"'));
const depoisMain = home.html.slice(home.html.indexOf('</main>') + '</main>'.length, home.html.indexOf('</body>')).replace(/<script[\s\S]*?<\/script>/g, '');
const metas = (home.html.match(/<meta[^>]*>/g) || []).join('');

let doc = `<!DOCTYPE html>${abreHtml}<head>${metas}<title>PharmaUtility — Engenharia e Automação</title>
<link rel="icon" type="image/svg+xml" href="/assets/logo/simbolo-cor.svg">
<style>${css}</style>
<style>
/* Versão de apresentação: conteúdo visível sem depender da animação de entrada. */
.reveal{opacity:1!important;transform:none!important}
[data-pagina][hidden]{display:none!important}
.export-aviso{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:200;max-width:calc(100% - 32px);padding:9px 16px;border-radius:999px;background:rgba(30,40,58,.92);color:#fff;font:600 12.5px/1.3 Montserrat,system-ui,sans-serif;text-align:center;box-shadow:0 10px 30px -10px rgba(0,0,0,.5);pointer-events:none}
</style>
</head>${abreBody}${antesMain}<main id="conteudo" tabindex="-1">${blocos.join('\n')}</main>${depoisMain}
<div class="export-aviso" role="note">Versão para análise</div>
<script>
/* Roteador da versão em arquivo único: mostra a página da rota "#/..." e trata âncoras internas. */
(function () {
  var paginas = Array.prototype.slice.call(document.querySelectorAll('[data-pagina]'));
  function rota() {
    var h = decodeURIComponent(location.hash);
    var r = h.indexOf('#/') === 0 ? h.slice(1) : '/';
    return r.charAt(r.length - 1) === '/' ? r : r + '/';
  }
  function mostrar() {
    var r = rota();
    var alvo = paginas.filter(function (p) { return p.getAttribute('data-pagina') === r; })[0] || paginas[0];
    r = alvo.getAttribute('data-pagina');
    paginas.forEach(function (p) { p.hidden = p !== alvo; });
    document.title = alvo.getAttribute('data-titulo');
    document.querySelectorAll('.nav-link, .menu-panel__link').forEach(function (a) {
      var h = (a.getAttribute('href') || '').replace(/^#/, '');
      var atual = h === '/' ? r === '/' : h !== '' && r.indexOf(h) === 0;
      if (atual) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var menu = document.querySelector('[data-menu-toggle][aria-expanded="true"]');
    if (menu) menu.click();
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event('resize'));
  }
  window.addEventListener('hashchange', mostrar);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (h === '#' || h.indexOf('#/') === 0) return;
    var el = document.getElementById(h.slice(1));
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
  mostrar();
})();
</script>
${scripts.join('\n')}
</body></html>`;

/* ---------- 6. links internos -> rotas por hash ---------- */
doc = doc.replace(/href="\/(?!\/|assets\/|_astro\/)([^"#]*)(#[^"]*)?"/g, (_, caminho) => {
  const r = `/${caminho}`;
  return `href="#${r.endsWith('/') ? r : r + '/'}"`;
});

/* ---------- 7. imagens: só a versão maior (sem srcset), embutida ---------- */
doc = doc.replace(/\s(?:srcset|sizes)="[^"]*"/g, '');
doc = doc.replace(/(src|href|poster)="(\/assets\/[^"]+\.(?:svg|png|webp|jpg))"/g, (_, a, url) => `${a}="${dataUri(url)}"`);

/* ---------- 8. vídeo da Home: base64 num bloco de dados, convertido em Blob URL ao abrir ---------- */
const videos = [];
doc = doc.replace(/<source src="(\/assets\/video\/[^"]+\.mp4)" type="video\/mp4"\s*\/?>/g, (_, url) => {
  const id = `video-dados-${videos.length}`;
  videos.push({ id, b64: fs.readFileSync(arquivoDe(url)).toString('base64') });
  return `<source data-video-dados="${id}" type="video/mp4">`;
});
if (videos.length) {
  const blocosVideo = videos.map((v) => `<script type="application/octet-stream" id="${v.id}">${v.b64}</script>`).join('');
  const conversor = `<script>
document.querySelectorAll('source[data-video-dados]').forEach(function (s) {
  var dados = document.getElementById(s.getAttribute('data-video-dados'));
  if (!dados) return;
  var bin = atob(dados.textContent.trim()), bytes = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  s.src = URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
  s.parentNode.load();
});
</script>`;
  // Antes dos scripts do site, para o vídeo já ter fonte quando o controle por rolagem iniciar.
  doc = doc.replace('<div class="export-aviso"', `${blocosVideo}${conversor}<div class="export-aviso"`);
}

/* ---------- 9. gravação e conferência ---------- */
fs.mkdirSync(path.dirname(saida), { recursive: true });
fs.writeFileSync(saida, doc);
const restantes = (doc.match(/(?:src|href|poster)="\/(?!\/)[^"]*"/g) || []);
const ids = [...doc.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const repetidos = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
console.log(`Páginas: ${paginas.map((p) => p.rota).join(', ')}`);
console.log(`Gerado: ${path.relative(raiz, saida)} — ${(fs.statSync(saida).size / 1048576).toFixed(1)} MB`);
console.log(`Referências locais restantes: ${restantes.length}${restantes.length ? ' → ' + restantes.slice(0, 5).join(' ') : ''}`);
console.log(`IDs repetidos: ${repetidos.length}${repetidos.length ? ' → ' + repetidos.slice(0, 8).join(' ') : ''}`);
