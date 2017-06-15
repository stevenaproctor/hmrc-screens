var fs = require('fs')
var path = require('path')
var test = require('tape')
var cleanup = require('./utils/cleanup')
var copyDir = require('./utils/copy-dir')
var getImages = require('../lib/get-images')

test('Returns images from a directory', function (t) {
  t.plan(1)

  var servicesDir = path.join(__dirname, 'services-images')
  var serviceName = 'Test Service'
  var scenarioName = 'Images Scenario'

  var serviceDir = path.join(servicesDir, serviceName.replace(/ /g, '-').toLowerCase())
  var scenarioDir = scenarioName.replace(/ /g, '-').toLowerCase()

  cleanup(servicesDir)

  fs.mkdirSync(servicesDir)
  fs.mkdirSync(serviceDir)
  fs.mkdirSync(path.join(serviceDir, 'images'))
  copyDir(path.join(__dirname, 'files'), path.join(serviceDir, 'images', scenarioDir))

  getImages(serviceDir, serviceName, scenarioName)
    .then(function (images) {
      t.equal(images.length, 3, 'containing 3 images')
      cleanup(servicesDir)
    })
})
