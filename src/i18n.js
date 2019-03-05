import _     from '@caiena/lodash-ext'
import _i18n from 'i18n-js'
import mixin from './mixin'

import Sentence    from './mixins/sentence'
import FixLocalize from './mixins/fix_localize'
import Init        from './mixins/init'


const i18n = mixin(_i18n, [
  Sentence,
  FixLocalize,
  Init
])


export default i18n
