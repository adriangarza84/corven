# Corven — sitio web

Sitio estático en Astro 5 para [corven.mx](https://corven.mx), construido a partir de
`corven-contenido-web-completo.md` (versión 1.0, septiembre 2026).

27 páginas de contenido más dos legales y una 404, con redirecciones desde las rutas
heredadas del sitio anterior.

---

## Arrancar

```bash
npm install
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | servidor de desarrollo |
| `npm run build` | construye a `dist/` |
| `npm run preview` | sirve `dist/` |
| `npm run check` | revisión de tipos de Astro |
| `npm run auditar` | audita `dist/`: enlaces rotos, metadatos, encabezados, JSON-LD |
| `npm run pendientes` | reporta qué falta de Corven; falla si hay críticos abiertos |
| `npm run prelanzamiento` | build + auditar + pendientes, en ese orden |

`npm run prelanzamiento` es la compuerta antes de publicar. Termina con código 1
mientras quede un pendiente crítico, así que sirve tal cual en un pipeline.

---

## Cómo está organizado

```
src/
├── components/
│   ├── layout/   Header (mega-menús), MobileNav, Footer
│   ├── blocks/   Hero, ServiceGrid, ProtocolTimeline, PlanCards, FaqAccordion,
│   │             TrustBar, ClosingCta, CoverageChips, MapaCobertura,
│   │             PanelCentral, Secciones, PageHero, Breadcrumbs,
│   │             FormularioContacto, PaginaLegal
│   └── ui/       Icon, Logo, WhatsAppFlotante, iconos.ts
├── content/      servicios (4), soluciones (5), cobertura (10) — Markdown tipado
├── data/         site.ts, planes.ts, pendientes.ts, schema.ts, logo.ts, legales.ts
├── layouts/      BaseLayout, ServiceLayout, SolutionLayout, CoverageLayout
├── pages/        rutas estáticas + [slug] por colección
└── styles/       tokens.css, fuentes.css, global.css
```

### Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Teléfonos, correo, dirección, horarios | `src/data/site.ts` — se escriben **una sola vez** y se importan en header, footer, contacto y schema |
| Navegación y municipios | `src/data/site.ts` |
| Texto de un servicio o solución | `src/content/servicios/*.md`, `src/content/soluciones/*.md` |
| Texto de un municipio | `src/content/cobertura/*.md` |
| Planes y su contenido | `src/data/planes.ts` |
| Colores, tipografía, radios | `src/styles/tokens.css` |
| Datos estructurados | `src/data/schema.ts` |

**Agregar un municipio** es agregar un `.md` en `src/content/cobertura/` y una entrada en
`MUNICIPIOS` de `site.ts`. La página, el sitemap, los chips y la franja del footer salen solos.

El esquema de cada colección está en `src/content.config.ts` y es tipado: si falta un campo
o un `title` pasa de 60 caracteres, el build falla.

---

## Lo que está pendiente de Corven

El documento de contenido marca como `[DEFINIR]` la información que Corven todavía debe
entregar, con una regla explícita: **no se publica ni se inventa**; si sigue pendiente, se
oculta la sección completa en vez de dejar un placeholder visible.

Eso está implementado con banderas en `src/data/pendientes.ts`. Cada una controla una
sección real. Al recibir el dato se cambia el valor ahí y la sección aparece sola, sin
tocar componentes.

```bash
npm run pendientes   # qué falta y qué sección está afectada
```

Estado actual de los críticos:

| # | Pendiente | Efecto mientras siga abierto |
|---|---|---|
| 1 | Precios "desde" de Casa y Negocio | las tarjetas se publican sin cifra; el `Offer` del schema va sin `price` |
| 5 | Aviso de privacidad | **el formulario de contacto no se publica**; `/contacto/` ofrece teléfono y WhatsApp |
| 6 | Fotografía de la central | home y `/monitoreo/` usan una representación de consola, no una foto de banco |
| 12 | Ficha de Google Business | revisar a mano que coincida carácter por carácter con el `LocalBusiness` |
| 15 | Destino del formulario | `FORM_ENDPOINT` vacío en `site.ts`: el formulario valida pero no transmite |

Dos aclaraciones sobre pendientes que se resolvieron sin inventar nada:

- **Correo (#2).** `contacto@corven.mx` ya está publicado en el sitio actual, ofuscado con
  el *email-protection* de Cloudflare. Se tomó de ahí. Falta que Corven confirme que es el
  buzón correcto para los leads del sitio.
- **Logotipo vectorial (#3) y color de acento (#4).** No existía SVG publicado, así que se
  trazó el contorno de `corven-logo.webp` y se verificó rasterizándolo de vuelta contra el
  original: 0.014 % de píxeles de diferencia. Está en `src/data/logo.ts`. El wordmark es
  monocromático blanco, sin acento que extraer, así que —siguiendo la instrucción de la
  sección 2 del documento— se adoptó `--corven-armed` (`#2E9E63`) como color de acción. Si
  Corven localiza el archivo original, se sustituye el trazado.

### Para publicar el formulario

1. Pegar el aviso de privacidad en `AVISO_PRIVACIDAD` de `src/data/legales.ts`.
2. Poner `AVISO_PRIVACIDAD_PUBLICADO = true` en `src/data/pendientes.ts`.
3. Poner la URL de destino en `FORM_ENDPOINT` de `src/data/site.ts`.

El formulario ya trae validación en cliente, honeypot antioculto (`empresa_web`, que se
descarta antes de enviar), confirmación en la misma página sin redireccionar, y el evento
`generate_lead` disparado **con la respuesta exitosa**, no con el clic. Falta la validación
en servidor, que vive en el destino que se configure.

---

## SEO

- Sitemap con `@astrojs/sitemap`, excluyendo las dos páginas legales; `robots.txt` apunta a él.
- Canónica absoluta, Open Graph y Twitter Card en `BaseLayout`, con imagen por defecto
  (`/og/og-default.png`, generada a partir del logotipo) y posibilidad de sobreescribir por página.
- `lang="es-MX"`, breadcrumbs visibles y marcados en todas las páginas internas.
- Schema por tipo de página: `Organization` + `BreadcrumbList` en todas; `LocalBusiness`
  en `/`, `/contacto/`, `/cobertura/` y cada municipio; `Service` en las páginas de
  servicio; `FAQPage` donde hay acordeón; `Offer` por plan en `/planes/`.
- Las diez páginas de cobertura tienen contenido propio —apertura, zonas reales, perfil
  dominante y servicio destacado—, no una plantilla con el nombre cambiado.

### Antes de lanzar

Exportar de Search Console la lista de URLs del sitio actual con impresiones y verificar que
cada una tenga destino en `redirects` de `astro.config.mjs`. Ojo con una trampa: como el
sitio usa `trailingSlash: 'always'`, una redirección `'/contacto'` genera el mismo archivo
que la página real `/contacto/` y la sobrescribe. La normalización de la diagonal final se
deja al hosting.

El único ancla indexada del sitio anterior es `#contacto`; los hashes no llegan al servidor,
así que los resuelve un script en `src/pages/index.astro`.

---

## Analítica

Contenedor GTM existente: **GTM-WK2GKZC3**, declarado en `src/data/site.ts`.

| Evento | Cuándo se dispara | Dónde |
|---|---|---|
| `generate_lead` | respuesta exitosa del envío | `FormularioContacto.astro` |
| `click_whatsapp` | clic en cualquier enlace de WhatsApp, con `origen` | `BaseLayout.astro` (delegación) |
| `click_telefono` | clic en cualquier `tel:`, con `origen` y `numero` | `BaseLayout.astro` (delegación) |
| `ver_planes` | carga de `/planes/` | `BaseLayout.astro` |
| `scroll_protocolo` | la sección de protocolo entra en viewport | `ProtocolTimeline.astro` |

Los enlaces llevan `data-origen` para saber desde qué bloque se hizo el clic.

---

## Decisiones de implementación

**Sin framework de UI.** Menú móvil, mega-menús, acordeones, carrusel y formulario están
resueltos con JavaScript vanilla en el `<script>` de cada componente. No hay islas.

**Una sola animación no disparada por el usuario:** la secuencia del protocolo en el home.
Se enciende una vez al entrar en viewport y respeta `prefers-reduced-motion`, en cuyo caso
los cuatro pasos aparecen ya encendidos. No hay fade-and-slide-up sección por sección.

**Tipografía servida localmente.** Sora e Inter variables en `public/fuentes/`, con
`font-display: swap`, precarga del subconjunto latino y respaldos con métricas ajustadas
para no generar desplazamiento de contenido.

**El mapa de cobertura** dibuja los diez municipios desde sus coordenadas reales con una
proyección corregida por la latitud, así que las posiciones relativas son correctas. Es un
diagrama de cobertura, no una carta topográfica: no traza límites municipales. No es
interactivo y no carga nada externo. El mapa embebido de Google, en `/contacto/`, se carga
solo al hacer clic, para no castigar el LCP.

**Accesibilidad.** Enlace de salto al contenido, foco visible en todo elemento interactivo,
mega-menús y acordeones operables con teclado y cerrables con Escape, foco atrapado en el
menú móvil y devuelto al disparador al cerrar. Contraste AA verificado: el texto normal y
los rótulos esenciales quedan por encima de 4.5:1 sobre fondo oscuro. `--corven-text-mute`
(4.09:1) se reserva para metadatos, como indica el sistema de diseño, y el rojo de alerta
tiene una variante clara `--corven-alert-txt` para texto, dejando el token semántico intacto.

**Lo que el sitio no promete.** No hay guardias, no hay reacción armada, no hay
certificaciones. La nota del protocolo y el bloque "Qué no incluye" de `/planes/` se
publican tal cual, sin suavizar.

---

## Despliegue

Salida estática en `dist/`. Sirve en cualquier hosting de archivos.

Conviene configurar en el hosting:

- Normalización de diagonal final (el sitio usa `trailingSlash: 'always'`).
- Las redirecciones de `astro.config.mjs` se generan como páginas de meta-refresh. Si el
  hosting soporta 301 reales (Netlify `_redirects`, Vercel `vercel.json`, Cloudflare Pages),
  declararlas ahí también: un 301 de servidor transfiere autoridad mejor que un meta-refresh.
- Caché larga para `/_astro/*` y `/fuentes/*` (contenido con hash o inmutable).

---

Diseño y desarrollo por Futurité.
