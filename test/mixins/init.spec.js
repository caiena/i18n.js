import i18n         from '../../src/i18n'
import translations from '../../src/config/i18n/translations'


describe('Init mixin', () => {
  i18n.init({ locales: ['pt-BR', 'en-US'], defaultLocale: 'pt-BR', translations })

  it('defines available locales', () => {
    expect(i18n.availableLocales).to.deep.equal(['pt-BR',  'en-US'])
  })

  it('defines default locale', () => {
    expect(i18n.defaultLocale).to.equal('pt-BR')
  })

  it('adds translations', () => {
    expect(i18n.translations).to.containSubset(translations)
  })

})
