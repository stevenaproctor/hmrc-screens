var cleanup = require('./utils/cleanup')
var fs = require('fs')
var path = require('path')
var test = require('tape')
var validationUtil = require('../lib/utils/validation')

test('Validate given inputs are valid', function (t) {
  t.plan(6)

  // isPopulated
  t.equal(validationUtil.isPopulated(''), 'You must provide a name', 'returns an error message when provided with an empty input')
  t.equal(validationUtil.isPopulated('service'), true, 'returns true when provided with a string')

  // validateScenarioName
  var servicesDir = path.join(__dirname, 'services')
  var serviceDir = path.join(servicesDir, 'test-service')
  var scenariosDir = path.join(serviceDir, 'images')
  var scenarioDir = path.join(scenariosDir, 'test-scenario')

  fs.mkdirSync(servicesDir)
  fs.mkdirSync(serviceDir)
  fs.mkdirSync(scenariosDir)
  fs.mkdirSync(scenarioDir)

  t.equal(validationUtil.validateScenarioName(servicesDir, 'first-scenario', 'test-service'), true, 'returns true when the service has no scenarios')
  t.equal(validationUtil.validateScenarioName(servicesDir, '', 'test-service'), 'You must provide a name', 'returns an error message when provided with an empty input')
  t.equal(validationUtil.validateScenarioName(servicesDir, 'test-scenario', 'test-service'), 'A scenario with this name already exists', 'return an error message when provided with a scenario name that already exists')
  t.equal(validationUtil.validateScenarioName(servicesDir, 'test-scenario-new', 'test-service'), true, 'returns true when supplied with a scenario name that does not already exist')

  cleanup(servicesDir)
})
