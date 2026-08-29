var BARBER33_CONFIG = {
  nombreNegocio: 'Barber 33',

  paginasUrl: 'https://barber33.net/tarjeta/',

  servidorLocal: 'https://barber33.net',

  servidorUrl: (function() {
    var h = window.location.hostname;
    if (h && h !== 'localhost' && h.indexOf('.github.io') === -1) return window.location.origin;
    if (h === 'localhost') return window.location.origin;
    return '';
  })(),

  _servidorActivo: undefined,

  detectarServidor: function() {
    var self = this;
    var urls = [];
    if (self.servidorUrl) urls.push(self.servidorUrl);
    if (self.servidorLocal && self.servidorLocal !== self.servidorUrl) urls.push(self.servidorLocal);
    if (window.location.protocol === 'https:') {
      urls = urls.filter(function(u) { return u.indexOf('https://') === 0; });
    }
    if (urls.length === 0) {
      self._servidorActivo = '';
      return Promise.resolve('');
    }
    var idx = 0;
    function intentar() {
      if (idx >= urls.length) {
        self._servidorActivo = '';
        return Promise.resolve('');
      }
      var url = urls[idx];
      idx++;
      var opts = {};
      if (typeof AbortController !== 'undefined') {
        var ac = new AbortController();
        setTimeout(function() { ac.abort(); }, 2500);
        opts.signal = ac.signal;
      }
      return fetch(url + '/api/tarjeta-digital/info', opts)
        .then(function(r) {
          if (r.ok) { self._servidorActivo = url; return url; }
          return intentar();
        })
        .catch(function() { return intentar(); });
    }
    return intentar();
  },

  getServidor: function() {
    if (this._servidorActivo !== undefined) return this._servidorActivo;
    return this.servidorUrl || this.servidorLocal;
  },

  whatsappNumero: '529811784929',

  staffPin: '3033',

  mensajeAgendar: function(nombre) {
    return 'Hola Barber 33, soy ' + (nombre || 'un cliente') + ' y quiero agendar una cita.';
  },

  mensajeContacto: function(nombre) {
    return 'Hola Barber 33, soy ' + (nombre || 'un cliente') + ', tengo una pregunta sobre mi tarjeta de lealtad.';
  }
};
