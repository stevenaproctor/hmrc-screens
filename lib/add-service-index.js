var fs = require('fs')
var path = require('path')

var addServiceIndexFile = function (serviceDir) {
  var templateFile = path.join(__dirname, '..', 'template', 'index.html')
  var serviceIndexFile = path.join(serviceDir, 'index.html')

  return new Promise(function (resolve, reject) {
    fs.readFile(templateFile, function (err, data) {
      if (err) {
        reject(new Error('Cannot read index template.'))
      }

      fs.writeFile(serviceIndexFile, data, function (err) {
        if (err) {
          reject(new Error('Cannot write index file.'))
        }

        resolve(serviceIndexFile)
      })
    })
  })
}

module.exports = addServiceIndexFile
