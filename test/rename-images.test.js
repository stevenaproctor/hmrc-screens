var fs = require('fs')
var path = require('path')
var test = require('tape')
var cleanup = require('./utils/cleanup')
var copyDir = require('./utils/copy-dir')
var renameImages = require('../lib/rename-images')

test('Sorts the images by creation date and renames them', function (t) {
  var imagesDir = path.join(__dirname, 'images')
  var imagesDirCopy = path.join(__dirname, 'images-test')

  cleanup(imagesDirCopy)
  copyDir(imagesDir, imagesDirCopy)

  var images = fs.readdirSync(imagesDirCopy).map(function (image) {
    return path.resolve(imagesDirCopy, image)
  })

  var renamedImages = [
    '01-about-blank-iPad-Landscape.png',
    '02-about-blank-Laptop-with-HiDPI-screen.png',
    '03-about-blank-iPhone-6-Portrait.png'
  ]

  renameImages(images)
    .then(function (images) {
      t.deepEqual(images, renamedImages)

      cleanup(imagesDirCopy)
      t.end()
    })
    .catch(function (err) {
      cleanup(imagesDirCopy)
      t.end(err)
    })
})
