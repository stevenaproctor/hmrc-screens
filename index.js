var path = require('path')
var colors = require('colors/safe')
var inquirer = require('inquirer')
var mkDir = require('./lib/mkdir')
var getImages = require('./lib/get-images')
var buildData = require('./lib/build-data')
var updatePage = require('./lib/update-page')
var renameImages = require('./lib/rename-images')
var getServices = require('./lib/get-services')
var createService = require('./lib/create-service')
var validationUtil = require('./lib/utils/validation')

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
    },
    validate: validationUtil.isPopulated
  },
  {
    type: 'input',
    name: 'scenarioName',
    message: 'What\'s the name of your scenario?',
    validate: function (scenarioName, answers) {
      return validationUtil.validateScenarioName(servicesDir, scenarioName, answers.serviceName)
    }
  }
]

var wait = [{
  type: 'input',
  name: 'build',
  message: 'Move your images to the newly created folder. Hit enter when you\'re done'
}]

inquirer
  .prompt(questions)
  .then(function (answers) {
    var serviceName = answers.serviceName.trim()
    var scenarioName = answers.scenarioName.trim()
    var serviceDir = path.join(servicesDir, serviceName.replace(/ +/g, '-').toLowerCase())

    return mkDir(servicesDir)
      .then(function (servicesDir) {
        return createService(servicesDir, serviceName)
      })
      .then(function (serviceDir) {
        var scenarioDir = scenarioName.replace(/ /g, '-').toLowerCase()
        return mkDir(path.join(serviceDir, 'images', scenarioDir), 'this scenario already exists choose another name')
      })
      .then(function (scenarioDir) {
        console.log(colors.blue('Your new scenario is ready: ' + path.resolve(scenarioDir)))

        return inquirer.prompt(wait)
      })
      .then(function () {
        return getImages(serviceDir, serviceName, scenarioName)
      })
      .then(function (images) {
        return renameImages(images)
      })
      .then(function (images) {
        return buildData(images, serviceDir, serviceName, scenarioName)
      })
      .then(function (dataFile) {
        var indexPage = path.join(path.dirname(serviceDir), '..', 'index.html')
        var servicePath = path.dirname(dataFile)

        return updatePage(indexPage, serviceName, servicePath)
      })
  })
  .catch(function (err) {
    console.log(colors.red(err))
  })
