var fs = require('fs')
var path = require('path')
var colors = require('colors/safe')

function buildData (files, newDir, serviceName, scenarioName) {
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
        'imgref': 'images/' + scenarioName + '/' + images[i],
        'note': 'Notes go here...'
      }
    )
  }

  var json = JSON.stringify(data, null, 2)

  return new Promise(function (resolve, reject) {
    fs.writeFile(path.join(newDir, 'data.js'), 'var data = ' + json + '', function (err) {
      if (err) {
        reject(new Error('There was a problem creating the data for your new service: ' + newDir))
      }
      console.log(colors.green('Service is now complete and is waiting for you, you can find it here ' + newDir + '/index.html'))
      resolve(path.join(newDir, 'data.js'))
    })
  })
}

module.exports = buildData
