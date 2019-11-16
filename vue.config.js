module.exports = {
  devServer: {
    host: '192.168.1.11'
  },
  css: {
    loaderOptions: { /** 配置全局Sass变量文件 */
      sass: {
        data : `@import "@/assets/css/variables.scss";`
      }
    }
  }
}