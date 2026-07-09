// ══════════════════════════════════════════════════════════
// Barber 33 — Configuración de la Tarjeta Digital de Lealtad
// Edita estos valores para personalizar los enlaces de contacto.
// ══════════════════════════════════════════════════════════
const BARBER33_CONFIG = {
  nombreNegocio: 'Barber 33',

  // URL del servidor Flask de la barbería (red local).
  // La tarjeta digital intenta sincronizar cuando el celular está en la WiFi del negocio.
  servidorUrl: 'http://192.168.1.10:5000',

  // Número real de WhatsApp del negocio (código de país + número, sin "+").
  whatsappNumero: '529811784929',

  // PIN que el barbero teclea en la tarjeta del cliente para sumar/canjear un corte.
  staffPin: '3033',

  mensajeAgendar(nombre) {
    return `Hola Barber 33 👋, soy ${nombre || 'un cliente'} y quiero agendar una cita.`;
  },

  mensajeContacto(nombre) {
    return `Hola Barber 33 👋, soy ${nombre || 'un cliente'}, tengo una pregunta sobre mi tarjeta de lealtad.`;
  },
};
