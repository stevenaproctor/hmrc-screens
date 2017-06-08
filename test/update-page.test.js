var fs = require('fs')
var path = require('path')
var test = require('tape')
var cleanup = require('./utils/cleanup')
var updatePage = require('../lib/update-page')

test('Updates a page with some markup', function (t) {
  t.plan(1)

  var serviceName = 'Test Service'
  var serviceDir = path.join(__dirname, serviceName.replace(/ /g, '-').toLowerCase())

  var rootIndexPage = path.join(__dirname, '..', 'index.html')
  var testIndexPage = path.join(__dirname, 'index-test.html')

  cleanup(testIndexPage)

  var indexFile = fs.readFileSync(rootIndexPage)
  fs.writeFileSync(testIndexPage, indexFile)

  updatePage(testIndexPage, serviceName, serviceDir)
    .then(function (page) {
      var rootDir = path.resolve(__dirname, '..')
      var indexUrl = path.join(path.relative(rootDir, serviceDir), 'index.html')
      var link = '<li><a href="' + indexUrl + '">' + serviceName + '</a></li>'
      var index = fs.readFileSync(page).toString()

      t.ok(index.includes(link))

      cleanup(testIndexPage)
    })
})
