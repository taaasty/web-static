import _ from 'lodash';
import Notify from '../components/alerts/Notify';

let NotificationService = {
  id: 1,
  queue: [],
  activeID: null,
  notifications: {},

  getID() {
    return `id_${this.id++}`;
  },

  getActive() {
    return this.notifications[this.activeID];
  },

  getContainer() {
    let container = document.querySelector('[notify-container]');

    if (container == null) {
      container = document.createElement('div');
      container.setAttribute('notify-container', '');
      document.body.appendChild(container);
    }

    return container;
  },

  register(type, text, timeout) {
    let ID = this.getID();
    this.notifications[ID] = {type, text, timeout};
    return ID;
  },

  addToQueue(ID) {
    if (!this.notifications.hasOwnProperty(ID)) {
      return false;
    }
    this.queue.push(ID);
  },

  notify(type, text, timeout = 5000) {
    // TODO: Если timeout не указан, делаем на основе длины text
    let ID = this.register(type, text, timeout);
    this.addToQueue(ID);
    this.render();
  },

  render() {
    if (this.queue.length < 1) {
      return false;
    }

    this.activeID = this.queue[this.queue.length - 1];
    let container = this.getContainer(),
        data = this.getActive();
    console.log(data);

    React.render(<Notify {...data} onClose={this.close.bind(this)} />, container);
  },

  close() {
    let container = this.getContainer();

    React.unmountComponentAtNode(container);
    this.queue.shift();
    this.activeID = null;
    this.render();
    console.log('close');
  }
};

export default NotificationService;

  

//   notify: (type, text, timeout = 5000) ->
//     container = $('<\div>').appendTo('body').get(0)

//     notification = React.render (
//       <TastyNotify
//           type={ type }
//           text={ text }
//           timeout={ timeout }
//           onClose={ @_removeNotification.bind(@) } />
//     ), container

//     @_notificationList.push notification

//   notifySuccess: (text, timeout = 5000) ->
//     @notify 'success', text, timeout

//   notifyError: (text, timeout = 5000) ->
//     @notify 'error', text, timeout

//   errorResponse: (response, timeout = 5000) ->
//     return if response.statusText is 'abort'

//     # Непонятно почему не rejected не должно показывать
//     # например 500-ая ошибка при вставке url-а в video пост
//     # генерирует именно rejected
//     # return if response.state?() == 'rejected'

//     if response.responseJSON?
//       json = response.responseJSON

//       console.error? 'errorResponse JSON', json
//       message = json.message if json.message?
//       message = json.long_message if json.long_message?
//       message ||= json.error if json.error? && json.error.length > 0
//     else
//       message = i18n.t 'network_error', text: response.statusText

//     unless @_isPageLoadingCanceled response
//       @notify 'error', message, timeout

//   hideAll: ->
//     @_notificationList.forEach (notification) -> notification.close()

//   _removeNotification: (notification) ->
//     @_notificationList = _.without @_notificationList, notification

//   _isPageLoadingCanceled: (response) ->
//     # Вернет true, если во время запроса пользователь:
//     # - Остановил загрузку страницы
//     # - Перешёл на другую страницу
//     response.statusText is 'error' && response.status == 0 && response.readyState == 0

// #*==========  Глобальные команды  ==========*#

// TastyEvents.on TastyEvents.keys.command_current_notification_hide(), ->
//   TastyNotifyController.hideAll()

// #*-----  End of Глобальные команды  ------*#








// Notify = require '../components/alerts/notify'

// _pendingNotification = null

// getContainer = ->
//   container = document.querySelector '[notify-container]'

//   unless container?
//     container = document.createElement 'div'
//     container.setAttribute 'notify-container', ''
//     document.body.appendChild container

//   container

// closeNotification = ->
//   container = getContainer()

//   React.unmountComponentAtNode container
//   _pendingNotification = null

// isPageLoadingCanceled = (xhr) ->
//   # Вернет true, если во время запроса пользователь:
//   # - Остановил загрузку страницы
//   # - Перешёл на другую страницу
//   xhr.status == 0

// NotifyController =

//   notify: (type, text, timeout = 3000) ->
//     container = getContainer()

//     closeNotification()

//     notification = React.render (
//       <Notify
//           type={ type }
//           text={ text }
//           timeout={ timeout }
//           onClose={ closeNotification } />
//     ), container

//     _pendingNotification = notification

//   notifySuccess: (text, timeout = 3000) ->
//     @notify 'success', text, timeout

//   notifyError: (text, timeout = 3000) ->
//     @notify 'error', text, timeout

//   errorResponse: (xhr, timeout = 3000) ->
//     return if xhr._aborted is true

//     if xhr.responseText
//       json = JSON.parse xhr.responseText

//       message = switch
//         when json.message      then json.message
//         when json.long_message then json.long_message
//         when json.error        then json.error
//     else
//       message = "Ошибка сети: #{xhr.statusText}"

//     unless isPageLoadingCanceled xhr
//       @notify 'error', message, timeout

// module.exports = NotifyController