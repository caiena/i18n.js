const yaml = require('js-yaml')
const fs   = require('fs')
const _    = require('@caiena/lodash-ext')


// Get document, or throw exception on error
const translations = {}
const enUS = yaml.safeLoad(fs.readFileSync(`${__dirname}/../../src/translations/core.en-US.yml`, 'utf8'))
const ptBR = yaml.safeLoad(fs.readFileSync(`${__dirname}/../../src/translations/core.pt-BR.yml`, 'utf8'))

_.merge(translations, enUS)
_.merge(translations, ptBR)

module.exports = translations
