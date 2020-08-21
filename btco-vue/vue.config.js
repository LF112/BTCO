const path = require('path'),
    fs = require('fs'),
    resolve = (dir) => {
        return path.join(__dirname, dir)
    }

var COPY = (src, dist, callback) => {
    const _copy = (err, src, dist) => {
        if (err)
            callback(err)
        else {
            fs.readdir(src, function (err, paths) {
                if (err)
                    callback(err)
                else {
                    paths.forEach(function (path) {
                        let _src = src + '/' + path,
                            _dist = dist + '/' + path
                        fs.stat(_src, function (err, stat) {
                            if (err)
                                callback(err)
                            else {
                                if (stat.isFile())
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                else if (stat.isDirectory()) COPY(_src, _dist, callback)
                            }
                        })
                    })
                }
            })
        }
    }
    fs.access(dist, function (err) {
        if (err) fs.mkdirSync(dist)
        _copy(null, src, dist)
    })
}, RMDIR = (path) => {
    let files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(function (file, index) {
            let curPath = path + '/' + file
            if (fs.statSync(curPath).isDirectory())
                RMDIR(curPath)
            else fs.unlinkSync(curPath)
        })
    }
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '././' : '/',
    assetsDir: '././static/',
    productionSourceMap: false,
    chainWebpack (config) {
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
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.plugins.push({
                apply: (compiler) => {
                    compiler.hooks.done.tap('btco', compilation => {
                        console.log('[BTCO] 正在转移文件...')
                        const PATH = path.resolve(__dirname, '..') + '/btco-vue'

                        RMDIR(path.resolve(__dirname, '..') + '/BTCO/static')

                        fs.mkdirSync(PATH + '/dist/templates')
                        fs.rename(PATH + '/dist/index.html', PATH + '/dist/templates/index.html', (err) => {
                            if (err) console.log('[BTCO] index.html 转移失败！')
                            fs.rename(PATH + '/dist/favicon.ico', PATH + '/dist/templates/favicon.ico', (err) => {
                                if (err) console.log('[BTCO] favicon.ico 转移失败！')
                                else {
                                    COPY('./dist', path.resolve(__dirname, '..') + '/BTCO', (e) => {
                                        if (e) console.log('[BTCO] 转移失败！')
                                        else console.log('[BTCO] 转移完成 √')
                                    })
                                }
                            })
                        })
                    })
                }
            })
        }
    }
}

