import _ from '@caiena/lodash-ext'
import * as contents from './*.yml'
import * as namespacedContents from './**/*.yml'


const translations = {}

_.each(contents, (content, _id) => { _.merge(translations, content) })
_.each(namespacedContents, (content, _id) => { _.merge(translations, content) })


export default translations
