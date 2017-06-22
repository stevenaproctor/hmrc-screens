var express = require('express')
var path = require('path')
var app = express()

app.set('port', 3000)

app.get(['/', '/index.html'], function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/service', express.static(path.join(__dirname, 'service')))

var server = app.listen(app.get('port'), function () {
  var port = server.address().port
  console.log(`Listening on port ${port}`)
})

module.exports = server
