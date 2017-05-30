var fs = require('fs')
var path = require('path')
var test = require('tape')
var mkDir = require('../lib/mkdir')
var cleanup = require('./utils/cleanup')

test('Creates a directory if it doesn\'t exist', function (t) {
  t.plan(1)

  var dir = path.join(__dirname, 'non-existant')

  mkDir(dir)
    .then(function (dir) {
      t.doesNotThrow(function () {
        fs.accessSync(dir)
      })

      cleanup(dir)
    })
})

test('Returns a directory if it already exists', function (t) {
  var thisDir = __dirname

  mkDir(thisDir)
    .then(function (dir) {
      t.equal(dir, thisDir)
      t.end()
    })
})

test('Throws an error for an existing directory if given a message', function (t) {
  var thisDir = __dirname
  var errorMsg = 'Choose another directory name'

  mkDir(thisDir, errorMsg)
    .catch(function (err) {
      t.ok(err instanceof Error)
      t.equal(err.message, errorMsg)
      t.end()
    })
})
