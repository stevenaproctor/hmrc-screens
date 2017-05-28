var fs = require('fs')
var path = require('path')
var prompt = require('prompt')
var colors = require('colors/safe')
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
  prompt.get({
    properties: {
      answer: {
        message: colors.green('Copy and paste your images to the newly created folder. When done Please enter go')
      }
    }
  }, function (err, result) {
    var answer = result.answer.toLowerCase()

    if (err) {
      console.log(colors.red('Sorry there was a problem'))
    } else if (answer === 'go') {
      checkImagesDir(newDir, serviceName, scenarioName)
    }
  })
}

function createService (servicesDir, directoryName, serviceName, scenarioName) {
  var serviceDir = path.join(servicesDir, directoryName)

  fs.mkdir(serviceDir, function (err) {
    if (err) {
      console.log(colors.red('Sorry there was a problem, try creating a folder with a different name.'))
    } else {
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
    }
  })
}

module.exports = createService
