var fs = require('fs')
var path = require('path')

var copyDir = function (src, dest) {
  var stats = fs.statSync(src)
  var isDirectory = stats && stats.isDirectory()

  if (isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(function (childItemName) {
      copyDir(path.join(src, childItemName),
              path.join(dest, childItemName))
    })
  } else {
    fs.linkSync(src, dest)
  }
}

module.exports = copyDir
