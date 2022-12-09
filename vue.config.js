const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: config => {
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
