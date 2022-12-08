const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: config => {
    if (debug) { // 开发环境配置
      config.devtool = 'source-map'
    } else { // 生产环境配置
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }

    Object.assign(config, {
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        // 开发生产环境共同配置，配置别名
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      //警告 webpack 的性能提示
      performance: {
        hints: 'warning',
        //入口起点的最大体积
        maxEntrypointSize: 9999999,
        //生成文件的最大体积
        maxAssetSize: 9999999,
        //只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
    })
  },
})
