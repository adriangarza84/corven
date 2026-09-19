import { PRECIOS } from './pendientes';

export type Plan = {
  slug: string;
  nombre: string;
  /** Precio "desde" mensual, o null mientras siga pendiente. */
  desde: number | null;
  /** El plan Empresa se cotiza siempre a la medida, no lleva precio. */
  aLaMedida: boolean;
  destacado: boolean;
  etiqueta?: string;
  para: string;
  incluye: string[];
  boton: string;
};

export const PLANES: Plan[] = [
  {
    slug: 'casa',
    nombre: 'Corven Casa',
    desde: PRECIOS.casa?.desde ?? null,
    aLaMedida: false,
    destacado: false,
    para: 'Para casa habitación y departamento.',
    incluye: [
      'Monitoreo 24/7 desde nuestra central',
      'Verificación por operador y aviso a tus contactos',
      'Aviso a la autoridad ante evento confirmado',
      'App para armar, desarmar y ver historial',
      'Notificación de cada armado y desarmado',
      'Soporte técnico telefónico',
    ],
    boton: 'Cotizar plan Casa',
  },
  {
    slug: 'negocio',
    nombre: 'Corven Negocio',
    desde: PRECIOS.negocio?.desde ?? null,
    aLaMedida: false,
    destacado: true,
    etiqueta: 'El más contratado',
    para: 'Para comercios, oficinas y operaciones con horario.',
    incluye: [
      'Todo lo del plan Casa',
      'Reporte de apertura y cierre diario',
      'Aviso por armado o desarmado fuera de horario',
      'Verificación en video cuando hay cámaras integradas',
      'Usuarios diferenciados con registro de quién armó y desarmó',
      'Reporte mensual de eventos',
    ],
    boton: 'Cotizar plan Negocio',
  },
  {
    slug: 'empresa',
    nombre: 'Corven Empresa',
    desde: null,
    aLaMedida: true,
    destacado: false,
    para: 'Para industria, naves, corporativos, planteles y multisucursal.',
    incluye: [
      'Todo lo del plan Negocio',
      'Cuenta consolidada para varias ubicaciones',
      'Protocolo de atención diseñado para tu operación',
      'Integración de alarma, CCTV, control de acceso y detección de incendio',
      'Reportes de acceso y asistencia',
    ],
    boton: 'Hablar con un asesor',
  },
];
