import i18n         from '../../src/i18n'
import translations from '../support/translations'


describe('FixLocalize mixin', () => {
  i18n.init({ locales: ['pt-BR', 'en-US'], defaultLocale: 'pt-BR', translations })


  context('i18n.localize()', () => {
    context('with scope "currency"', () => {
      it('forwards options (e.g. "precision") properly', () => {
        expect(i18n.localize('currency', 200.1234, { precision: 1 })).to.equal('R$ 200,1')
      })
    })

    context('with scope "number"', () => {
      it('forwards options (e.g. "precision") properly', () => {
        expect(i18n.localize('number', 200.1234, { precision: 2 })).to.equal('200,12')
      })
    })

    context('with scope "percentage"', () => {
      it('forwards options (e.g. "precision") properly', () => {
        expect(i18n.localize('percentage', 200.1234, { precision: 3 })).to.equal('200,123%')
      })
    })
  })

})
