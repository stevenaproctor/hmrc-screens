var path = require('path')
var mkDir = require('./mkdir')
var addServiceIndexFile = require('./add-service-index')

function createService (servicesDir, serviceName) {
  var directoryName = serviceName.replace(/ /g, '-').toLowerCase()
  var serviceDir = path.join(servicesDir, directoryName)

  return mkDir(serviceDir)
    .then(function (serviceDir) {
      return mkDir(path.join(serviceDir, 'images'))
    })
    .then(function () {
      return addServiceIndexFile(serviceDir)
    })
    .then(function (indexFile) {
      return path.dirname(indexFile)
    })
}

module.exports = createService
