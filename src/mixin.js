import _ from '@caiena/lodash-ext'


function mixin(obj, mixins) {
  return mixins.reduce((mixedObj, mixinFn) => mixinFn(mixedObj), obj)
}


export default mixin
