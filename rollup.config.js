const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const svgr = require('@svgr/rollup')
const jsx = require('rollup-plugin-jsx')
const postcss = require('rollup-plugin-postcss')

const packageJson = require('./package.json')

const rollup = [
  {
    input: './src/export.js',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      },
      {
        file: packageJson.umd,
        format: 'umd',
        sourcemap: true,
        name: 'useFederationInfoPlugin'
      }
    ],
    external: ['react', '@graphiql/toolkit'],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx']
      }),
      svgr(),
      postcss({ modules: true }),
      commonjs(),
      jsx({ factory: 'React.createElement' })
    ]
  }
]

module.exports = rollup
