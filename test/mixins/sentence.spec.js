import i18n from '../support/i18n'


describe('Sentence mixin', () => {
  // TIP: If you need to change the locale, use the snippet below
  // ---
  // let $i18nLocale = i18n.locale
  // before(() => { i18n.locale = 'pt-BR' })
  // after(() => { i18n.locale = $i18nLocale })

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
