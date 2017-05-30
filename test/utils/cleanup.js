var rimraf = require('rimraf')

var cleanup = function (path) {
  rimraf.sync(path)
}

module.exports = cleanup
