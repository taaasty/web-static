const SEVERITY_INFO_TYPE = 'info',
      SEVERITY_ERROR_TYPE = 'error',
      SEVERITY_WARNING_TYPE = 'warning';

let ErrorService = {
  remoteService: global.Bugsnag || null,

  notify(name, message, metaData, severity) {
    if (this.remoteService != null && this.remoteService.notify) {
      this.remoteService.notify(name, message, metaData, severity);
    } else {
      console.group(`[${severity}] ${name}`);
      if (metaData != null && Object.keys(metaData).length) console.log('Meta:', metaData);
      console.groupEnd();
    }
  },

  notifyErrorResponse(name, metaData = {}) {
    if (metaData.response) {
      this.notifyError('[AJAX] ' + name, metaData);
    }
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