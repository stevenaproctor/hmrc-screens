var path = require('path')
var prompt = require('prompt')
var colors = require('colors/safe')
var mkDir = require('./lib/mkdir')
var createService = require('./lib/create-service')

var servicesDir = path.join(__dirname, 'service')

var schema = {
  properties: {
    serviceName: {
      description: colors.green('What is the service called?'),
      message: colors.red('We need the name of your service so we can create it'),
      required: true
    },
    scenarioName: {
      description: colors.green('Enter the name of the scenario for this service')
    },
    directoryName: {
      description: colors.green('Please enter a new directory name for this service')
    }
  }
}

prompt.message = colors.yellow('Question!')
prompt.delimiter = colors.green(' %% ')

prompt.start()

prompt.get(schema, function (err, result) {
  if (err) {
    console.log('Sorry there was an error.', err)
    process.exit(1)
  }

  mkDir(servicesDir)
    .then(function (servicesDir) {
      createService(
        servicesDir,
        result.directoryName,
        result.scenarioName,
        result.serviceName
      )
    })
})
