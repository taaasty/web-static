import _ from 'lodash';
import Notice from '../components/alerts/Notice';

let NoticeService = {
  _ID: 1,
  _queue: [],
  _activeID: null,
  _notices: {},

  getID() {
    return `ID_${this._ID++}`;
  },

  getActive() {
    return this._notices[this._activeID];
  },

  getContainer() {
    let container = document.querySelector('[notice-container]');

    if (container == null) {
      container = document.createElement('div');
      container.setAttribute('notice-container', '');
      document.body.appendChild(container);
    }

    return container;
  },

  getTimeoutForText(text = '') {
    let multiplier = text.length < 30 ? 200 : 100;
    return text.length * multiplier;
  },

  register(type, text, timeout) {
    let ID = this.getID();
    this._notices[ID] = {type, text, timeout};
    return ID;
  },

  addToQueue(ID) {
    if (!this._notices.hasOwnProperty(ID)) {
      return false;
    }
    this._queue.push(ID);
  },

  notify(type, text, timeout) {
    timeout = timeout || this.getTimeoutForText(text);
    let ID = this.register(type, text, timeout);
    this.addToQueue(ID);
    this.render();
  },

  notifyError(text, timeout) {
    this.notify('error', text, timeout);
  },

  notifySuccess(text, timeout) {
    this.notify('success', text, timeout);
  },

  errorResponse(response, timeout) {
    function isPageLoadingCanceled(response) {
      // Вернет true, если во время запроса пользователь:
      // - Остановил загрузку страницы
      // - Перешёл на другую страницу
      return response.statusText === 'error' && response.status == 0 && response.readyState == 0;
    }

    if (isPageLoadingCanceled(response) || response.statusText === 'abort') {
      return false;
    }

    let message = '';

    if (response.responseJSON != null) {
      let json = response.responseJSON;
      console.error('errorResponse JSON', json);

      if (json.message != null) {
        message = json.message;
      }

      if (json.long_message != null) {
        message = json.long_message;
      }

      if (json.error != null && json.error.length) {
        message = json.error;
      }
    } else {
      message = i18n.t('network_error', {text: response.statusText});
    }

    this.notifyError(message, timeout);
  },

  render() {
    if (this._queue.length < 1) {
      return false;
    }

    this._activeID = this._queue[this._queue.length - 1];
    let container = this.getContainer(),
        data = this.getActive();

    React.unmountComponentAtNode(container);
    React.render(<Notice {...data} onClose={this.close.bind(this)} />, container);
  },

  close() {
    let container = this.getContainer(),
        ID = this._queue.pop();

    React.unmountComponentAtNode(container);
    delete this._notices[ID];
    this._activeID = null;
    this.render();
  },

  closeAll() {
    let container = this.getContainer();

    React.unmountComponentAtNode(container);
    this._queue = [];
    this._activeID = null;
    this._notices = {};
  }
};

export default NoticeService;