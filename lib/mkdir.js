var fs = require('fs')
var path = require('path')

var mkDir = function (dirPath, errorMessage) {
  return new Promise(function (resolve, reject) {
    fs.mkdir(dirPath, function (err) {
      if (err) {
        var rootDir = path.join(__dirname, '..')
        var relativePath = path.relative(rootDir, err.path)

        switch (err.code) {
          case 'EEXIST':
            if (errorMessage) {
              reject(new Error(errorMessage))
            }

            resolve(dirPath)
            break
          case 'ENOENT':
            if (relativePath.includes(path.sep)) {
              reject(new Error('Cannot create nested directories. Please specify a single directory to create.'))
            }

            reject(new Error(relativePath + ' could not be created. Make sure all the directories in the path exist'))
            break
          default:
            reject(new Error('Something went wrong. Please try again.', err))
        }
      }

      resolve(dirPath)
    })
  })
}

module.exports = mkDir
