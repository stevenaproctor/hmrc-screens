var fs = require('fs')
var path = require('path')

var getImages = function (serviceDir, serviceName, scenarioName) {
  var scenarioDir = scenarioName.replace(/ /g, '-').toLowerCase()
  var imagesDir = path.join(serviceDir, 'images', scenarioDir)

  return new Promise(function (resolve, reject) {
    fs.readdir(imagesDir, function (err, images) {
      if (err) {
        reject(new Error('Cannot read directory: ' + imagesDir))
      }

      images = images
        .filter(function (file) {
          return /\.(jpe?g|gif|png)/.test(file)
        })
        .map(function (image) {
          return path.join(imagesDir, image)
        })

      resolve(images)
    })
  })
}

module.exports = getImages
