var fs = require('fs')
var path = require('path')
var test = require('tape')
var cleanup = require('./utils/cleanup')
var copyDir = require('./utils/copy-dir')
var renameImages = require('../lib/rename-images')

test('Sorts the images by creation date and renames them', function (t) {
  var filesDir = path.join(__dirname, 'files')
  var imagesDir = path.join(__dirname, 'images-test')

  cleanup(imagesDir)
  copyDir(filesDir, imagesDir)
  cleanup(path.join(imagesDir, 'test.txt'))

  var images = fs.readdirSync(imagesDir).map(function (image) {
    return path.resolve(imagesDir, image)
  })

  var renamedImages = [
    '01-about-blank-iPad-Landscape.png',
    '02-about-blank-Laptop-with-HiDPI-screen.png',
    '03-about-blank-iPhone-6-Portrait.png'
  ]

  renameImages(images)
    .then(function (images) {
      t.deepEqual(images, renamedImages)

      cleanup(imagesDir)
      t.end()
    })
    .catch(function (err) {
      cleanup(imagesDir)
      t.end(err)
    })
})
