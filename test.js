var test = require('tape')
var sinon = require('sinon')
var rimraf = require('rimraf')
var path = require('path')
var prompt = require('prompt')
var fork = require('child_process').fork
var fs = require('fs')
var getData = require('./test/utils/get-data')
var createNewFolder = require('./index').createNewFolder

test('Creates directory', function (t) {

  var testDir = 'test-directory'
  var testDirPath = path.join('service', testDir)

  rimraf.sync(testDirPath)
  sinon.stub(prompt, 'getInput').callsFake(function (prop, callback) {
    callback(null, 'go')
  })

  createNewFolder(testDir)
  var data = fork(path.join(__dirname, 'test', 'utils', 'get-data'), [path.join(testDirPath, 'data.js')])
  t.end()
})
