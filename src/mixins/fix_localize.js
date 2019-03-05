
function FixLocalize(i18n) {

  // Overriding i18n.localize() to fix arguments forwarding to methods `toCurrency()`, `toNumber()`
  // and `toPercentage()`.
  //   - TODO: verify if it's still needed, since i18n-js has been updated.
  //     https://github.com/fnando/i18n-js
  i18n.__original_localize = i18n.localize
  i18n.localize = function overridenLocalize(scope, value, opts) {
    let options = opts || {}

    switch (scope) {
      case 'currency':
        return this.toCurrency(value, options)
      case 'number':
        return this.toNumber(value, options)
      case 'percentage':
        return this.toPercentage(value, options)
      default:
        // default implementation
        return this.__original_localize(scope, value, options)
    }
  }

  // XXX updating alias, since we are overriding the method
  i18n.l = i18n.localize

  return i18n
}

export default FixLocalize
