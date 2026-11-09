// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Domínio público usado no sitemap (src/pages/sitemap.xml.js).
  // No deploy do GitHub Pages, SITE_URL aponta para o endereço publicado (ver .github/workflows/deploy.yml).
  site: process.env.SITE_URL || 'https://pharmautility.com.br',

  // Rotas antigas de Utilidades Clean: redirecionamento permanente (301) para a listagem de serviços.
  // Água PW/WFI e Vapor Puro agora têm páginas próprias.
  redirects: {
    '/servicos/qualificacao-utilidades-clean': { status: 301, destination: '/servicos/' },
    '/servicos/qualificacao-utilidades-clean/vapor-puro': { status: 301, destination: '/servicos/' },
    '/servicos/qualificacao-utilidades-clean/agua-pw-wfi': { status: 301, destination: '/servicos/' },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
