i18nLocales = {
  ru: { translation: require './ru/translation' }
}
momentLocales = {
  'ru': require '../../../bower_components/momentjs/locale/ru'
}

# Making russian language as default for moment.js
window.moment.locale 'ru', momentLocales.ru

i18n.init {
  lng: 'ru'
  resStore: i18nLocales
}