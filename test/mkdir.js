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

test('Returns a directory if it exists', function (t) {
  t.plan(1)

  mkDir(__dirname)
    .then(function (dir) {
      t.equal(dir, __dirname)
    })
})
