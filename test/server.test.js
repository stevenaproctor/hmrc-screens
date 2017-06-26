var request = require('supertest')
var test = require('tape')
var proxyquire = require('proxyquire')
var sinon = require('sinon')

test('server - get /', function (t) {
  var server = require('../server')

  t.plan(3)

  request(server)
    .get('/')
    .end(function (err, res) {
      t.error(err, 'does not return an error')
      t.equal(res.statusCode, 200, 'does return a 200 status code')
      t.equal(res.text.includes('HMRC exemplar screenshots'), true, 'includes the correct title')

      server.close()
      t.end()
    })
})

test('server - post /save-note', function (t) {
  t.plan(3)

  var saveNoteStub = sinon.stub().returns(
      new Promise(function (resolve, reject) {
        resolve({test: 'new-message'})
      })
    )

  var server = proxyquire('../server', {
    './lib/save-note': saveNoteStub
  })

  request(server)
    .post('/save-note')
    .send({test: 'old-message'})
    .end(function (err, res) {
      t.error(err, 'does not return an error')
      t.equal(res.statusCode, 200, 'does return a 200 status code')
      t.equal(JSON.stringify(res.body), JSON.stringify({test: 'new-message'}), 'does return data from saveNote')

      server.close()
      t.end()
    })
})
