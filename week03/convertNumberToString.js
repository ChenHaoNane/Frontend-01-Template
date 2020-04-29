function convertNumberToString(num, x) {

  // 十进制
  let IntegerPart = ~~num
  let DecimalPart = num % Math.floor(num)
  let result = ''
  let zeroCodePoint = '0'.codePointAt()
  while(IntegerPart > 0) {
    let item = String.fromCodePoint(zeroCodePoint + Math.floor(IntegerPart % x))
    result = item + result
    IntegerPart = Math.floor(IntegerPart / x)
  }

  // 算的有精度问题 5 1 放假补上
  // if (DecimalPart) {
  //   result += '.'
  // }

  // let a = 0.1
  // while(DecimalPart > 0.0001) {
  //   let item = String.fromCodePoint(zeroCodePoint + Math.floor(DecimalPart / a))
  //   result += item
  //   DecimalPart = DecimalPart - item * a
  //   a = a * 0.1
  //   console.log('DecimalPart', DecimalPart)
  // }

  return result
}