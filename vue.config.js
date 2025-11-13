module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/amarathon/'
    : '/',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `
      }
    }
  }
};
