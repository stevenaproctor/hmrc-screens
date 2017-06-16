var fs = require('fs')
var path = require('path')
var colors = require('colors/safe')
var moment = require('moment')

function buildData (files, serviceDir, serviceName, scenarioName) {
  var scenarioDir = scenarioName.replace(/ +/g, '-').toLowerCase()

  var userjourneys = files.filter(function (file) {
    return /\.(jpe?g|gif|png)/.test(file)
  }).map(function (image) {
    var caption = path.parse(image).name
      .replace(/^[0-9]+/, '')
      .replace(/-+/g, ' ')
      .trim()

    return {
      'caption': caption,
      'imgref': 'images/' + scenarioDir + '/' + image,
      'note': 'Notes go here...'
    }
  })

  return new Promise(function (resolve, reject) {
    fs.readFile(path.join(serviceDir, 'data.js'), 'utf8', function (err, data) {
      if (err) {
        data = {
          'service': serviceName,
          'last-updated': moment().format('Do MMMM YYYY'),
          'userjourneys': [{
            'title': scenarioName,
            'path': userjourneys
          }]
        }
      } else {
        data = JSON.parse(data.replace(/^.*(?={)/, ''))
        data['last-updated'] = moment().format('Do MMMM YYYY')

        data.userjourneys.push({
          'title': scenarioName,
          'path': userjourneys
        })
      }

      data = 'var data = ' + JSON.stringify(data, null, 2)

      fs.writeFile(path.join(serviceDir, 'data.js'), data, function (err) {
        if (err) {
          reject(new Error('There was a problem creating the data for your new service: ' + serviceDir))
        }

        var servicePath = path.join(serviceDir, 'index.html')
        console.log(colors.green('Your service is now ready. You can find it here: ' + servicePath))

        resolve(path.join(serviceDir, 'data.js'))
      })
    })
  })
}

module.exports = buildData
