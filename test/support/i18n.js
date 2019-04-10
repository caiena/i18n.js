// easing the boot of i18n module, with translations
import translations from '../../src/config/i18n/translations'
import i18n         from '../../src/i18n'


i18n.init({ locales: ['pt-BR', 'en-US'], defaultLocale: 'pt-BR', translations })


export default i18n
