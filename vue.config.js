module.exports = {
  // publicPath: '/',
  devServer: {
    proxy: {
      "/api": {
        target: "https://mobiledeviceapi.azurewebsites.net/api/",
        pathRewrite: { '/api': '' },
        ws:true,
        changeOrigin: true,
        logLevel: 'debug',
        
      }
    }
  }
};



