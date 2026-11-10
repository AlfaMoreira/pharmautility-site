// robots.txt gerado no build: libera o rastreamento e indica o endereço absoluto do sitemap.
export function GET({ site }) {
  const base = site ? site.href.replace(/\/$/, '') : '';
  const corpo = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
