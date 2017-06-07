var fs = require('fs')
var path = require('path')
var inquirer = require('inquirer')
var mkDir = require('./lib/mkdir')
var createService = require('./lib/create-service')

var servicesDir = path.join(__dirname, 'service')

var getServices = function () {
  return new Promise(function (resolve, reject) {
    fs.readdir(servicesDir, function (err, files) {
      if (err) {
        reject(err)
      }

      files = files.filter(function (file) {
        var stats = fs.statSync(path.join(servicesDir, file))
        return stats.isDirectory()
      }).map(function (service) {
        return service.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
      }).concat([
        new inquirer.Separator(),
        'Create a new service',
        new inquirer.Separator()
      ])

      resolve(files)
    })
  })
}

var questions = [
  {
    type: 'list',
    name: 'serviceName',
    message: 'Choose a service or create a new one:',
    choices: getServices,
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
        answers.serviceName.replace(/ /g, '-').toLowerCase(),
        answers.serviceName,
        answers.scenarioName
      )
    })
}).catch(function (err) {
  console.log(err)
})
