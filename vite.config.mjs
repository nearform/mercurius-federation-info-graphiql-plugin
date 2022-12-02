import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    svgr()
  ],
  esbuild: {
    // We use function names for generating readable error messages, so we want
    // them to be preserved when building and minifying.
    keepNames: true
  },
  build: {
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: 'src/export.js',
      fileName: format => `${format}/index.js`,
      name: 'federationInfo',
      formats: ['umd', 'cjs', 'es']
    },
    rollupOptions: {
      external: [
        'react',
        '@graphiql/react',
        'graphql',
        'react-dom',
        '@graphiql_toolkit'
      ],
      output: {
        globals: {
          react: 'React',
          '@graphiql/react': 'GraphiQL.React',
          graphql: 'GraphiQL.GraphQL'
        }
      }
    }
  }
})
