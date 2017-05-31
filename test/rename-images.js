var fs = require('fs')
var path = require('path')
var test = require('tape')
var cleanup = require('./utils/cleanup')
var renameImages = require('../lib/rename-images')

var copyRecursiveSync = function (src, dest) {
  var stats = fs.statSync(src)
  var isDirectory = stats && stats.isDirectory()

  if (isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName))
    })
  } else {
    fs.linkSync(src, dest)
  }
}

test.only('Sorts the images by creation date and renames them', function (t) {
  var imagesDir = path.join(__dirname, 'images')
  var imagesDirCopy = path.join(__dirname, 'images-test')

  cleanup(imagesDirCopy)
  copyRecursiveSync(imagesDir, imagesDirCopy)

  var images = fs.readdirSync(imagesDirCopy).map(function (image) {
    return path.resolve(imagesDirCopy, image)
  })

  var renamedImages = [
    '1-about-blank-Laptop-with-HiDPI-screen.png',
    '2-about-blank-iPad-Landscape.png',
    '3-about-blank-iPhone-6-Portrait.png'
  ]

  renameImages(images)
    .then(function (images) {

      t.deepEqual(images, renamedImages)

      cleanup(imagesDirCopy)
      t.end()
    })
    .catch(function (err) {
      t.end(err)
    })
})
