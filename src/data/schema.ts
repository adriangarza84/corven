/* ---------------------------------------------------------------------------
   Datos estructurados (sección 15.5).

   La dirección sale de `site.ts` y debe coincidir carácter por carácter con la
   ficha de Google Business de Corven (pendiente #12).
   --------------------------------------------------------------------------- */

import { SITE, CONTACTO, MUNICIPIOS } from './site';

const { direccion } = CONTACTO;

export const ORG_ID = `${SITE.url}/#organizacion`;
export const NEGOCIO_ID = `${SITE.url}/#negocio`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: `${direccion.calle}, ${direccion.edificio}`,
  addressLocality: direccion.municipio,
  addressRegion: direccion.estado,
  postalCode: direccion.cp,
  addressCountry: direccion.pais,
} as const;

const telefonos = [CONTACTO.ventas.tel, CONTACTO.monitoreo.tel];

/** Los diez municipios que Corven atiende. */
export const areaServed = MUNICIPIOS.map((m) => ({
  '@type': 'City',
  name: m.nombre,
  address: { '@type': 'PostalAddress', addressRegion: 'Nuevo León', addressCountry: 'MX' },
}));

export function organizacion() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.nombre,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/corven-logo.svg`,
    description: SITE.descripcion,
    address: postalAddress,
    telephone: telefonos,
    ...(CONTACTO.correo ? { email: CONTACTO.correo } : {}),
    foundingDate: '2001',
    areaServed,
  };
}

export function negocioLocal() {
  return {
    '@type': 'LocalBusiness',
    '@id': NEGOCIO_ID,
    name: SITE.nombre,
    url: `${SITE.url}/`,
    image: `${SITE.url}/og/og-default.png`,
    logo: `${SITE.url}/corven-logo.svg`,
    description: SITE.descripcion,
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: direccion.geo.lat,
      longitude: direccion.geo.lng,
    },
    telephone: telefonos,
    ...(CONTACTO.correo ? { email: CONTACTO.correo } : {}),
    parentOrganization: { '@id': ORG_ID },
    areaServed,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
        name: 'Ventas',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
        name: 'Central de monitoreo',
      },
    ],
  };
}

export function migaDePan(items: { nombre: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nombre,
      item: new URL(item.href, SITE.url).href,
    })),
  };
}

export function servicio(opts: {
  nombre: string;
  descripcion: string;
  serviceType: string;
  url: string;
}) {
  return {
    '@type': 'Service',
    name: opts.nombre,
    description: opts.descripcion,
    serviceType: opts.serviceType,
    url: new URL(opts.url, SITE.url).href,
    provider: { '@id': ORG_ID },
    areaServed,
  };
}

export function preguntasFrecuentes(faq: { p: string; r: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  };
}
