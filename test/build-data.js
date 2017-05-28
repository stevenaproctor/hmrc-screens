var fs = require('fs')
var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var rimraf = require('rimraf')
var getFile = require('./utils/get-file')
var buildData = require('../lib/build-data')

var cleanup = function (path) {
  rimraf.sync(path)
}

test('Create a data file for a service', function (t) {
  t.plan(1)

  var testDir = path.join(__dirname, 'service')
  var testService = 'test-service'
  var testScenario = 'test-scenario'

  var files = [
    'not-an-image.txt',
    '01-test-image-for-a-test-service.png'
  ]

  var data = {
    'service': testService,
    'last-updated': 'Some date',
    'userjourneys': [{
      'title': testScenario,
      'path': [{
        'caption': 'test image for a test service',
        'imgref': 'images/' + files[1],
        'note': 'Notes go here...'
      }]
    }]
  }

  cleanup(testDir)
  fs.mkdirSync(testDir)

  sinon.stub(console, 'log')
  buildData(files, testDir, testService, testScenario)

  getFile(path.join(testDir, 'data.js'), function (file) {
    if (file) {
      console.log.restore()

      var dataContents = fs.readFileSync(file).toString()
      const expectedContents = 'var data = ' + JSON.stringify(data)

      t.equal(dataContents, expectedContents, 'with a data object built from args')

      cleanup(testDir)
    }
  })
})
