/*global $, TastyEvents, CurrentUserStore, CurrentUserDispatcher, ReactShellBox */
import i18n from 'i18next';
import i18xhr from 'i18next-xhr-backend';
window.i18n = i18n;
window.STATE_FROM_SERVER = window.STATE_FROM_SERVER || {};

import { sendUser, sendRegister } from '../../shared/react/services/Sociomantic';
import * as ReactUjs from 'reactUjs';
import PopupActions from './actions/popup';
import DesignActionCreators from './actions/design';
import PopupController from './controllers/popuup';
import numeral from 'numeral';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PostAuthService from './services/PostAuthService';
import MessagingService from './messaging/MessagingService';
import moment from 'moment';
import Routes from '../../shared/routes/routes';
import Aviator from 'aviator';
import AppRoot from './AppRoot';
import uri from 'urijs';

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

function initRoutes() {
  function hasAccessBySlug(urlSlug) {
    const user = CurrentUserStore.getUser();
    const userLogged = CurrentUserStore.isLogged();

    return userLogged && urlSlug.slice(1).toLowerCase() === user.slug;
  }
  
  const UserRouteTarget = {
    profile() {
      return TastyEvents.emit(TastyEvents.keys.command_hero_open());
    },

    settings(req) {
      if (!hasAccessBySlug(req.params.slug)) {
        return;
      }
      PopupActions.showSettings();
    },
  };

  Aviator.setRoutes({
    '/:slug': {
      target: UserRouteTarget,
      '/profile': 'profile',
      '/settings': 'settings',
    },
  });

  Aviator.dispatch();
}
  
const ReactApp = {
  start({ user, locale }) {
    console.log('ReactApp start');

    if (user) {
      window.STATE_FROM_SERVER.currentUser = window.STATE_FROM_SERVER.currentUser || {};
      window.STATE_FROM_SERVER.currentUser.data = user; //REDUX
      CurrentUserDispatcher.setupUser(user);
      window.messagingService = new MessagingService(user);

      DesignActionCreators.initCurrent(CurrentUserStore.getUser().design);
      sendUser(user);
      if (window.gon.register_provider || uri().query(true).first_login !== void 0) {
        sendRegister(user.id);
      }
    }

    initLocales(locale, () => {
      console.log('Locales loaded');
      ReactUjs.initialize(AppRoot);
      initRoutes();

      if (window.gon.showUserOnboarding) {
        PopupActions.showUserOnboarding();
      }
    });

    // Needed for onTouchTap
    // Can go away when react 1.0 release
    // Check this repo:
    // https://github.com/zilverline/react-tap-event-plugin
    injectTapEventPlugin();

    this.popupController = new PopupController();

    this.shellbox = new ReactShellBox();

    PostAuthService.init(this, 'taaasty');
    PostAuthService.restore();

    // Тултип для шаринга
    $('[tooltip]').tooltip();

    $('.js-connection-start').connection({
      connectionEnd: '.js-connection-end',
      connectionLineClass: 'connection-line',
    });

    // GuideController.start();
  },
};

export default ReactApp;
