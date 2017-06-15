var path = require('path')
var colors = require('colors/safe')
var inquirer = require('inquirer')
var mkDir = require('./mkdir')
var getImages = require('./get-images')
var buildData = require('./build-data')
var updatePage = require('./update-page')
var renameImages = require('./rename-images')
var addServiceIndexFile = require('./add-service-index')

function createService (servicesDir, serviceName, scenarioName) {
  var directoryName = serviceName.replace(/ /g, '-').toLowerCase()
  var serviceDir = path.join(servicesDir, directoryName)

  return mkDir(serviceDir)
    .then(function (serviceDir) {
      return mkDir(path.join(serviceDir, 'images'))
    })
    .then(function () {
      return addServiceIndexFile(serviceDir)
    })
    .then(function () {
      var scenarioDir = scenarioName.replace(/ /g, '-').toLowerCase()
      return mkDir(path.join(serviceDir, 'images', scenarioDir), 'this scenario already exists choose another name')
    })
    .then(function (scenarioDir) {
      console.log(colors.blue('Your new scenario is ready: ' + path.resolve(scenarioDir)))

      return inquirer.prompt([
        {
          type: 'input',
          name: 'build',
          message: 'Move your images to the newly created folder. Hit enter when you\'re done'
        }
      ])
    })
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

module.exports = createService
