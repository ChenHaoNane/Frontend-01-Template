function convertStringToNumber(str, x = 10) {
  if (!str) return 0
  let num = 0
  let chars = str.split('')
  let i = 0
  let sign = ''
  // 捕获 - +
  if (['-', '+'].includes(chars[0])) {
    sign = chars[0]
    i++
  }
  // 整数
  while (i < chars.length && chars[i] !== '.' && chars[i] !== 'e') {
    num = num * x + chars[i].codePointAt() - '0'.codePointAt()
    i++
  }
  // 小数
  if (chars[i] === '.') {
    i ++
  }
  let farction = 0
  let count = x
  while (i < chars.length && chars[i] !== 'e') {
    farction = (chars[i].codePointAt() - '0'.codePointAt()) / count + farction
    count = count * x
    i++
  }
  // 科学记数法
  let eNum = 0
  let eSign = ''

  if (chars[i] === 'e') {
    i++
  }

  if (['-', '+'].includes(chars[i])) {
    eSign = chars[i]
    i++
  }

  while (i < chars.length) {
    eNum = eNum * x + chars[i].codePointAt() - '0'.codePointAt()
    i++
  }
  if (eSign === '-') {
    eNum = Math.pow(10, -eNum)
  } else {
    eNum = Math.pow(10, eNum)
  }
  if (sign === '-') {
    return - (num + farction) * eNum
  }
  
  return (num + farction) * eNum
}