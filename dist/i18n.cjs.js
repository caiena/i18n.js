'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('@caiena/lodash-ext'));
var _i18n = _interopDefault(require('i18n-js'));

function mixin(obj, mixins) {
  return mixins.reduce((mixedObj, mixinFn) => mixinFn(mixedObj), obj);
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
          let connector = i18n.t('support.array.two_words_connector');
          return `${values[0]}${connector}${values[1]}`;
        }
      default:{
          let valuesButLast = values.slice(0, values.length - 1);
          let lastValue = values.slice(-1);

          let connector = i18n.t('support.array.words_connector');
          let lastConnector = i18n.t('support.array.last_word_connector');

          let sentence = `${valuesButLast.join(connector)}`;
          sentence += `${lastConnector}${lastValue}`;

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
    let options = opts || {};

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

  i18n.init = function init({ locales, defaultLocale = null, translations } = {}) {
    // initializing i18n module
    i18n.availableLocales = locales;
    i18n.defaultLocale = defaultLocale || locales[0];
    i18n.locale = defaultLocale;

    // merging translations
    _.merge(i18n.translations, translations);
  };

  return i18n;
}

const i18n = mixin(_i18n, [
Sentence,
FixLocalize,
Init]);

const _contents_coreEnUS = { "en-US": { date: { abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], formats: { "default": "%m/%d/%Y", normal: "%b %d, %Y", long: "%B %d, %Y", short: "%b %d, %Y", iso: "%Y-%m-%d", week: "%A" }, month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], order: [":month", ":day", ":year"] }, number: { currency: { format: { delimiter: ",", format: "%u%n", precision: 2, separator: ".", significant: false, strip_insignificant_zeros: false, unit: "$" } }, format: { delimiter: ",", precision: 3, separator: ".", significant: false, strip_insignificant_zeros: false }, human: { decimal_units: { format: "%n %u", units: { billion: "Billion", million: "Million", quadrillion: "Quadrillion", thousand: "Thousand", trillion: "Trillion", unit: "" } }, format: { delimiter: "", precision: 3, significant: true, strip_insignificant_zeros: true }, storage_units: { format: "%n %u", units: { byte: { one: "Byte", other: "Bytes" }, gb: "GB", kb: "KB", mb: "MB", tb: "TB" } } }, percentage: { format: { delimiter: "", format: "%n%" } }, precision: { format: { delimiter: "" } } }, support: { array: { last_word_connector: " and ", two_words_connector: " and ", words_connector: ", " } }, time: { am: "AM", formats: { "default": "%b %d, %Y %I:%M %p", simple: "%b %d %I:%M %p", long: "%B %d, %Y %I:%M %p", short: "%I:%M %p", iso: "%Y-%m-%dT%H:%M:%S%z" }, pm: "PM" } } };const _contents_corePtBR = { "pt-BR": { date: { abbr_day_names: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"], abbr_month_names: [null, "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], day_names: ["Domingo", "Segunda-feira", "Ter\xE7a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S\xE1bado"], formats: { "default": "%d/%m/%Y", normal: "%d de %b de %Y", long: "%d de %B de %Y", short: "%d de %b", iso: "%Y-%m-%d", week: "%A" }, month_names: [null, "Janeiro", "Fevereiro", "Mar\xE7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], order: [":day", ":month", ":year"] }, number: { currency: { format: { delimiter: ".", format: "%u %n", precision: 2, separator: ",", significant: false, strip_insignificant_zeros: false, unit: "R$" } }, format: { delimiter: ".", precision: 3, separator: ",", significant: false, strip_insignificant_zeros: false }, human: { decimal_units: { format: "%n %u", units: { billion: { one: "bilh\xE3o", other: "bilh\xF5es" }, million: { one: "milh\xE3o", other: "milh\xF5es" }, quadrillion: { one: "quatrilh\xE3o", other: "quatrilh\xF5es" }, thousand: "mil", trillion: { one: "trilh\xE3o", other: "trilh\xF5es" }, unit: "" } }, format: { delimiter: "", precision: 3, significant: true, strip_insignificant_zeros: true }, storage_units: { format: "%n %u", units: { byte: { one: "Byte", other: "Bytes" }, gb: "GB", kb: "KB", mb: "MB", tb: "TB" } } }, percentage: { format: { delimiter: ".", format: "%n%u", precision: 2, separator: ",", unit: "%" } } }, support: { array: { last_word_connector: " e ", two_words_connector: " e ", words_connector: ", " } }, time: { am: "", formats: { "default": "%a, %d de %B de %Y \xE0s %H:%M:%S", simple: "%d de %B de %Y \xE0s %H:%M", long: "%d de %B de %Y \xE0s %H:%M", short: "%H:%M", iso: "%Y-%m-%dT%H:%M:%S%z" }, pm: "" } } };const contents = { coreEnUS: _contents_coreEnUS, corePtBR: _contents_corePtBR };Object.freeze(contents);const namespacedContents = {};Object.freeze(namespacedContents);




const translations = {};

_.each(contents, (content, _id) => {_.merge(translations, content);});
_.each(namespacedContents, (content, _id) => {_.merge(translations, content);});

exports.i18n = i18n;
exports.translations = translations;
