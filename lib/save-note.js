var fs = require('fs')
var path = require('path')

var saveNote = function (noteInfo, servicesDir) {
  return new Promise(function (resolve, reject) {
    var serviceDir = path.join(servicesDir, noteInfo.serviceName)

    fs.readFile(path.join(serviceDir, 'data.js'), 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }
      data = JSON.parse(data.replace(/^.*(?={)/, ''))

      var activeUserJourneyIndex = data.userjourneys.findIndex(function (journey) {
        return journey.title === noteInfo.userJourney.title
      })

      var activePathIndex = data.userjourneys[activeUserJourneyIndex].path.findIndex(function (path) {
        return path.caption === noteInfo.path.caption
      })

      data.userjourneys[activeUserJourneyIndex].path[activePathIndex].note = noteInfo.note

      var dataFile = 'var data = ' + JSON.stringify(data, null, 2)
      fs.writeFile(path.join(serviceDir, 'data.js'), dataFile, function (err) {
        if (err) {
          reject(err)
        }

        resolve(data)
      })
    })
  })
}

module.exports = saveNote
