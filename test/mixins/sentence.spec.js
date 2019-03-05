import i18n         from '../../src/i18n'
import translations from '../support/translations'


describe('Sentence mixin', () => {
  i18n.init({ locales: ['pt-BR', 'en-US'], defaultLocale: 'pt-BR', translations })


  context('i18n.toSentence()', () => {
    context('with one word', () => {
      it('does not add any connector to the sentence', () => {
        expect(i18n.toSentence(['maçãs'])).to.equal('maçãs')
      })
    })

    context('with two words', () => {
      it('forwards options (e.g. "precision") properly', () => {
        expect(i18n.toSentence(['maçãs', 'laranjas'])).to.equal('maçãs e laranjas')
      })
    })

    context('with three or more words', () => {
      it('forwards options (e.g. "precision") properly', () => {
        expect(i18n.toSentence(['maçãs', 'laranjas', 'abacaxis'])).to.equal('maçãs, laranjas e abacaxis')
      })
    })
  })

})
