import _ from '@caiena/lodash-ext'


function Init(i18n) {

  i18n.init = function init({ locales, defaultLocale = null, translations } = {}) {
    // initializing i18n module
    i18n.availableLocales = locales
    i18n.defaultLocale = defaultLocale || locales[0]
    i18n.locale = defaultLocale

    // merging translations
    _.merge(i18n.translations, translations)
  }

  return i18n
}


export default Init
