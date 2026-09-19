/**
 * Auditoría del sitio construido: enlaces internos, metadatos, jerarquía de
 * encabezados, imágenes con alt y datos estructurados.
 *
 *   npm run build && npm run auditar
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const fallos = [];
const avisos = [];

function paginas(dir = DIST) {
  const out = [];
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) out.push(...paginas(ruta));
    else if (entrada.endsWith('.html')) out.push(ruta);
  }
  return out;
}

const archivos = paginas();
const rutas = new Set(
  archivos.map((f) => '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/'))
);

const texto = (h, re) => (h.match(re) ?? [])[1];

for (const archivo of archivos) {
  const url = '/' + relative(DIST, archivo).replace(/index\.html$/, '');
  const html = readFileSync(archivo, 'utf8');
  const en = (m) => fallos.push(`${url} — ${m}`);
  const ojo = (m) => avisos.push(`${url} — ${m}`);

  // Las páginas de redirección son cascarones de meta-refresh: no se auditan.
  if (/http-equiv="refresh"/.test(html)) continue;

  // --- Metadatos
  const title = texto(html, /<title>([^<]*)<\/title>/);
  if (!title) en('sin <title>');
  else if (title.length > 60) ojo(`title de ${title.length} caracteres (máx 60): ${title}`);

  const desc = texto(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) en('sin meta description');
  else if (desc.length > 155) ojo(`meta description de ${desc.length} caracteres (máx 155)`);

  if (!/rel="canonical"/.test(html)) en('sin canónica');
  if (!/<html lang="es-MX">/.test(html)) en('sin lang="es-MX"');
  if (!/property="og:image"/.test(html)) en('sin og:image');

  // --- Encabezados
  const h1 = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)];
  if (h1.length === 0) en('sin h1');
  if (h1.length > 1) en(`${h1.length} etiquetas h1`);

  // --- Imágenes con alt real
  for (const [etiqueta] of html.matchAll(/<img[^>]*>/g)) {
    if (!/\salt="/.test(etiqueta)) en(`<img> sin alt: ${etiqueta.slice(0, 80)}`);
  }

  // --- Enlaces internos
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (href.startsWith('/_astro') || /\.(xml|txt|ico|svg|png|webp|woff2?|json)$/.test(href)) continue;
    const destino = href.endsWith('/') ? href : href + '/';
    if (!rutas.has(destino) && !existsSync(join(DIST, href))) {
      en(`enlace roto: ${href}`);
    }
  }

  // --- Datos estructurados
  const ld = texto(html, /<script type="application\/ld\+json">(.*?)<\/script>/s);
  if (!ld) en('sin JSON-LD');
  else {
    try {
      const datos = JSON.parse(ld);
      const tipos = (datos['@graph'] ?? []).map((n) => n['@type']);
      if (!tipos.includes('Organization')) en('JSON-LD sin Organization');
      const sinMigas = url === '/' || url.startsWith('/aviso') || url.startsWith('/terminos') || url === '/404.html';
      if (!sinMigas && !tipos.includes('BreadcrumbList')) en('JSON-LD sin BreadcrumbList');
    } catch (e) {
      en(`JSON-LD inválido: ${e.message}`);
    }
  }

  // --- Accesibilidad básica
  if (!/class="saltar"/.test(html)) en('sin enlace de salto al contenido');
  for (const [etiqueta] of html.matchAll(/<button[^>]*aria-expanded[^>]*>/g)) {
    if (!/aria-controls|data-mega-boton/.test(etiqueta)) {
      ojo(`botón con aria-expanded sin aria-controls: ${etiqueta.slice(0, 70)}`);
    }
  }
}

// --- Cobertura de rutas esperadas
const esperadas = [
  '/', '/monitoreo/', '/servicios/', '/soluciones/', '/planes/', '/cobertura/',
  '/nosotros/', '/contacto/', '/aviso-de-privacidad/', '/terminos-y-condiciones/',
  '/servicios/alarmas-monitoreo/', '/servicios/cctv-camaras-seguridad/',
  '/servicios/control-de-acceso/', '/servicios/deteccion-de-incendio/',
  '/soluciones/casa-y-residencial/', '/soluciones/comercio-y-retail/',
  '/soluciones/industria-y-naves/', '/soluciones/oficinas-y-corporativos/',
  '/soluciones/escuelas/',
  ...['monterrey', 'san-pedro-garza-garcia', 'san-nicolas-de-los-garza', 'guadalupe',
    'santa-catarina', 'apodaca', 'general-escobedo', 'garcia', 'juarez', 'santiago']
    .map((m) => `/cobertura/${m}/`),
];
for (const r of esperadas) if (!rutas.has(r)) fallos.push(`falta la página ${r}`);

// --- Sitemap sin páginas legales
const sitemap = join(DIST, 'sitemap-0.xml');
if (existsSync(sitemap)) {
  const xml = readFileSync(sitemap, 'utf8');
  if (/aviso-de-privacidad|terminos-y-condiciones/.test(xml)) {
    fallos.push('el sitemap incluye páginas legales');
  }
}

const C = { rojo: '\x1b[31m', ambar: '\x1b[33m', verde: '\x1b[32m', gris: '\x1b[90m', fin: '\x1b[0m' };
console.log(`\n${C.gris}Auditoría de ${archivos.length} páginas construidas${C.fin}\n`);
for (const f of fallos) console.log(`  ${C.rojo}fallo${C.fin}  ${f}`);
for (const a of avisos) console.log(`  ${C.ambar}aviso${C.fin}  ${a}`);
if (!fallos.length && !avisos.length) console.log(`  ${C.verde}Sin observaciones.${C.fin}`);
console.log(`\n  ${fallos.length} fallo(s), ${avisos.length} aviso(s).\n`);
process.exit(fallos.length ? 1 : 0);
