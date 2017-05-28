var fs = require('fs')

var mkDir = function (path) {
  return new Promise(function (resolve, reject) {
    fs.access(path, function (err) {
      if (err) {
        fs.mkdir(path, function (err) {
          if (err) {
            reject(err)
          }

          resolve(path)
        })
      }

      resolve(path)
    })
  })
}

module.exports = mkDir
