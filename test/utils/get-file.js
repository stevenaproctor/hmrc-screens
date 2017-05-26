var execFile = require('child_process').execFile

var getData = function (file, cb) {
  execFile('ls', [file], function (err, stdout, stderr) {
    if (err) {
      process.nextTick(function () {
        getData(file, cb)
      })
    }

    cb(stdout.trim())
  })
}

module.exports = getData
