const path = require('path'),
    resolve = (dir) => {
        return path.join(__dirname, dir)
    }

module.exports = {
    chainWebpack(config) {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icon'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'BTCO-[name]'
            })
            .end()
    }
}