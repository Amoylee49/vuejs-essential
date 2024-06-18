const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './vuejs-essential/dist/'
    : './'
,
    //新增

}

module.exports = {
  // devServer: {
  //   proxy: 'http://localhost:8080'
  // },
  devServer: {
      open: true,
      host: 'localhost',
      port: 8080,
      proxy: {
          '/': {    //1
              target: 'https://adorable.io/',    //2
              changOrigin: true,
              ws: false,
              pathRewrite: {    //3
                  '^/avatars': ''
              }
          }
      },
  }
}
