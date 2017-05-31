var fs = require('fs')
var path = require('path')

var hyphenate = function (file) {
  return file
          .replace(/[_()]/g, ' ').trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
}

var addCreationTime = function (file) {
  return new Promise(function (resolve, reject) {
    fs.stat(file, function (err, stats) {
      if (err) {
        reject(new Error(err))
      }

      resolve({
        created: stats.birthtime.getTime(),
        name: file
      })
    })
  })
}

var sortByCreated = function (files) {
  return files.sort(function (a, b) {
    return a.created - b.created
  })
}

var leadingZeros = function (index, length) {
  index = String(index).length
  length = String(length).length

  return Array((length - index) + 1).join('0') || '0'
}

var rename = function (files) {
  return files.map(function (file, i) {
    var fileParts = path.parse(file.name)
    var zeros = leadingZeros(i, files.length)

    var formattedName = zeros + (i + 1) + '-' + hyphenate(fileParts.name)

    var filePath = Object.assign(fileParts, {
      name: formattedName,
      base: formattedName + fileParts.ext
    })

    var newFilePath = path.format(filePath)

    return new Promise(function (resolve, reject) {
      fs.rename(file.name, newFilePath, function (err) {
        if (err) {
          reject(new Error('Could not rename file. ', err))
        }

        resolve(path.parse(newFilePath).base)
      })
    })
  })
}

var renameImages = function (images) {
  images = images.map(function (image) {
    return addCreationTime(image)
  })

  return Promise.all(images)
                .then(sortByCreated)
                .then(rename)
                .then(function (files) {
                  return Promise.all(files)
                })
}

module.exports = renameImages
