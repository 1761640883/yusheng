module.exports = {
  publicPath: '/yusheng', // 更改根目录（之后资源访问就在yusheng下访问）
  devServer: {
    proxy: {
      '/api2': { // 本地的接口需要放在前面，不然容易出问题
        target: 'http://localhost:3000/', // 如果设置成true：发送请求头中host会设置成target·
        changeOrigin: true
      },
      '/ajax': {
        target: 'https://m.maoyan.com/',
        changeOrigin: true
      }
    }
  }
}
