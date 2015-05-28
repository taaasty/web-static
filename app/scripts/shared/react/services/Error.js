const SEVERITY_INFO_TYPE = 'info',
      SEVERITY_ERROR_TYPE = 'error',
      SEVERITY_WARNING_TYPE = 'warning';

let ErrorService = {
  remoteService: global.Bugsnag || null,

  notify(name, message, metaData, severity) {
    if (this.remoteService != null && this.remoteService.notify) {
      this.remoteService.notify(name, meta, stacktrace, severity);
    } else {
      console.group(`[${severity}] ${name}`);
      if (meta != null && Object.keys(meta).length) console.log('Meta:', meta);
      if (stacktrace != null && Object.keys(stacktrace).length) console.error('Stacktrace:', stacktrace);
      console.groupEnd();
    }
  },

  notifyErrorResponse(name, metaData = {}) {
    this.notifyError('[AJAX] ' + name, metaData);
  },

  notifyError(name, metaData = {}) {
    this.notify(name, '', metaData, 'error');
  },

  notifyWarning(name, metaData = {}) {
    this.notify(name, '', metaData, 'warning');
  },

  notifyException(e, name) {
    if (this.remoteService != null && this.remoteService.notifyException) {
      this.remoteService.notifyException(e, name);
    }
  }
};

export default ErrorService;