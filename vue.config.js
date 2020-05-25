const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}


// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

// 本地环境是否需要使用cdn
const devNeedCdn = true

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'moment': 'moment',
        'axios': 'axios',
        'lodash': 'lodash',
        // 'better-scroll': 'BScroll',
        // 'echarts': 'echarts'
    },
    // cdn的css链接
    css: [],
    // cdn的js链接
    js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.2.0/vuex.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.3/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.min.js',
        'https://cdn.bootcdn.net/ajax/libs/moment.js/2.25.3/moment.min.js',
        // 'https://unpkg.com/better-scroll/dist/bscroll.min.js',
        'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.15/lodash.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js'
    ]
}

module.exports = {
    publicPath: isProduction ? "/pdca/" : "/",
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false, //是否开启ESlint（保存时检查）
    productionSourceMap: false, //生产环境是否生成 sourceMap 文件
    // css: {
    //     // 是否使用css分离插件 ExtractTextPlugin
    //     extract: false,
    //     // 开启 CSS source maps?
    //     sourceMap: false,
    //     // css预设器配置项
    //     loaderOptions: {},
    //     // 启用 CSS modules for all css / pre-processor files.
    //     modules: false,
    // },
    devServer: { //环境配置
        host: '0.0.0.0',
        port: 8080,
        https: false, //是否开启https
        hotOnly: false, //是否配置热更新
        open: true, //配置自动启动浏览器
        disableHostCheck: true, //Invalid Host header 服务器域名访问出现的问题
        proxy: { //配置多个代理跨域(配置一个 proxy: 'http://localhost:4000' )
            '/api': {
                // target: 'http://g2h6ik.natappfree.cc/education-gateway/',
                target: 'http://quality.csweinuo.com/',
                ws: true, //是否跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/bpi': '/'
                }
            },
            '/hawkeye/api': {
                target: "http://hawkeye.csweinuo.com/api/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            // 移除 prefetch 插件
        config.plugins.delete("prefetch")
            // 移除 preload 插件
        config.plugins.delete('preload')
            // ============注入cdn start============
        config.plugin('html').tap(args => {
                // 生产环境或本地需要cdn时，才注入cdn
                if (isProduction || devNeedCdn) args[0].cdn = cdn
                return args
            })
            // ============注入cdn start============
        if (isProduction) {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
            }
        }
    },
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals

        // 生产环境相关配置
        if (isProduction) {
            // 代码压缩
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        //生产环境自动删除console
                        compress: {
                            // warnings: false, // 若打包错误，则注释这行
                            // drop_debugger: true,
                            // drop_console: true,
                            // pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            )

            // gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            )
        }
    }
}