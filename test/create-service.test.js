var fs = require('fs')
var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var inquirer = require('inquirer')
var cleanup = require('./utils/cleanup')
var getFile = require('./utils/get-file')
var createService = require('../lib/create-service')

test('Create a directory for a new service', function (t) {
  t.plan(4)

  var servicesDir = path.join(__dirname, 'service')
  var testService = 'Test Service'
  var testScenario = 'Test Scenario'
  var testServiceDir = testService.replace(/ /g, '-').toLowerCase()
  var testScenarioDir = testScenario.replace(/ /g, '-').toLowerCase()
  var testDirPath = path.join(servicesDir, testServiceDir)
  var dataFile = path.join(testDirPath, 'data.js')
  var rootIndexPage = path.join(__dirname, '..', 'index.html')
  var testIndexPage = path.join(__dirname, 'index.html')

  sinon.stub(console, 'log')
  sinon.stub(inquirer, 'prompt').callsFake(function (answers) {
    return Promise.resolve(answers[0])
  })

  cleanup(servicesDir)
  cleanup(testIndexPage)

  fs.mkdirSync(servicesDir)

  var indexFile = fs.readFileSync(rootIndexPage)
  fs.writeFileSync(testIndexPage, indexFile)

  createService(servicesDir, testService, testScenario)

  getFile(dataFile, function (file) {
    if (file) {
      console.log.restore()
      inquirer.prompt.restore()

      var serviceDir = fs.readdirSync(testDirPath)
      var scenarioDir = fs.readdirSync(path.join(testDirPath, 'images'))

      t.true(serviceDir.includes('images'), 'with an images directory')
      t.true(serviceDir.includes('index.html'), 'with an index.html file')
      t.true(serviceDir.includes('data.js'), 'with a data.js file')
      t.true(scenarioDir.includes(testScenarioDir), 'with a scenario directory')

      cleanup(servicesDir)
      cleanup(testIndexPage)
    }
  })
})
