var execFile = require('child_process').execFile

var getFile = function (file, cb) {
  execFile('ls', [file], function (err, stdout, stderr) {
    if (err) {
      process.nextTick(function () {
        getFile(file, cb)
      })
    }

    cb(stdout.trim())
  })
}

module.exports = getFile
