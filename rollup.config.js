import localResolve from 'rollup-plugin-local-resolve'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import glob from 'rollup-plugin-glob-import'
import yaml from 'rollup-plugin-yaml'
import pkg from './package.json'

// node path
import path from 'path'


export default [
  // // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'i18n',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      yaml(),
      glob({
        format: 'default',  // required for yaml plugin to work!
        rename(name, id) {
          return `${path.relative(__dirname, id)}/${name}`.replace(/[^\w]/g, '_')
        }
      }),
      resolve(), // so Rollup can find dependencies (e.g. `lodash`)
      commonjs(), // so Rollup can convert dependencies (e.g. `lodash`) to an ES module
      babel()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: ['@caiena/lodash-ext', 'i18n-js', 'moment'],
    output: [
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [
      yaml(),
      glob({
        format: 'default',  // required for yaml plugin to work!
        rename(name, id) {
          return `${path.relative(__dirname, id)}/${name}`.replace(/[^\w]/g, '_')
        }
      }),
      localResolve(),
      babel({     // overriding babel.config.js, targeting node specifically
        presets: [[
          "@babel/preset-env", {
            targets: {
              node: "8"
            }
          }
        ]]
      })
    ]
  },


  // and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: ['@caiena/lodash-ext', 'i18n-js', 'moment'],
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      yaml(),
      glob({
        format: 'default',  // required for yaml plugin to work!
        rename(name, id) {
          return `${path.relative(__dirname, id)}/${name}`.replace(/[^\w]/g, '_')
        }
      }),
      commonjs(), // so Rollup can transform dependencies in CommonJS to ESM
      localResolve(),
      babel(),    // uses default config in babel.config.js (targeting browsers)
    ]
  }

];
