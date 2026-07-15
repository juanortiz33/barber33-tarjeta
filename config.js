const BARBER33_CONFIG = {
  nombreNegocio: 'Barber 33',

  paginasUrl: 'https://juanortiz33.github.io/barber33-tarjeta/',

  servidorLocal: 'http://192.168.1.10:5000',

  servidorUrl: (() => {
    const h = window.location.hostname;
    if (h && h !== 'localhost' && !h.endsWith('.github.io')) return window.location.origin;
    if (h === 'localhost') return window.location.origin;
    return '';
  })(),

  async detectarServidor() {
    const urls = [this.servidorUrl, this.servidorLocal].filter(Boolean);
    for (const url of urls) {
      try {
        const r = await fetch(`${url}/api/tarjeta-digital/info`, { signal: AbortSignal.timeout(2500) });
        if (r.ok) { this._servidorActivo = url; return url; }
      } catch {}
    }
    this._servidorActivo = '';
    return '';
  },

  getServidor() {
    if (this._servidorActivo !== undefined) return this._servidorActivo;
    return this.servidorUrl || this.servidorLocal;
  },

  whatsappNumero: '529811784929',

  staffPin: '3033',

  mensajeAgendar(nombre) {
    return `Hola Barber 33 👋, soy ${nombre || 'un cliente'} y quiero agendar una cita.`;
  },

  mensajeContacto(nombre) {
    return `Hola Barber 33 👋, soy ${nombre || 'un cliente'}, tengo una pregunta sobre mi tarjeta de lealtad.`;
  },
};
