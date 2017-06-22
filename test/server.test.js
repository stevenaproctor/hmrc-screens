var test = require('tape')
var server = require('../server')
var request = require('supertest')

test('Express server', function (t) {
  t.plan(3)

  request(server)
    .get('/')
    .end(function (err, res) {
      t.error(err, 'No error')
      t.equal(res.statusCode, 200)
      t.equal(res.text.includes('HMRC exemplar screenshots'), true)

      server.close()
      t.end()
    })
})
