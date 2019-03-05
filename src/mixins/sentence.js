import _ from '@caiena/lodash-ext'


function Sentence(i18n) {

  /**
   * Concatenates multiple words (strings) building a sentence with connectors (',' or 'and')
   *
   * @param  {Array}  values        words (strings) to be concatenated as a sentence
   * @return {String}               the resulting sentence
   */
  i18n.toSentence = function toSentence(values) {
    switch (values.length) {
      case 0: return ''
      case 1: return values[0]
      case 2: {
        let connector = i18n.t('support.array.two_words_connector')
        return `${values[0]}${connector}${values[1]}`
      }
      default: {
        let valuesButLast = values.slice(0, values.length - 1)
        let lastValue = values.slice(-1)

        let connector = i18n.t('support.array.words_connector')
        let lastConnector = i18n.t('support.array.last_word_connector')

        let sentence = `${valuesButLast.join(connector)}`
        sentence += `${lastConnector}${lastValue}`

        return sentence
      }
    }
  }


/*
support:
    array:
      last_word_connector: ", and "
      two_words_connector: " and "
      words_connector: ", "
 */

  return i18n
}

export default Sentence
