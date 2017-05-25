var fs = require('fs')
var prompt = require('prompt')
var colors = require('colors/safe')

prompt.message = colors.yellow('Question!')
prompt.delimiter = colors.green(' %% ')

var serviceDir = './service/'
var newDir
var scenarioName
var serviceName

var schema = {
  properties: {
    serviceName: {
      message: colors.green('What is the service called?')
    },
    scenarioName: {
      message: colors.green('Enter the name of the scenario for this service.')
    },
    directoryName: {
      message: colors.green('Please enter a new directory name for this service')
    }
  }
}

// Create the folder for the new service

function createNewFolder (directory) {
  newDir = serviceDir + directory

  fs.mkdir(newDir, function (err) {
    if (err) {
      console.log(colors.red('Sorry there was a problem, try creating a folder with a different name.'))
    } else {
      console.log(colors.blue('Your folder has been created and the directory is: ' + newDir))

      fs.mkdir(newDir + '/images', function (err) {
        if (err) {
          console.log(colors.red('Sorry there was a problem creating the images folder.'))
        } else {
          fs.readFile('./template/index.html', function (err, data) {
            if (err) {
              console.log(colors.red('Cannot read index template.'))
            }
            fs.writeFile(newDir + '/index.html', data)
            goBuild(newDir)
          })
        }
      })
    }
  })

  return newDir
};

function goBuild (newDir) {
  prompt.start()
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
      checkImagesDir(newDir)
    }
  })
}

function checkImagesDir (newDir) {
  var imagesDir = newDir + '/images'

  fs.readdir(imagesDir, function (err, files) {
    if (err) {
      console.log(colors.red('Cannot read directory: ' + imagesDir))
    } else {
      buildData(files)
    }
  })
}

function buildData (files) {
  // Build JSON
  var data = {
    'service': serviceName,
    'last-updated': 'Some date',
    'userjourneys': [{
      'title': scenarioName,
      'path': []
    }]
  }

  var images = files.filter(function (file) {
    return /\.(jpe?g|gif|png)/.test(file)
  })

  for (var i = 0; i <= images.length - 1; i++) {
    data.userjourneys[0].path.push(
      {
        'caption': images[i].replace(/-?[0-9]+-?/, '') // Remove numbers
          .replace(/-/g, ' ') // Remove hyphens
          .replace(/\.gif|\.png|\.jpg/, '') // Remove file extensions
          .replace(/\s{2,}/g, ' '), // Remove double spaces
        'imgref': 'images/' + images[i],
        'note': 'Notes go here...'
      }
    )
  }
  var json = JSON.stringify(data)
  fs.writeFile(newDir + '/data.js', 'var data = ' + json + '')

  console.log(colors.green('Service is now complete and is waiting for you, you can find it here ' + newDir + '/index.html'))
}

prompt.get(schema, function (err, result) {
  if (err) {
    console.log('Sorry there was an error.', err)
    process.exit(1)
  }
  scenarioName = result.scenarioName
  serviceName = result.serviceName
  createNewFolder(result.directoryName)
})
