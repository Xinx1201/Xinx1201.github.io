const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  devServer: {
    // host: "localhost",
    port: 8090, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {// 配置跨域
      '/api': {
        target: '', // 要访问的跨域域名
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'error' : false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': "vue/dist/vue.js",
        package: resolve('package.json'),
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
}
