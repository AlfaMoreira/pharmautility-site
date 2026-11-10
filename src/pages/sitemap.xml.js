// Sitemap gerado no build a partir das páginas fixas e da lista de serviços.
// - <lastmod>: data do último commit que alterou os arquivos da página (git). Sem git, usa a data do build.
// - <image:image>: imagem de compartilhamento e foto de fundo da página (ajuda no Google Imagens).
// Rotas redirecionadas (ex.: /servicos/qualificacao-utilidades-clean/, /servicos/portfolio-gxp-validacao/) não entram.
import { execFileSync } from 'node:child_process';
import { servicos } from '../data/servicos.js';

const LOGO_OG = '/assets/og/Gemini_Generated_Image_7.jpg';

// Data ISO do último commit que tocou os arquivos (ou null se não houver git/histórico).
function ultimaAlteracao(arquivos) {
  try {
    const data = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...arquivos], { encoding: 'utf8' }).trim();
    return data || null;
  } catch {
    return null;
  }
}

// Arquivos compartilhados por todas as páginas (layout, cabeçalho, rodapé, estilos globais).
const comuns = ['src/layouts/Layout.astro', 'src/components/Header.astro', 'src/components/Footer.astro', 'src/styles/site.css'];

const paginasFixas = [
  { rota: '/', arquivos: ['src/pages/index.astro', 'src/data/servicos.js'], imagens: [LOGO_OG] },
  { rota: '/quem-somos/', arquivos: ['src/pages/quem-somos.astro'], imagens: ['/assets/og/quem-somos.jpg', '/assets/images/seguranca-valores.webp'] },
  { rota: '/servicos/', arquivos: ['src/pages/servicos/index.astro', 'src/data/servicos.js'], imagens: [LOGO_OG] },
  { rota: '/treinamentos/', arquivos: ['src/pages/treinamentos.astro', 'src/data/treinamentos.js', 'src/styles/treinamentos.css'], imagens: [LOGO_OG] },
  { rota: '/contato/', arquivos: ['src/pages/contato.astro'], imagens: [LOGO_OG] },
];

const paginasServico = servicos.map((s) => {
  const arquivoPagina = s.dedicada ? `src/pages/servicos/${s.slug}.astro` : 'src/pages/servicos/[slug].astro';
  const fundo = s.fundo?.nome ?? (s.dedicada ? `/assets/images/${s.slug.includes('agua') ? 'agua' : 'vapor'}-fundo` : null);
  const og = fundo ? `/assets/og/${fundo.split('/').pop().replace(/-fundo$/, '')}.jpg` : LOGO_OG;
  return { rota: `/servicos/${s.slug}/`, arquivos: [arquivoPagina, 'src/data/servicos.js'], imagens: [og] };
});

const escapar = (texto) => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET({ site }) {
  const base = site ? site.href.replace(/\/$/, '') : '';
  const hoje = new Date().toISOString();
  const urls = [...paginasFixas, ...paginasServico].map(({ rota, arquivos, imagens }) => {
    const lastmod = ultimaAlteracao([...arquivos, ...comuns]) ?? hoje;
    const blocosImagem = imagens.map((img) => `\n    <image:image><image:loc>${escapar(base + img)}</image:loc></image:image>`).join('');
    return `  <url>\n    <loc>${escapar(base + rota)}</loc>\n    <lastmod>${lastmod}</lastmod>${blocosImagem}\n  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
