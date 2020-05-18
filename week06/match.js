function match(pattern, str) {
  const EOF = Symbol('EOF')
  const arr = pattern.split('')
  arr.forEach((item, index) => {
    let func = `function(c) {
      console.log('c', index, c, item)
      if (c === '${item}') {
        if (${index} === ${arr.length - 1}) {
          return end
        } else {
          return match.f${index + 1}
        }
      } else {
        if (${index === 0}) {
          return ${data}
        } else {
          return eval(match.f${index - 1}(c))
        }
      }
    }`
    eval(`match.f${index} = ${func}`)
  })

  function data(c) {
    if (c === EOF) {
      return
    } else {
      return eval(`match.f0(c)`)
    }
  }

  function end() {
    return end
  }
  let state = data
  for (let c of str) {
    state = state(c)
  }
  state = state(EOF)
  arr.forEach((item, index) => {
    eval(`delete match.f${index}`)
  })
  return state === end
}

console.log(match('abcabx', 'abcabx'))
console.log(match('abcabx', 'abcabx'))
console.log(match('abcabx', 'abcabcabx'))
console.log(match('abc', 'abece'))
console.log(match('abcd', 'abcd1abcd'))
console.log(match)