/* ---------------------------------------------------------------------------
   Set de iconos de linea de Corven.

   Mismo grosor de trazo (1.5), esquinas ligeramente redondeadas, sin color
   propio: heredan `currentColor` (seccion 2 e instruccion de la seccion 14).
   Se renderizan con el componente `Icon.astro`.
   --------------------------------------------------------------------------- */

export const ICONOS = {
  /* --- Servicios --- */
  escudo: `<path d="M12 3 4.5 6v5.4c0 4.3 3 8.3 7.5 9.6 4.5-1.3 7.5-5.3 7.5-9.6V6L12 3Z"/><path d="M9.2 12.2a3.6 3.6 0 0 1 5.6 0"/><path d="M11 14.6a1.4 1.4 0 0 1 2 0"/>`,
  camara: `<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2L9 4h6l1.5 2h2A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-8Z"/><circle cx="12" cy="12.5" r="3.4"/>`,
  acceso: `<path d="M5 3.5h10a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5V3.5Z"/><path d="M16 12h4"/><path d="M18 9.8 20.2 12 18 14.2"/><path d="M9 9.2a2.2 2.2 0 0 1 2.2 2.2c0 1.6-.5 3.1-1.4 4.4"/><path d="M7 11.4a2 2 0 0 1 .6-1.5"/><path d="M11.2 15.2c.5-1.2.7-2.5.6-3.8"/>`,
  incendio: `<path d="M12 21c3 0 5.2-2.1 5.2-4.9 0-3.4-3.4-4.6-2.8-8.2C11.6 9.3 12.7 11 11 12.4c-1-.8-1.2-2-1-3.3-1.7 1.4-3.4 3.4-3.4 6.9C6.6 18.9 9 21 12 21Z"/><path d="M19.5 5.5 21 4"/><path d="M4.5 5.5 3 4"/>`,
  /* --- Tecnología --- */
  app: `<rect x="7" y="2.8" width="10" height="18.4" rx="2"/><path d="M10.8 5.4h2.4"/><path d="M9.6 11.3l1.8 1.8 3.4-3.4"/>`,
  mascota: `<ellipse cx="12" cy="16.2" rx="3.4" ry="3"/><ellipse cx="6.6" cy="12.4" rx="1.7" ry="2.1"/><ellipse cx="17.4" cy="12.4" rx="1.7" ry="2.1"/><ellipse cx="9.4" cy="8.2" rx="1.6" ry="2"/><ellipse cx="14.6" cy="8.2" rx="1.6" ry="2"/>`,
  bateria: `<rect x="2.5" y="7.5" width="16" height="9" rx="2"/><path d="M21.5 11v2"/><path d="M11 9.4 8.6 12.6h2.8L9 14.8"/>`,
  antena: `<path d="M12 12.5v8"/><circle cx="12" cy="10.2" r="1.8"/><path d="M8.4 6.6a5.1 5.1 0 0 0 0 7.2"/><path d="M15.6 6.6a5.1 5.1 0 0 1 0 7.2"/><path d="M5.8 4a8.8 8.8 0 0 0 0 12.4"/><path d="M18.2 4a8.8 8.8 0 0 1 0 12.4"/>`,
  reloj: `<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.1 1.9"/>`,
  reporte: `<path d="M6 3.4h8l4 4v13.2H6V3.4Z"/><path d="M14 3.4v4h4"/><path d="M9 12.8v4"/><path d="M12 10.6v6.2"/><path d="M15 14.4v2.4"/>`,
  llave: `<circle cx="8" cy="15.6" r="3.4"/><path d="M10.4 13.2 19 4.6"/><path d="M16.6 7l2 2"/><path d="M14.4 9.2l2 2"/>`,
  vehiculo: `<path d="M3.6 15.5v-3l1.9-4.3A1.6 1.6 0 0 1 7 7.2h10a1.6 1.6 0 0 1 1.5 1l1.9 4.3v3"/><path d="M3.6 15.5h16.8v2.2h-3.2v-2.2M6.8 17.7H3.6v-2.2"/><path d="M6.6 12.3h10.8"/>`,
  extintor: `<path d="M9 8.4h5v12.2H9V8.4Z"/><path d="M11.5 8.4V5.6h3"/><path d="M14.5 5.6c1.6 0 2.6.9 2.6 2.3v1.5"/><path d="M9 11.8h5"/>`,
  credencial: `<rect x="3" y="5.5" width="18" height="13" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M5.8 15.6a3.4 3.4 0 0 1 6.4 0"/><path d="M14.8 10.4h3.6"/><path d="M14.8 13.6h2.4"/>`,
  /* --- Estados y UI --- */
  senal: `<circle cx="12" cy="12" r="2"/><path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8"/><path d="M15.4 8.6a4.8 4.8 0 0 1 0 6.8"/><path d="M5.8 5.8a8.8 8.8 0 0 0 0 12.4"/><path d="M18.2 5.8a8.8 8.8 0 0 1 0 12.4"/>`,
  verificar: `<circle cx="11" cy="11" r="6.6"/><path d="M15.8 15.8 20.5 20.5"/><path d="M8.3 11.1l1.9 1.9 3.6-3.6"/>`,
  telefono: `<path d="M6.3 3.8h3l1.5 3.7-1.9 1.4a11 11 0 0 0 5.2 5.2l1.4-1.9 3.7 1.5v3a1.8 1.8 0 0 1-2 1.8C10.9 17.8 6.2 13.1 5.4 5.8a1.8 1.8 0 0 1 .9-2Z"/>`,
  sirena: `<path d="M6.5 18.5v-5a5.5 5.5 0 0 1 11 0v5"/><path d="M4.5 18.5h15"/><path d="M12 5.5V3"/><path d="M18.5 8 20.4 6.6"/><path d="M5.5 8 3.6 6.6"/>`,
  panel: `<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M3.5 9h17"/><path d="M7 13h5"/><path d="M7 16.3h3"/><circle cx="16.8" cy="6.5" r="1"/>`,
  ubicacion: `<path d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.6 12 21 12 21Z"/><circle cx="12" cy="10.6" r="2.4"/>`,
  edificio: `<path d="M4 20.5V5.2l8-2.7v18M12 20.5h8V9.4l-8-2.6"/><path d="M2.6 20.5h18.8"/><path d="M7 8.6v.01M7 12v.01M7 15.4v.01M16 12v.01M16 15.4v.01"/>`,
  casa: `<path d="M4 10.4 12 4l8 6.4V20a.9.9 0 0 1-.9.9H4.9A.9.9 0 0 1 4 20v-9.6Z"/><path d="M9.6 20.9v-6h4.8v6"/>`,
  tienda: `<path d="M4 9.6V20a.9.9 0 0 0 .9.9h14.2a.9.9 0 0 0 .9-.9V9.6"/><path d="M3 9.6 4.8 4h14.4L21 9.6a2.6 2.6 0 0 1-4.5 1.8 2.6 2.6 0 0 1-4.5-1.8 2.6 2.6 0 0 1-4.5 1.8A2.6 2.6 0 0 1 3 9.6Z"/>`,
  nave: `<path d="M2.6 20.9V11l9.4-4.4V20.9"/><path d="M12 20.9h9.4v-6.4L12 11"/><path d="M6.2 14.6v3M9 14.6v3M15.4 16v2"/>`,
  escuela: `<path d="m12 3 9 4.2-9 4.2-9-4.2L12 3Z"/><path d="M6.5 9.6v5.7c0 2 2.5 3.4 5.5 3.4s5.5-1.4 5.5-3.4V9.6"/><path d="M21 7.2v5.4"/>`,
  flecha: `<path d="M4.5 12h14"/><path d="m13.6 7.1 4.9 4.9-4.9 4.9"/>`,
  chevron: `<path d="m6.5 9.5 5.5 5.5 5.5-5.5"/>`,
  menu: `<path d="M3.5 7h17M3.5 12h17M3.5 17h17"/>`,
  cerrar: `<path d="m6 6 12 12M18 6 6 18"/>`,
  check: `<path d="m4.5 12.5 5 5 10-11"/>`,
  whatsapp: `<path d="M3.5 20.5l1.3-4.6a8 8 0 1 1 3.1 3l-4.4 1.6Z"/><path d="M9 9.2c.3 2.6 2.4 4.7 5 5.1.6.1 1.2-.3 1.4-.9l.1-.4-1.9-.9-.7.8a5.4 5.4 0 0 1-2.2-2.2l.8-.7-.9-1.9-.4.1c-.6.2-1 .7-.9 1.4"/>`,
} as const;

export type NombreIcono = keyof typeof ICONOS;
