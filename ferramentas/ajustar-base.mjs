// Ajusta o build (dist/) para ser servido em um subcaminho, como o GitHub Pages de projeto
// (https://usuario.github.io/<repositorio>/). O código-fonte usa caminhos absolutos ("/assets/...",
// "/servicos/..."); aqui eles recebem o prefixo apenas na cópia publicada.
// Uso: BASE_PATH=/nome-do-repo node ferramentas/ajustar-base.mjs
import fs from 'node:fs';
import path from 'node:path';

const base = (process.env.BASE_PATH || '').replace(/\/+$/, '');
if (!base) {
  console.log('BASE_PATH vazio: nada a ajustar.');
  process.exit(0);
}

const dist = path.resolve('dist');
const prefixar = (url) => (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(base + '/') ? base + url : url);

// Atributos HTML com URL única.
const ATRIBUTOS = /(\s(?:href|src|poster|action|data-src)=)(["'])(\/[^"']*)\2/g;
// srcset: lista "url largura, url largura".
const SRCSET = /(\ssrcset=)(["'])([^"']*)\2/g;
// url(...) em CSS (arquivos e estilos embutidos).
const CSS_URL = /url\(\s*(["']?)(\/(?!\/)[^"')]+)\1\s*\)/g;
// Página de redirecionamento gerada pelo Astro: <meta http-equiv="refresh" content="0;url=/servicos/">.
const REFRESH = /(content=["']\d+;\s*url=)(\/[^"']*)/gi;

const ajustarCss = (css) => css.replace(CSS_URL, (_, aspas, url) => `url(${aspas}${prefixar(url)}${aspas})`);
const ajustarHtml = (html) =>
  ajustarCss(
    html
      .replace(ATRIBUTOS, (_, attr, aspas, url) => `${attr}${aspas}${prefixar(url)}${aspas}`)
      .replace(SRCSET, (_, attr, aspas, lista) =>
        `${attr}${aspas}${lista.split(',').map((item) => item.trim().replace(/^\S+/, prefixar)).join(', ')}${aspas}`)
      .replace(REFRESH, (_, inicio, url) => `${inicio}${prefixar(url)}`),
  );

let arquivos = 0;
const percorrer = (pasta) => {
  for (const item of fs.readdirSync(pasta, { withFileTypes: true })) {
    const caminho = path.join(pasta, item.name);
    if (item.isDirectory()) { percorrer(caminho); continue; }
    const ext = path.extname(item.name);
    if (ext !== '.html' && ext !== '.css') continue;
    const original = fs.readFileSync(caminho, 'utf8');
    const ajustado = ext === '.html' ? ajustarHtml(original) : ajustarCss(original);
    if (ajustado !== original) { fs.writeFileSync(caminho, ajustado); arquivos++; }
  }
};
percorrer(dist);
console.log(`Prefixo "${base}" aplicado em ${arquivos} arquivo(s).`);
