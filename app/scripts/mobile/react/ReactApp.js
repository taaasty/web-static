import i18n from 'i18next';
import i18xhr from 'i18next-xhr-backend';
import { initialize } from 'reactUjs';
import MessagingService from './services/messaging';
import { sendRegister, sendUser } from '../../shared/react/services/Sociomantic';
import uri from 'urijs';

global.i18n = i18n;

function initLocales(locale, callback) {
  i18n.use(i18xhr)
    .init({
      lng: locale,
      fallbackLng: 'ru',
      backend: {
        loadPath: Routes.locale(),
      },
    }, callback);
}

export default {
  messagingService: null,
  start({ locale, user, registerProvider }) {
    console.log('ReactApp start');

    initLocales(locale, () => {
      console.log('Locales loaded');
      initialize();
    });

    if (user && user.id && user.api_key.access_token) {
      this.messagingService = new MessagingService(user.id, user.api_key.access_token);
      sendUser(user);

      if (registerProvider || uri()
        .query(true)
        .first_login !== void 0) {
        sendRegister(user.id);
      }
    }
  },
}
