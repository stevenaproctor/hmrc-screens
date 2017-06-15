var fs = require('fs')
var path = require('path')

var getServices = function (servicesDir) {
  return new Promise(function (resolve, reject) {
    fs.readdir(servicesDir, function (err, files) {
      if (err) {
        reject(err)
      }

      files = files.filter(function (file) {
        var stats = fs.statSync(path.join(servicesDir, file))
        return stats.isDirectory()
      }).map(function (service) {
        return service.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
      })

      resolve(files)
    })
  })
}

module.exports = getServices
