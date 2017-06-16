var fs = require('fs')
var path = require('path')
var test = require('tape')
var cleanup = require('./utils/cleanup')
var addServiceIndexFile = require('../lib/add-service-index')

test('Adds an index file to a service directory', function (t) {
  t.plan(4)

  var serviceDir = path.join(__dirname, 'test-index')
  var templateIndex = path.join(__dirname, '..', 'template', 'index.html')

  cleanup(serviceDir)
  fs.mkdirSync(serviceDir)

  addServiceIndexFile(serviceDir)
    .then(function (indexFile) {
      var exists = fs.statSync(indexFile)
      var index = fs.readFileSync(indexFile).toString()
      var template = fs.readFileSync(templateIndex).toString()

      t.ok(index.includes('<title>{{service}} screenshots</title>'), 'uses the service name in the title')
      t.ok(exists.isFile(), 'writes an index file')
      t.equal(index, template, 'with the same contents as the template file')
      t.equal(indexFile, path.join(serviceDir, 'index.html'), 'returns the index file path')

      cleanup(serviceDir)
    })
})
