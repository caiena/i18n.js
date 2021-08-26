import _    from "@caiena/lodash-ext"
import i18n from "../src/i18n"


describe("i18n", () => {
  let originalLocale
  let originalTranslations

  beforeEach(() => {
    originalLocale = i18n.locale
    originalTranslations = i18n.translations

    _.merge(i18n.translations, {
      en: {
        hello_world: "Hello, World!"
      }
    })

    _.merge(i18n.translations, {
      "pt-BR": {
        hello_world: "Olá, Mundo!"
      }
    })
  })

  afterEach(() => {
    i18n.locale       = originalLocale
    i18n.translations = originalTranslations
  })

  // the tests are organized per-mixin.
  // checkout ./mixins directory
  it("translates properly", () => {
    // XXX: i18n defaults to pt-BR on test/support/i18n.js
    expect(i18n.t("hello_world")).to.equal("Olá, Mundo!")
  })

  describe('changing locale to "en"', () => {
    beforeEach(() => {
      i18n.locale = "en"
    })

    it("translates properly, changing locale", () => {
      expect(i18n.t("hello_world")).to.equal("Hello, World!")
    })
  })

})
