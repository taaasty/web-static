const SEVERITY_INFO_TYPE = 'info',
      SEVERITY_ERROR_TYPE = 'error',
      SEVERITY_WARNING_TYPE = 'warning';

let ErrorService = {
  remoteService: global.Bugsnag || null,

  notify(name, meta, stacktrace, severity) {
    if (this.remoteService != null && this.remoteService.notify) {
      this.remoteService.notify(name, meta, stacktrace, severity);
    } else {
      console.group(`[${severity}] ${name}`);
      if (meta != null && Object.keys(meta).length) console.log('Meta:', meta);
      if (stacktrace != null && Object.keys(stacktrace).length) console.error('Stacktrace:', stacktrace);
      console.groupEnd();
    }
  },

  notifyErrorResponse(name, meta = {}, stacktrace = {}) {
    this.notifyError('[AJAX] ' + name, meta, stacktrace);
  },

  notifyError(name, meta = {}, stacktrace = {}) {
    this.notify(name, meta, stacktrace, 'error');
  },

  notifyWarning(name, meta = {}, stacktrace = {}) {
    this.notify(name, meta, stacktrace, 'warning');
  },

  notifyException(e, name) {
    if (this.remoteService != null && this.remoteService.notifyException) {
      this.remoteService.notifyException(e, name);
    }
  }
};

export default ErrorService;