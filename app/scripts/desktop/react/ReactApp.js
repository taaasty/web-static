/*global $, CurrentUserDispatcher */
import i18n from 'i18next';
import i18xhr from 'i18next-xhr-backend';
window.i18n = i18n;
window.STATE_FROM_SERVER = window.STATE_FROM_SERVER || {};

import { sendUser, sendRegister } from '../../shared/react/services/Sociomantic';
import * as ReactUjs from 'reactUjs';
import PopupController from './controllers/popuup';
import numeral from 'numeral';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import PostAuthService from './services/PostAuthService';
import MessagingService from './messaging/MessagingService';
import NoticeService from './services/Notice';
import moment from 'moment';
import Routes from '../../shared/routes/routes';
import AppRoot from './AppRoot';
import uri from 'urijs';
import ReactShellBox from './controllers/ReactShellBox';

function initLocales(locale, callback) {
  numeral.language(locale);
  moment.locale(locale);
  i18n
    .use(i18xhr)
    .init({
      lng: locale,
      fallbackLng: 'ru',
      backend: {
        loadPath: Routes.locale(),
      },
    }, callback);
}

const ReactApp = {
  start({ user, locale }) {
    console.log('ReactApp start');

    if (user) {
      window.STATE_FROM_SERVER.currentUser = window.STATE_FROM_SERVER.currentUser ||
        {};
      CurrentUserDispatcher.setupUser(user);
      window.messagingService = new MessagingService(user);

      sendUser(user);
      if (window.gon.register_provider || uri()
        .query(true)
        .first_login !== void 0) {
        sendRegister(user.id);
      }
    }

    initLocales(locale, () => {
      console.log('Locales loaded');
      ReactUjs.initialize(AppRoot);

      if (window.gon.flash_error) {
        NoticeService.notifyError(window.gon.flash_error);
      }
    });

    // Needed for onTouchTap
    // Can go away when react 1.0 release
    // Check this repo:
    // https://github.com/zilverline/react-tap-event-plugin
    injectTapEventPlugin();

    this.popupController = new PopupController();

    this.shellbox = new ReactShellBox();

    //PostAuthService.init(this, 'taaasty');
    //PostAuthService.restore();

    // Тултип для шаринга
    $('[tooltip]')
      .tooltip();

    $('.js-connection-start')
      .connection({
        connectionEnd: '.js-connection-end',
        connectionLineClass: 'connection-line',
      });
  },
};

export default ReactApp;
