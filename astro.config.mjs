// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://corven.mx',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Sección 15.5: las páginas legales quedan fuera del sitemap.
      filter: (page) =>
        !page.includes('/aviso-de-privacidad/') &&
        !page.includes('/terminos-y-condiciones/'),
      i18n: undefined,
    }),
  ],
  /* Migración desde el sitio actual (sección 15.8).
     El sitio anterior era una landing de una sola página, así que casi todo
     redirige a la home o a su equivalente nuevo. Antes de lanzar hay que
     exportar de Search Console la lista de URLs con impresiones y añadir aquí
     cualquiera que falte. Los destinos con hash (#contacto) no se resuelven en
     servidor: los atiende el script de `src/pages/index.astro`. */
  redirects: {
    /* Rutas heredadas que NO existen hoy. Cuidado: con trailingSlash 'always'
       una redirección como '/contacto' generaría el mismo archivo que la página
       real '/contacto/' y la sobrescribiría, así que la normalización de la
       diagonal final se deja al hosting, no a esta tabla. */
    '/home': '/',
    '/alarmas': '/servicios/alarmas-monitoreo/',
    '/alarmas-monitoreo': '/servicios/alarmas-monitoreo/',
    '/camaras': '/servicios/cctv-camaras-seguridad/',
    '/cctv': '/servicios/cctv-camaras-seguridad/',
    '/camaras-de-seguridad': '/servicios/cctv-camaras-seguridad/',
    '/control-de-acceso': '/servicios/control-de-acceso/',
    '/deteccion-de-incendio': '/servicios/deteccion-de-incendio/',
    '/incendio': '/servicios/deteccion-de-incendio/',
    '/monitoreo-24-7': '/monitoreo/',
    '/precios': '/planes/',
  },

  vite: { plugins: [tailwindcss()] },
  image: { formats: ['avif', 'webp'] },
});
