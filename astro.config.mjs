// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Domínio público usado no sitemap (src/pages/sitemap.xml.js).
  // No deploy do GitHub Pages, SITE_URL aponta para o endereço publicado (ver .github/workflows/deploy.yml).
  site: process.env.SITE_URL || 'https://www.pharmautility.com.br',

  // Rotas antigas de Utilidades Clean: redirecionamento permanente (301) para a listagem de serviços.
  // Água PW/WFI e Vapor Puro agora têm páginas próprias.
  redirects: {
    '/servicos/qualificacao-utilidades-clean': { status: 301, destination: '/servicos/' },
    '/servicos/qualificacao-utilidades-clean/vapor-puro': { status: 301, destination: '/servicos/' },
    '/servicos/qualificacao-utilidades-clean/agua-pw-wfi': { status: 301, destination: '/servicos/' },
    // Slugs renomeados para os termos mais buscados (SEO).
    '/servicos/portfolio-gxp-validacao': { status: 301, destination: '/servicos/validacao-gxp/' },
    '/servicos/cabines-fluxos-contencao': { status: 301, destination: '/servicos/qualificacao-cabines-fluxo-laminar-contencao/' },
  },
  // Obs.: em hospedagem estática estes redirecionamentos viram páginas com meta refresh.
  // Na Vercel, public/vercel.json aplica o 301 real no servidor.

  // CSS embutido no HTML: elimina a requisição que bloqueava a renderização
  // e deixa o navegador descobrir as fontes logo na primeira resposta (cadeia crítica menor).
  build: { inlineStylesheets: 'always' },

  vite: {
    plugins: [tailwindcss()]
  }
});
