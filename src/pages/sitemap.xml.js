// Sitemap gerado no build a partir das páginas fixas e da lista de serviços.
// Rotas redirecionadas (ex.: a antiga /servicos/qualificacao-utilidades-clean/) não entram aqui.
import { servicos } from '../data/servicos.js';

const paginasFixas = ['/', '/quem-somos/', '/servicos/', '/treinamentos/', '/contato/'];

export function GET({ site }) {
  const base = site ? site.href.replace(/\/$/, '') : '';
  const rotas = [...paginasFixas, ...servicos.map((s) => `/servicos/${s.slug}/`)];
  const urls = rotas.map((rota) => `  <url><loc>${base}${rota}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
