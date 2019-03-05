import _ from '@caiena/lodash-ext';
import _i18n from 'i18n-js';

function mixin(obj, mixins) {
  return mixins.reduce(function (mixedObj, mixinFn) {return mixinFn(mixedObj);}, obj);
}

function Sentence(i18n) {

  /**
                          * Concatenates multiple words (strings) building a sentence with connectors (',' or 'and')
                          *
                          * @param  {Array}  values        words (strings) to be concatenated as a sentence
                          * @return {String}               the resulting sentence
                          */
  i18n.toSentence = function toSentence(values) {
    switch (values.length) {
      case 0:return '';
      case 1:return values[0];
      case 2:{
          var connector = i18n.t('support.array.two_words_connector');
          return "".concat(values[0]).concat(connector).concat(values[1]);
        }
      default:{
          var valuesButLast = values.slice(0, values.length - 1);
          var lastValue = values.slice(-1);

          var _connector = i18n.t('support.array.words_connector');
          var lastConnector = i18n.t('support.array.last_word_connector');

          var sentence = "".concat(valuesButLast.join(_connector));
          sentence += "".concat(lastConnector).concat(lastValue);

          return sentence;
        }}

  };


  /*
     support:
         array:
           last_word_connector: ", and "
           two_words_connector: " and "
           words_connector: ", "
      */

  return i18n;
}

function FixLocalize(i18n) {

  // Overriding i18n.localize() to fix arguments forwarding to methods `toCurrency()`, `toNumber()`
  // and `toPercentage()`.
  //   - TODO: verify if it's still needed, since i18n-js has been updated.
  //     https://github.com/fnando/i18n-js
  i18n.__original_localize = i18n.localize;
  i18n.localize = function overridenLocalize(scope, value, opts) {
    var options = opts || {};

    switch (scope) {
      case 'currency':
        return this.toCurrency(value, options);
      case 'number':
        return this.toNumber(value, options);
      case 'percentage':
        return this.toPercentage(value, options);
      default:
        // default implementation
        return this.__original_localize(scope, value, options);}

  };

  // XXX updating alias, since we are overriding the method
  i18n.l = i18n.localize;

  return i18n;
}

function Init(i18n) {

  i18n.init = function init() {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},locales = _ref.locales,_ref$defaultLocale = _ref.defaultLocale,defaultLocale = _ref$defaultLocale === void 0 ? null : _ref$defaultLocale,translations = _ref.translations;
    // initializing i18n module
    i18n.availableLocales = locales;
    i18n.defaultLocale = defaultLocale || locales[0];
    i18n.locale = defaultLocale;

    // merging translations
    _.merge(i18n.translations, translations);
  };

  return i18n;
}

var i18n = mixin(_i18n, [
Sentence,
FixLocalize,
Init]);

export { i18n };
//# sourceMappingURL=i18n.esm.js.map
