var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')

var updatePage = function (indexPage, serviceName, serviceDir) {
  return new Promise(function (resolve, reject) {
    fs.readFile(indexPage, function (err, contents) {
      if (err) {
        reject(err)
      }

      var rootDir = path.resolve(__dirname, '..')
      var url = path.join(path.relative(rootDir, serviceDir), 'index.html')
      var $ = cheerio.load(contents.toString())

      var servicesList = $('.exemplar-list li').map(function (i, el) {
        return $(el).text()
      }).get()

      var serviceExists = servicesList.find(function (service) {
        return service.toUpperCase() === serviceName.toUpperCase()
      })

      if (serviceExists) {
        resolve(indexPage)
      } else {
        var $li = $('<li></li>')
        var $a = $('<a></a>').attr('href', url).text(serviceName)

        $('.exemplar-list').append('\t\t', $li.append($a), '\n')

        fs.writeFile(indexPage, $.html(), function (err) {
          if (err) {
            reject(err)
          }

          resolve(indexPage)
        })
      }
    })
  })
}

module.exports = updatePage
