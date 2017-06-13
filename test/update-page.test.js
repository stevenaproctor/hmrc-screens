var fs = require('fs')
var path = require('path')
var test = require('tape')
var cheerio = require('cheerio')
var cleanup = require('./utils/cleanup')
var updatePage = require('../lib/update-page')

test.only('Updates the root index page with a link', function (t) {
  t.plan(3)

  var serviceName = 'Test Service'
  var rootDir = path.join(__dirname, '..')
  var serviceDir = path.join(__dirname, serviceName.replace(/ /g, '-').toLowerCase())

  var rootIndexPage = path.join(__dirname, '..', 'index.html')
  var testIndexPage = path.join(__dirname, 'index-test.html')

  cleanup(testIndexPage)

  var indexFile = fs.readFileSync(rootIndexPage)
  fs.writeFileSync(testIndexPage, indexFile)

  var $ = cheerio.load(indexFile)
  var listLength = $('.exemplar-list li').length

  updatePage(testIndexPage, serviceName, serviceDir)
    .then(function (page) {
      $ = cheerio.load(fs.readFileSync(page).toString())

      var indexUrl = path.relative(rootDir, path.join(serviceDir, 'index.html'))
      var link = '<li><a href="' + indexUrl + '">' + serviceName + '</a></li>'

      t.equal($('.exemplar-list li').length, listLength + 1, 'only adds one link at a time')
      t.equal($.html('.exemplar-list li:last-child'), link, 'with a relative url to the new service')

      return Promise.resolve(true)
    })
    .then(function () {
      return updatePage(testIndexPage, serviceName, serviceDir)
    })
    .then(function (page) {
      $ = cheerio.load(fs.readFileSync(page).toString())

      t.equal($('.exemplar-list li').length, listLength + 1, 'and doesn\'t add the service if it already exists')

      cleanup(testIndexPage)
    })
})
