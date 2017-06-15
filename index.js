var path = require('path')
var inquirer = require('inquirer')
var mkDir = require('./lib/mkdir')
var getServices = require('./lib/get-services')
var createService = require('./lib/create-service')

var servicesDir = path.join(__dirname, 'service')

var listServices = function () {
  return getServices(servicesDir)
    .then(function (services) {
      return services.concat([
        new inquirer.Separator(),
        'Create a new service',
        new inquirer.Separator()
      ])
    })
}

var questions = [
  {
    type: 'list',
    name: 'serviceName',
    message: 'Choose a service or create a new one:',
    choices: listServices,
    paginated: true
  },
  {
    type: 'input',
    name: 'serviceName',
    message: 'What\'s the name of your service?',
    when: function (answers) {
      return answers.serviceName === 'Create a new service'
    }
  },
  {
    type: 'input',
    name: 'scenarioName',
    message: 'What\'s the name of your scenario?'
  }
]

inquirer.prompt(questions).then(function (answers) {
  mkDir(servicesDir)
    .then(function (servicesDir) {
      createService(
        servicesDir,
        answers.serviceName,
        answers.scenarioName
      )
    })
}).catch(function (err) {
  console.log(err)
})
