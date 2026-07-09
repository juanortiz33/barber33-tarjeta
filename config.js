// ══════════════════════════════════════════════════════════
// Barber 33 — Configuración de la Tarjeta Digital de Lealtad
// Edita estos valores para personalizar los enlaces de contacto.
// ══════════════════════════════════════════════════════════
const BARBER33_CONFIG = {
  nombreNegocio: 'Barber 33',

  // Número real de WhatsApp del negocio (código de país + número, sin "+").
  whatsappNumero: '529811784929',

  // PIN que el barbero teclea en la tarjeta del cliente para sumar/canjear un corte.
  // TODO: cámbialo por uno propio antes de imprimir el QR de recepción.
  staffPin: '3033',

  mensajeAgendar(nombre) {
    return `Hola Barber 33 👋, soy ${nombre || 'un cliente'} y quiero agendar una cita.`;
  },

  mensajeContacto(nombre) {
    return `Hola Barber 33 👋, soy ${nombre || 'un cliente'}, tengo una pregunta sobre mi tarjeta de lealtad.`;
  },
};
