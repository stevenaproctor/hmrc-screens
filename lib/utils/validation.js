var fs = require('fs')
var path = require('path')

function isPopulated (value) {
  return value ? true : 'You must provide a name'
}

function isValidScenario (scenarioDir, scenarioName) {
  var scenarioList = fs.readdirSync(scenarioDir)
  var scenarioExists = scenarioList.find(function (existingScenario) {
    return scenarioName === existingScenario
  })

  return !scenarioExists ? true : 'A scenario with this name already exists'
}

function serviceHasScenarios (scenarioDir) {
  try {
    return !!fs.readdirSync(scenarioDir)
  } catch (e) {
    // if it cannot read the images directory, it means the service has no services
    return false
  }
}

function validateScenarioName (servicesDir, scenarioName, serviceName) {
  var populated = isPopulated(scenarioName)

  if (populated !== true) {
    return populated
  } else {
    var serviceDir = path.join(servicesDir, serviceName.replace(/ +/g, '-').toLowerCase())
    var scenarioDir = path.join(serviceDir, 'images')
    var hasScenarios = serviceHasScenarios(scenarioDir)

    if (hasScenarios) {
      return isValidScenario(scenarioDir, scenarioName)
    }
  }

  return true
}

module.exports = {
  isPopulated: isPopulated,
  validateScenarioName: validateScenarioName
}
