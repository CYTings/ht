const LessThemePlugin = require('webpack-less-theme-plugin')

module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map'
        }
        // 打包自定义less主题的插件
        config.plugins.push(
            new LessThemePlugin({ theme: './src/assets/css/theme.less' })
        )
    }
}