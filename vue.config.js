const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const Timestamp = new Date().getTime()

module.exports = {
  // 基本路径
  publicPath: process.env.VUE_APP_PUBLICPATH,
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  devServer: {
    port: 5155, // 端口号
    open: true, // 配置自动启动浏览器
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:6166/', // 需要代理的接口前缀，当前项目未使用代理
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api/': '/',
        },
      },
    }, // 配置多个代理
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        test: /\.(js|css|svg|woff|ttf|json|html)$/, // 正则匹配需要压缩的文件后缀
        threshold: 10240, // 大于10kb的会压缩
        deleteOriginalAssets: false, // 是否删除源文件
        // 其余配置查看compression-webpack-plugin
      }),
    ],
    // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳.js】版本号：${process.env.VUE_APP_Version}
    // output: {
    //   filename: `js/[name].${Timestamp}.js`,
    //   chunkFilename: `js/[name].${Timestamp}.js`
    // }
  },
}
