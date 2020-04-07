const HtmlWebpackPlugin = require('html-webpack-plugin'),
    Minify = require('html-minifier').minify,
    devCheck = require('./devCheck'),
    fs = require('fs')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins: [
        new devCheck(),
        new HtmlWebpackPlugin({
            template: 'this.btcotemp',              //-> 宝塔插件默认模板
            filename: '../../BTCO/index.html',  //-> 打包到插件主目录

            // MAIN
            title: 'BTCO',
            hitokoto: 'Thank the world, thank you.',
            script: fs.readFileSync(__dirname + '/dist/index_bundle.js'),
            btco_tempdom: Minify(fs.readFileSync(__dirname + '/src/app.html').toString(), {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }),
            copyright: '|  _     _____ _ _ ____    _   _ _____ _____\n'
                + '| | |   |  ___/ / |___ \\  | \\ | | ____|_   _|\n'
                + '| | |   | |_  | | | __) | |  \\| |  _|   | |\n'
                + '| | |___|  _| | | |/ __/ _| |\\  | |___  | |\n'
                + '| |_____|_|   |_|_|_____(_)_| \\_|_____| |_|',

            inject: false,
            showErrors: false,
            minify: {
                collapseWhitespace: true    // 压缩
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/dev',
        publicPath: '/dist/',
        compress: true,
        inline: false,
        port: 9000
    }
}