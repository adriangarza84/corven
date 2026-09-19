/** Tipos de bloque de contenido compartidos por servicios, soluciones y cobertura. */
export type Item = { titulo: string; texto: string };
export type Enlace = { texto: string; href: string };

export type Bloque =
  | { tipo: 'prosa'; h2: string; parrafos: string[]; nota?: string; enlace?: Enlace }
  | { tipo: 'tarjetas'; h2: string; intro?: string; items: Item[]; nota?: string; enlace?: Enlace }
  | { tipo: 'lista'; h2: string; intro?: string; items: Item[]; nota?: string; enlace?: Enlace };
