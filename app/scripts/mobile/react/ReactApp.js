import i18n from 'i18next';
import i18xhr from 'i18next-xhr-backend';
import { initialize } from 'reactUjs';
import MessagingService from './services/messaging';

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
  start({locale, userID, userToken}) {
    console.log('ReactApp start');

    initLocales(locale, () => {
      console.log('Locales loaded');
      initialize();
    });

    if (userID && userToken) {
      this.messagingService = new MessagingService(userID, userToken);
    }
  },
}
