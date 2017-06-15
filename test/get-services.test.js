var fs = require('fs')
var path = require('path')
var test = require('tape')
var cleanup = require('./utils/cleanup')
var getServices = require('../lib/get-services')

test('Returns service names from a directory of services', function (t) {
  t.plan(1)

  var servicesDir = path.join(__dirname, 'test-services')
  var serviceDir = path.join(servicesDir, 'test-service')

  cleanup(servicesDir)

  fs.mkdirSync(servicesDir)
  fs.mkdirSync(serviceDir)

  getServices(servicesDir)
    .then(function (services) {
      var expectedServices = ['Test Service']

      t.deepEqual(services, expectedServices, 'title cased space seperated service name')

      cleanup(servicesDir)
    })
})
