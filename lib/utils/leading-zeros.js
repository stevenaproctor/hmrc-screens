var leadingZeros = function (index, length) {
  var indexLength = String(index).length
  length = String(length).length

  var zeros = (length < 2) ? '0' : Array((length - indexLength) + 1).join('0')

  return zeros + index
}

module.exports = leadingZeros
