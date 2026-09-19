/**
 * Revisión de pendientes antes de publicar (sección 16 del documento).
 *
 * Lee las banderas de `src/data/pendientes.ts` y `src/data/site.ts` y reporta
 * qué falta. Los pendientes CRÍTICOS impiden publicar: si alguno sigue abierto,
 * el comando termina con código 1 para que un pipeline de despliegue lo detenga.
 *
 *   npm run pendientes          revisa y reporta
 *   npm run pendientes -- --ok  reporta sin fallar (para desarrollo)
 */
import { readFileSync } from 'node:fs';

const leer = (ruta) => readFileSync(new URL(`../${ruta}`, import.meta.url), 'utf8');
const pendientes = leer('src/data/pendientes.ts');
const site = leer('src/data/site.ts');
const legales = leer('src/data/legales.ts');

const bandera = (nombre, fuente = pendientes) =>
  new RegExp(`${nombre}\\s*=\\s*true`).test(fuente);
const arregloVacio = (nombre, fuente = pendientes) =>
  new RegExp(`${nombre}[^=]*=\\s*\\[\\s*\\]`).test(fuente);

const preciosPendientes = /casa:\s*null/.test(pendientes) || /negocio:\s*null/.test(pendientes);
const correoPendiente = /correo:\s*null/.test(site);
const endpointPendiente = /FORM_ENDPOINT\s*=\s*''/.test(site);

const revisiones = [
  { n: 1, critico: true, abierto: preciosPendientes,
    texto: 'Precios "desde" de los planes Casa y Negocio',
    efecto: 'las tarjetas de /planes/ se publican sin precio' },
  { n: 2, critico: true, abierto: correoPendiente,
    texto: 'Correo electrónico de contacto',
    efecto: 'se omite de footer, contacto y schema' },
  { n: 3, critico: false, abierto: true,
    texto: 'Logotipo vectorial original de Corven',
    efecto: 'se usa el trazado hecho a partir del .webp del sitio actual (src/data/logo.ts)' },
  { n: 5, critico: true, abierto: !bandera('AVISO_PRIVACIDAD_PUBLICADO') || arregloVacio('AVISO_PRIVACIDAD', legales),
    texto: 'Aviso de privacidad',
    efecto: 'el formulario de contacto NO se publica; /contacto/ ofrece teléfono y WhatsApp' },
  { n: 5, critico: false, abierto: !bandera('TERMINOS_PUBLICADOS') || arregloVacio('TERMINOS', legales),
    texto: 'Términos y condiciones',
    efecto: 'el enlace del footer queda sin destino' },
  { n: 6, critico: true, abierto: !bandera('FOTOGRAFIA_CENTRAL'),
    texto: 'Fotografía real de la central y de los operadores',
    efecto: 'home y /monitoreo/ usan la representación de consola en vez de foto' },
  { n: 7, critico: false, abierto: arregloVacio('MARCAS'),
    texto: 'Lista de marcas de equipo',
    efecto: 'el bloque de marcas de /nosotros/ no se renderiza' },
  { n: 8, critico: false, abierto: /POLITICA_MANTENIMIENTO[^=]*=\s*null/.test(pendientes),
    texto: 'Política de mantenimiento incluido en la mensualidad',
    efecto: 'falta ese punto en "Qué no incluye" de /planes/' },
  { n: 9, critico: false, abierto: /POLITICA_INSTALACION[^=]*=\s*null/.test(pendientes),
    texto: 'Si la instalación se cobra aparte del equipo',
    efecto: 'falta ese punto en "Qué no incluye" de /planes/' },
  { n: 11, critico: false, abierto: arregloVacio('KODEX_CAPACIDADES'),
    texto: 'Capacidades específicas de la plataforma Kodex',
    efecto: 'la lista de /monitoreo/ no se renderiza' },
  { n: 12, critico: true, abierto: true,
    texto: 'Ficha de Google Business verificada y alineada con el LocalBusiness',
    efecto: 'sin ficha el SEO local rinde una fracción; revisar a mano antes de lanzar' },
  { n: 13, critico: false, abierto: arregloVacio('HISTORIA'),
    texto: 'Historia y fundación de la empresa',
    efecto: 'el bloque de historia de /nosotros/ no se renderiza' },
  { n: 15, critico: true, abierto: endpointPendiente,
    texto: 'Destino de envío del formulario (FORM_ENDPOINT en src/data/site.ts)',
    efecto: 'el formulario valida pero no transmite' },
];

const abiertos = revisiones.filter((r) => r.abierto);
const criticos = abiertos.filter((r) => r.critico);

const C = { rojo: '\x1b[31m', ambar: '\x1b[33m', verde: '\x1b[32m', gris: '\x1b[90m', fin: '\x1b[0m' };

console.log(`\n${C.gris}Pendientes de Corven — revisión previa a publicar${C.fin}\n`);

if (!abiertos.length) {
  console.log(`${C.verde}Todo resuelto. El sitio se puede publicar.${C.fin}\n`);
  process.exit(0);
}

for (const r of abiertos) {
  const etiqueta = r.critico ? `${C.rojo}CRÍTICO${C.fin}` : `${C.ambar}pendiente${C.fin}`;
  console.log(`  [${etiqueta}] #${r.n} ${r.texto}`);
  console.log(`${C.gris}             → ${r.efecto}${C.fin}`);
}

console.log(
  `\n  ${criticos.length} crítico(s), ${abiertos.length - criticos.length} no crítico(s).\n`
);

if (criticos.length && !process.argv.includes('--ok')) {
  console.log(`${C.rojo}  No publicar hasta resolver los críticos.${C.fin}\n`);
  process.exit(1);
}
