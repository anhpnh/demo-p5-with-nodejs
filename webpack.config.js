const path = require('path');
module.exports = {
    entry: __dirname + '\\src\\app.js',
    output: {
        path: __dirname + "\\public\\js",
        filename: 'bundle.js'
    }
}