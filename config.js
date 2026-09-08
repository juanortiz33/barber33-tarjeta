var BARBER33_CONFIG = {
  nombreNegocio: 'Barber 33',

  paginasUrl: 'https://tarjeta.barber33.net/',

  servidorLocal: 'https://barber33.net',

  servidorNube: 'https://barber33.net',

  servidorUrl: (function() {
    var h = window.location.hostname;
    if (h === 'localhost') return window.location.origin;
    if (h && h.indexOf('.github.io') === -1 && h.indexOf('tarjeta.') === -1 && h.indexOf('pages.dev') === -1) return window.location.origin;
    return '';
  })(),

  _servidorActivo: undefined,

  detectarServidor: function() {
    var self = this;
    var urls = [];
    if (self.servidorUrl) urls.push(self.servidorUrl);
    if (self.servidorLocal && self.servidorLocal !== self.servidorUrl) urls.push(self.servidorLocal);
    if (self.servidorNube) urls.push(self.servidorNube);
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
          if (!r.ok) return intentar();
          var ct = r.headers.get('content-type') || '';
          if (ct.indexOf('json') === -1) return intentar();
          self._servidorActivo = url;
          return url;
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
