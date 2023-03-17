const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/threatbook': {
        target: 'https://api.threatbook.cn/v3/', // 要访问的跨域域名
        changeOrigin: true, // 开启跨域
        pathRewrite: {
          '^/threatbook': '' // 将 /api 去掉
        },
      },
    },
  },
  publicPath: './',
  lintOnSave: false
}

)
