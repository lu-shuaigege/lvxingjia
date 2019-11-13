const webpack = require('webpack')
const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
module.exports = {

    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    // publicPath: 'production',
    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部,
    // 例如 https://www.my-app.com/
    // 如果你的应用部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如将你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 '/my-app/'
    // baseUrl: "./", // 构建好的文件输出到哪里
    publicPath: './', // 根域上下文目录

    outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    assetsDir: "phone",
    // lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: true, // 运行时版本是否需要编译
    // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    transpileDependencies: [// 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
        /* string or regex */
    ],
    // 是否为生产环境构建生成sourceMap?
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
        Object.assign(config, { // 开发生产共同配置，配置别名
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components'),
                    'vue$': 'vue/dist/vue.esm.js'
                }
            }
        })
    },

    css: {
        // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
        // 也可以是传递给 extract-text-webpack-plugin 的选项对象
        extract: true, // 允许生成 CSS source maps?
        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
        loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
        modules: false
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores

    parallel: require("os").cpus().length > 1, // PWA 插件相关配置// 构建时开启多进程处理babel编译 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

    pwa: {// 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa}, // configure webpack-dev-server behavior
        devServer: {
            open: process.platform === "darwin",
            disableHostCheck: false,
            host: "0.0.0.0",
            port: 8080,
            https: false,
            hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
            proxy: null,// string | Object
            before: app => { }
        },
    },// 第三方插件配置
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",

                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    lintOnSave: undefined,
    pluginOptions: {// 第三方插件配置//不确定
        // ...
    },
}
