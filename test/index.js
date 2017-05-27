var fs = require('fs')
var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var rimraf = require('rimraf')
var prompt = require('prompt')
var getFile = require('./utils/get-file')
var createService = require('../lib/create-service')

var cleanup = function (path) {
  rimraf.sync(path)
}

test('Creates a directory for a new service', function (t) {
  t.plan(4)

  var testDir = 'test-directory'
  var testService = 'test-service'
  var testScenario = 'test-scenario'
  var testDirPath = path.join(__dirname, '..', 'service', testDir)
  var dataFile = path.join(testDirPath, 'data.js')

  sinon.stub(console, 'log')
  sinon.stub(prompt, 'getInput').callsFake(function (prop, callback) {
    callback(null, 'go')
  })

  cleanup(testDirPath)

  createService(testDir, testService, testScenario)

  getFile(dataFile, function (file) {
    if (file) {
      console.log.restore()

      var data = {
        'service': testService,
        'last-updated': 'Some date',
        'userjourneys': [{
          'title': testScenario,
          'path': []
        }]
      }

      var serviceDir = fs.readdirSync(testDirPath)
      var dataContents = fs.readFileSync(file).toString()
      const expectedContent = 'var data = ' + JSON.stringify(data)

      t.true(serviceDir.includes('images'), 'with an images directory')
      t.true(serviceDir.includes('index.html'), 'with an index.html file')
      t.true(serviceDir.includes('data.js'), 'with a data.js file')
      t.equal(dataContents, expectedContent, 'and the data.js file has content')

      cleanup(testDirPath)
    }
  })
})
