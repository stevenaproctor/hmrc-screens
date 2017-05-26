var prompt = require('prompt')
var colors = require('colors/safe')
var createService = require('./lib/create-service')

prompt.message = colors.yellow('Question!')
prompt.delimiter = colors.green(' %% ')

var schema = {
  properties: {
    serviceName: {
      message: colors.green('What is the service called?')
    },
    scenarioName: {
      message: colors.green('Enter the name of the scenario for this service.')
    },
    directoryName: {
      message: colors.green('Please enter a new directory name for this service')
    }
  }
}

prompt.get(schema, function (err, result) {
  if (err) {
    console.log('Sorry there was an error.', err)
    process.exit(1)
  }

  createService(
    result.directoryName,
    result.scenarioName,
    result.serviceName
  )
})
