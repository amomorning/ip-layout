module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ip-layout/'
    : '/',
  productionSourceMap: false
}
