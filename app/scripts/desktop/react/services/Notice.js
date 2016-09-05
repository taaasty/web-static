/*global i18n */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Notice from '../components/alerts/Notice';

const NoticeService = {
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
    const multiplier = text.length < 30 ? 200 : 100;
    return text.length * multiplier;
  },

  register(type, text, timeout) {
    const ID = this.getID();
    this._notices[ID] = {type, text, timeout};
    return ID;
  },

  addToQueue(ID) {
    if (!this._notices.hasOwnProperty(ID)) {
      return;
    }
    this._queue.push(ID);
  },

  notify(type, text, timeout) {
    timeout = timeout || this.getTimeoutForText(text);
    const ID = this.register(type, text, timeout);
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
      return;
    }

    let message = '';

    if (response.responseJSON != null) {
      let { responseJSON: json } = response;
      message = json.message || json.long_message || json.error;
    } else if (response.error) {
      message = response.error;
    } else {
      message = i18n.t('network_error', {text: response.statusText});
    }

    this.notifyError(message, timeout);
  },

  render() {
    if (this._queue.length < 1) {
      return;
    }

    this._activeID = this._queue[this._queue.length - 1];
    const container = this.getContainer();
    const data = this.getActive();

    unmountComponentAtNode(container);
    render(<Notice {...data} onClose={this.close.bind(this)} />, container);
  },

  close() {
    const container = this.getContainer();
    const ID = this._queue.pop();

    unmountComponentAtNode(container);
    delete this._notices[ID];
    this._activeID = null;
    this.render();
  },

  closeAll() {
    const container = this.getContainer();

    unmountComponentAtNode(container);
    this._queue = [];
    this._activeID = null;
    this._notices = {};
  },
};

export default NoticeService;
