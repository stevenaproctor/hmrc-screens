var fs = require('fs')
var path = require('path')
var colors = require('colors/safe')
var inquirer = require('inquirer')
var mkDir = require('./mkdir')
var buildData = require('./build-data')
var updatePage = require('./update-page')
var renameImages = require('./rename-images')

function checkImagesDir (serviceDir, serviceName, scenarioName) {
  console.log('serviceDir', serviceDir)
  var scenarioDir = scenarioName.replace(/ /g, '-').toLowerCase()
  var imagesDir = path.join(serviceDir, 'images', scenarioDir)

  fs.readdir(imagesDir, function (err, images) {
    if (err) {
      throw new Error(colors.red('Cannot read directory: ' + imagesDir))
    }

    images = images.map(function (image) {
      return path.join(imagesDir, image)
    })

    renameImages(images)
      .then(function (images) {
        return buildData(images, serviceDir, serviceName, scenarioName)
      })
      .then(function (dataFile) {
        var indexPage = path.join(path.dirname(serviceDir), '..', 'index.html')
        console.log('indexPage', indexPage)

        var servicePath = path.dirname(dataFile)
        return updatePage(indexPage, serviceName, servicePath)
      })
      .catch(function (err) {
        console.log(colors.red(err))
      })
  })
}

function goBuild (serviceDir, serviceName, scenarioName) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'build',
      message: 'Move your images to the newly created folder. Hit enter when you\'re done'
    }
  ]).then(function () {
    checkImagesDir(serviceDir, serviceName, scenarioName)
  }).catch(function (err) {
    console.log(err)
  })
}

function createService (servicesDir, serviceName, scenarioName) {
  var directoryName = serviceName.replace(/ /g, '-').toLowerCase()
  var serviceDir = path.join(servicesDir, directoryName)

  mkDir(serviceDir)
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
      fs.readFile(path.join('template', 'index.html'), function (err, data) {
        if (err) {
          console.log(colors.red('Cannot read index template.'))
        }

        fs.writeFile(path.join(serviceDir, 'index.html'), data)
        goBuild(serviceDir, serviceName, scenarioName)
      })
    })
    .catch(function (err) {
      console.log(colors.red(err))
    })
}

module.exports = createService
