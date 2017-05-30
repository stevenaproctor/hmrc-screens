var fs = require('fs')
var path = require('path')
var prompt = require('prompt')
var colors = require('colors/safe')
var mkDir = require('./mkdir')
var buildData = require('./build-data')

function checkImagesDir (newDir, serviceName, scenarioName) {
  var imagesDir = newDir + '/images'

  fs.readdir(imagesDir, function (err, files) {
    if (err) {
      console.log(colors.red('Cannot read directory: ' + imagesDir))
    } else {
      buildData(files, newDir, serviceName, scenarioName)
    }
  })
}

function goBuild (newDir, serviceName, scenarioName) {
  prompt.start()

  var schema = {
    properties: {
      answer: {
        description: colors.green('Move your images to the newly created folder. Hit enter when you\'re done')
      }
    }
  }

  prompt.get(schema, function (err, result) {
    if (err) {
      throw new Error('Something went wrong')
    }

    checkImagesDir(newDir, serviceName, scenarioName)
  })
}

function createService (servicesDir, directoryName, serviceName, scenarioName) {
  var serviceDir = path.join(servicesDir, directoryName)

  mkDir(serviceDir)
    .then(function (serviceDir) {
      console.log(colors.blue('Your folder has been created and the directory is: ' + serviceDir))

      fs.mkdir(serviceDir + '/images', function (err) {
        if (err) {
          console.log(colors.red('Sorry there was a problem creating the images folder.'))
        } else {
          fs.readFile('./template/index.html', function (err, data) {
            if (err) {
              console.log(colors.red('Cannot read index template.'))
            }
            fs.writeFile(serviceDir + '/index.html', data)
            goBuild(serviceDir, serviceName, scenarioName)
          })
        }
      })
    })
}

module.exports = createService
