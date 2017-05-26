var fs = require('fs')
var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var rimraf = require('rimraf')
var prompt = require('prompt')
var getFile = require('./utils/get-file')
var createNewFolder = require('../index').createNewFolder

var cleanup = function (path) {
  rimraf.sync(path)
}

test('Creates a directory for a new service', function (t) {
  t.plan(4)

  var testDir = 'test-directory'
  var testDirPath = path.join(__dirname, '..', 'service', testDir)
  var dataFile = path.join(testDirPath, 'data.js')

  sinon.stub(prompt, 'getInput').callsFake(function (prop, callback) {
    callback(null, 'go')
  })

  sinon.stub(console, 'log')
  createNewFolder(testDir)

  getFile(dataFile, function (file) {
    if (file) {
      console.log.restore()

      var serviceDir = fs.readdirSync(path.join(testDirPath))
      var dataContents = fs.readFileSync(file).toString()
      const expectedContent = 'var data = {"last-updated":"Some date","userjourneys":[{"path":[]}]}'

      t.true(serviceDir.includes('images'), 'with an images directory')
      t.true(serviceDir.includes('index.html'), 'with an index.html file')
      t.true(serviceDir.includes('data.js'), 'with a data.js file')
      t.equal(dataContents, expectedContent, 'and the data.js file has content')

      cleanup(testDirPath)
    }
  })
})
