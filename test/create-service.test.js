var fs = require('fs')
var path = require('path')
var test = require('tape')
var cleanup = require('./utils/cleanup')
var createService = require('../lib/create-service')

test('Create a directory for a new service', function (t) {
  t.plan(4)

  var servicesDir = path.join(__dirname, 'service')
  var testService = 'Test Service'
  var testServiceDir = testService.replace(/ /g, '-').toLowerCase()
  var testDirPath = path.join(servicesDir, testServiceDir)
  var rootIndexPage = path.join(__dirname, '..', 'index.html')
  var testIndexPage = path.join(__dirname, 'index.html')

  cleanup(servicesDir)
  cleanup(testIndexPage)

  fs.mkdirSync(servicesDir)

  var indexFile = fs.readFileSync(rootIndexPage)
  fs.writeFileSync(testIndexPage, indexFile)

  createService(servicesDir, testService)
    .then(function (serviceDir) {
      var serviceDirContents = fs.readdirSync(testDirPath)

      t.equal(serviceDirContents.length, 2, 'with 2 things in it')
      t.true(serviceDirContents.includes('images'), 'an images directory')
      t.true(serviceDirContents.includes('index.html'), 'and an index.html file')
      t.equal(serviceDir, path.join(servicesDir, 'test-service'), 'and returns the new service path')

      cleanup(servicesDir)
      cleanup(testIndexPage)
    })
})
