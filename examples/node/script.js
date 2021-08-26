#!/usr/bin/env node

const path = require('path')
const distDir = path.join(__dirname, '..', '..', 'dist')

let { i18n, translations } = require(path.join(distDir, 'i18n.cjs.js'))
i18n.init({ locales: ['pt-BR', 'en-US'], defaultLocale: 'pt-BR', translations })

console.info('i18n translations:', i18n.translations)
console.info('i18n locale:', i18n.locale)
