const webpack = require('webpack');
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV !== 'production',
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {},
        modules: false
    },
    devServer: {
        host: process.env.VUE_APP_HOST,
        port: process.env.VUE_APP_PORT,
        proxy: {
            '/apis': {
                target: process.env.VUE_APP_BASE_API,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    pluginOptions: {},
};
