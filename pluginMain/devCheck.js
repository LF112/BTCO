const fs = require('fs'), Minify = require('html-minifier').minify

class devCheck {
    apply (compiler) {
        compiler.plugin('watchRun', (compilation, callback) => {
            let devPath = __dirname + '/dev'
            fs.readFile(devPath + '/dev.html', (err, data) => {
                fs.writeFile(devPath + '/index.html', data.toString().replace('|!SCRIPT!|',
                    Minify(fs.readFileSync(__dirname + '/src/app.html').toString(), {
                        removeAttributeQuotes: true,
                        collapseWhitespace: true
                    })
                ), () => { })
            })
        })
    }
}

module.exports = devCheck