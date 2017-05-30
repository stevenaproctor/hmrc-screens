var fs = require('fs')
var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var prompt = require('prompt')
var cleanup = require('./utils/cleanup')
var getFile = require('./utils/get-file')
var createService = require('../lib/create-service')

test('Create a directory for a new service', function (t) {
  t.plan(3)

  var servicesDir = path.join(__dirname, 'service')
  var testDir = 'test-directory'
  var testService = 'test-service'
  var testScenario = 'test-scenario'
  var testDirPath = path.join(servicesDir, testDir)
  var dataFile = path.join(testDirPath, 'data.js')

  sinon.stub(console, 'log')
  sinon.stub(prompt, 'getInput').callsFake(function (prop, callback) {
    callback(null, 'go')
  })

  cleanup(servicesDir)
  fs.mkdirSync(servicesDir)

  createService(servicesDir, testDir, testService, testScenario)

  getFile(dataFile, function (file) {
    if (file) {
      console.log.restore()
      var serviceDir = fs.readdirSync(testDirPath)

      t.true(serviceDir.includes('images'), 'with an images directory')
      t.true(serviceDir.includes('index.html'), 'with an index.html file')
      t.true(serviceDir.includes('data.js'), 'with a data.js file')

      cleanup(servicesDir)
    }
  })
})
