var fs = require('fs')
var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var rimraf = require('rimraf')
var prompt = require('prompt')
var getFile = require('./test/utils/get-file')
var createNewFolder = require('./index').createNewFolder

test('Creates a directory for a new service', function (t) {
  t.plan(1)

  var testDir = 'test-directory'
  var testDirPath = path.join(__dirname, 'service', testDir)
  var dataFile = path.join(testDirPath, 'data.js')

  rimraf.sync(testDirPath)
  sinon.stub(prompt, 'getInput').callsFake(function (prop, callback) {
    callback(null, 'go')
  })

  createNewFolder(testDir)

  getFile(dataFile, function (file) {
    if (file) {
      var data = fs.readFileSync(file).toString()
      const expectedContent = 'var data = {"last-updated":"Some date","userjourneys":[{"path":[]}]}'

      t.equal(data, expectedContent, 'with a data file')
    }
  })
})
