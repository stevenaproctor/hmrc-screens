var fs = require('fs')
var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var cleanup = require('./utils/cleanup')
var buildData = require('../lib/build-data')

var testDir = path.join(__dirname, 'service')
var testService = 'Test Service'
var testScenario = 'Test Scenario'
var testScenarioTwo = 'Test Scenario Two'

var files = [
  'not-an-image.txt',
  '01-test-image-for-a-test-service.png'
]

test('Create a data file for a new service', function (t) {
  t.plan(1)

  var data = {
    'service': testService,
    'last-updated': 'Some date',
    'userjourneys': [{
      'title': testScenario,
      'path': [{
        'caption': 'test image for a test service',
        'imgref': 'images/test-scenario/' + files[1],
        'note': 'Notes go here...'
      }]
    }]
  }

  cleanup(testDir)
  fs.mkdirSync(testDir)

  sinon.stub(console, 'log')

  buildData(files, testDir, testService, testScenario)
    .then(function (filePath) {
      console.log.restore()

      var dataContents = fs.readFileSync(filePath).toString()
      const expectedContents = 'var data = ' + JSON.stringify(data, null, 2)

      t.equal(dataContents, expectedContents, 'with a data object built from args')

      cleanup(testDir)
    })
})

test('Create a data file for a new scenario in an existing service', function (t) {
  t.plan(1)

  var data = {
    'service': testService,
    'last-updated': 'Some date',
    'userjourneys': [{
      'title': testScenario,
      'path': [{
        'caption': 'test image for a test service',
        'imgref': 'images/test-scenario/' + files[1],
        'note': 'Notes go here...'
      }]
    },
    {
      'title': testScenarioTwo,
      'path': [{
        'caption': 'test image for a test service',
        'imgref': 'images/test-scenario-two/' + files[1],
        'note': 'Notes go here...'
      }]
    }]
  }

  cleanup(testDir)
  fs.mkdirSync(testDir)

  sinon.stub(console, 'log')

  buildData(files, testDir, testService, testScenario)
    .then(function () {
      return buildData(files, testDir, testService, testScenarioTwo)
    })
    .then(function (filePath) {
      console.log.restore()

      var dataContents = fs.readFileSync(filePath).toString()
      const expectedContents = 'var data = ' + JSON.stringify(data, null, 2)

      t.equal(dataContents, expectedContents, 'with a data object built from args')

      cleanup(testDir)
    })
})
