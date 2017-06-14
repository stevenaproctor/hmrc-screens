var path = require('path')
var colors = require('colors/safe')
var inquirer = require('inquirer')
var mkDir = require('./mkdir')
var getImages = require('./get-images')
var buildData = require('./build-data')
var updatePage = require('./update-page')
var renameImages = require('./rename-images')
var addServiceIndexFile = require('./add-service-index')

function goBuild (serviceDir, serviceName, scenarioName) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'build',
      message: 'Move your images to the newly created folder. Hit enter when you\'re done'
    }
  ])
  .then(function () {
    return getImages(serviceDir, serviceName, scenarioName)
  })
  .then(function (images) {
    return renameImages(images)
  })
  .then(function (images) {
    return buildData(images, serviceDir, serviceName, scenarioName)
  })
  .then(function (dataFile) {
    var indexPage = path.join(path.dirname(serviceDir), '..', 'index.html')
    var servicePath = path.dirname(dataFile)

    return updatePage(indexPage, serviceName, servicePath)
  })
  .catch(function (err) {
    console.log(err)
  })
}

function createService (servicesDir, serviceName, scenarioName) {
  var directoryName = serviceName.replace(/ /g, '-').toLowerCase()
  var serviceDir = path.join(servicesDir, directoryName)

  return mkDir(serviceDir)
    .then(function (serviceDir) {
      return mkDir(path.join(serviceDir, 'images'))
    })
    .then(function (imagesDir) {
      console.log(colors.blue('Your service directory is: ' + path.resolve(serviceDir)))

      var scenarioDir = scenarioName.replace(/ /g, '-').toLowerCase()
      return mkDir(path.join(imagesDir, scenarioDir), 'this scenario already exists choose another name')
    })
    .then(function (scenarioDir) {
      console.log(colors.blue('Your scenario directory is: ' + path.resolve(scenarioDir)))

      return addServiceIndexFile(serviceDir)
    })
    .then(function () {
      return goBuild(serviceDir, serviceName, scenarioName)
    })
    .catch(function (err) {
      console.log(colors.red(err))
    })
}

module.exports = createService
