module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    host: '127.0.0.1'
  },
  css: {
    loaderOptions: { /** 配置全局Sass变量文件 */
      sass: {
        data : `@import "@/assets/css/variables.scss";`
      }
    }
  }
}