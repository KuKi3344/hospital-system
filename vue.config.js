let proxyObj = {}

proxyObj['/'] = {
  ws: false,
  target: 'http://116.62.241.205:8086',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/'
  }
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}
