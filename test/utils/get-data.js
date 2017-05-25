var fs = require('fs')


function getData(dataFile) {

  console.log(process.argv)

  try {
    var data = fs.readFileSync(dataFile)
    console.log(data)
  } catch (err) {
    console.log(err)
  }

}
module.exports = getData
