/**
 * Adapta `dist/` para servirlo desde un subdirectorio (GitHub Pages).
 *
 * El sitio está construido para vivir en la raíz de corven.mx, con rutas
 * absolutas (`/servicios/`, `/_astro/…`, `/fuentes/…`). GitHub Pages lo sirve
 * bajo `/<repo>/`, así que aquí se reescriben esas rutas después del build.
 *
 * Se hace como post-proceso y no con el `base` de Astro a propósito: así la
 * configuración de producción queda intacta y este paso solo corre en el
 * despliegue de vista previa.
 *
 * Además marca toda la vista previa como noindex, para que no compita en
 * buscadores con el sitio real.
 *
 *   node herramientas/base-pages.mjs /corven
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

const base = (process.argv[2] ?? '').replace(/\/+$/, '');
if (!base.startsWith('/')) {
  console.error('Uso: node herramientas/base-pages.mjs /nombre-del-repo');
  process.exit(1);
}

const NOINDEX = '<meta name="robots" content="noindex, nofollow">';

function archivos(dir, ext) {
  const out = [];
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) out.push(...archivos(ruta, ext));
    else if (ext.some((e) => entrada.endsWith(e))) out.push(ruta);
  }
  return out;
}

/* `/algo` sí; `//cdn`, `https://`, `mailto:`, `tel:`, `#ancla` no. */
const RUTA_RAIZ = /(href|src)="(\/(?!\/)[^"]*)"/g;
const RUTA_CSS = /url\((['"]?)(\/(?!\/)[^)'"]*)\1\)/g;

let html = 0;
let css = 0;

for (const archivo of archivos(DIST, ['.html'])) {
  let t = readFileSync(archivo, 'utf8');
  const antes = t;

  t = t.replace(RUTA_RAIZ, (_, attr, ruta) => `${attr}="${base}${ruta}"`);
  t = t.replace(RUTA_CSS, (_, comilla, ruta) => `url(${comilla}${base}${ruta}${comilla})`);

  // El script de anclas heredadas lleva rutas dentro de JavaScript.
  t = t.replace(/'(\/(?:contacto|servicios|nosotros)\/)'/g, `'${base}$1'`);

  if (!/name="robots"/.test(t)) {
    t = t.replace('<meta charset="utf-8">', `<meta charset="utf-8">${NOINDEX}`);
    t = t.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">${NOINDEX}`);
  }

  if (t !== antes) {
    writeFileSync(archivo, t);
    html++;
  }
}

for (const archivo of archivos(DIST, ['.css'])) {
  let t = readFileSync(archivo, 'utf8');
  const antes = t;
  t = t.replace(RUTA_CSS, (_, comilla, ruta) => `url(${comilla}${base}${ruta}${comilla})`);
  if (t !== antes) {
    writeFileSync(archivo, t);
    css++;
  }
}

// La vista previa no se indexa.
writeFileSync(
  join(DIST, 'robots.txt'),
  'User-agent: *\nDisallow: /\n\n# Vista previa. El sitio real es https://corven.mx\n'
);

console.log(`Base "${base}" aplicada: ${html} HTML, ${css} CSS. robots.txt en Disallow.`);
