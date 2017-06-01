var test = require('tape')
var leadingZeros = require('../lib/utils/leading-zeros')

test('Pad a number with zeros', function (t) {
  var num1 = leadingZeros(1, 2)
  t.equal(num1, '01', 'add zero to single digit number when length is single digit')

  var num2 = leadingZeros(1, 20)
  t.equal(num2, '01', 'add zero to single digit number when length is double digit')

  var num3 = leadingZeros(1, 200)
  t.equal(num3, '001', 'add 2 zeros to single digit number when length is triple digit')

  var num4 = leadingZeros(10, 20)
  t.equal(num4, '10', 'add no zeros to double digit number when length is double digit')

  var num5 = leadingZeros(10, 200)
  t.equal(num5, '010', 'add zero to double digit number when length is triple digit')

  var num6 = leadingZeros(100, 200)
  t.equal(num6, '100', 'add no zero to triple digit number when length is triple digit')

  t.end()
})
