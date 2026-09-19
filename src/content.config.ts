import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Bloques de contenido reutilizables entre servicios, soluciones y cobertura. */
const bloque = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('prosa'),
    h2: z.string(),
    parrafos: z.array(z.string()).min(1),
    nota: z.string().optional(),
    enlace: z.object({ texto: z.string(), href: z.string() }).optional(),
  }),
  z.object({
    tipo: z.literal('tarjetas'),
    h2: z.string(),
    intro: z.string().optional(),
    items: z.array(z.object({ titulo: z.string(), texto: z.string() })).min(2),
    nota: z.string().optional(),
    enlace: z.object({ texto: z.string(), href: z.string() }).optional(),
  }),
  z.object({
    tipo: z.literal('lista'),
    h2: z.string(),
    intro: z.string().optional(),
    items: z.array(z.object({ titulo: z.string(), texto: z.string() })).min(2),
    nota: z.string().optional(),
    enlace: z.object({ texto: z.string(), href: z.string() }).optional(),
  }),
]);

const faq = z.array(z.object({ p: z.string(), r: z.string() }));

const seo = z.object({
  title: z.string().max(60),
  description: z.string().max(160),
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    orden: z.number(),
    nombre: z.string(),
    nombreCorto: z.string(),
    icono: z.string(),
    seo,
    h1: z.string(),
    subtitulo: z.string(),
    botones: z.object({
      primario: z.object({ texto: z.string(), href: z.string() }),
      secundario: z.object({ texto: z.string(), href: z.string() }),
    }),
    whatsapp: z.string(),
    serviceType: z.string(),
    secciones: z.array(bloque),
    faq,
  }),
});

const soluciones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/soluciones' }),
  schema: z.object({
    orden: z.number(),
    nombre: z.string(),
    resumen: z.string(),
    icono: z.string(),
    seo,
    h1: z.string(),
    subtitulo: z.string(),
    whatsapp: z.string(),
    secciones: z.array(bloque),
    serviciosRelacionados: z.array(z.string()).min(1),
  }),
});

const cobertura = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cobertura' }),
  schema: z.object({
    orden: z.number(),
    municipio: z.string(),
    seo,
    /** Línea corta para la tarjeta del hub /cobertura/. */
    resumen: z.string(),
    /** Párrafo de apertura, único por municipio. */
    apertura: z.array(z.string()).min(1),
    /** Perfil dominante de la zona. */
    perfil: z.object({
      h2: z.string(),
      parrafos: z.array(z.string()).min(1),
    }),
    /** Zonas y colonias reales que se mencionan. */
    zonas: z.array(z.string()).min(2),
    /** Servicio que se destaca en ese municipio. */
    destacado: z.object({ slug: z.string(), razon: z.string() }),
  }),
});

export const collections = { servicios, soluciones, cobertura };
