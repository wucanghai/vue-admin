import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

function getIPAdress() {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

const server = {
  mock: `http://${getIPAdress()}:12000`
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    },
    server: {
      host: true,
      port: 12345,
      strictPort: true,
      proxy: {
        '/mock': {
          target: server[mode],
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `$injectedColor: orange;`
        }
      }
    },
    // base: loadEnv(mode, process.cwd()).NODE_ENV,
    plugins: [
      vue(),
      vueJsx(),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            // importTest: /\@\s/g,
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              return `element-plus/dist/${name}.css`
            }
          }
        ]
      })
    ]
  })
}
