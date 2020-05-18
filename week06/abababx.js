const EOF = Symbol('EOF')

function data(c) {
  if (c === EOF) {
    return
  } else {
    return matchA(c)
  }
}

function matchA(c) {
  if (c === 'a') {
    return matchB
  } else {
    return data
  }
}

function matchB(c) {
  if (c === 'b') {
    return matchA2
  } else {
    return data
  }
}

function matchA2(c) {
  if (c === 'a') {
    return matchB2
  } else {
    return data
  }
}

function matchB2(c) {
  if (c === 'b') {
    return matchA3
  } else {
    return data
  }
}

function matchA3(c) {
  if (c === 'a') {
    return matchB3
  } else {
    return data
  }
}

function matchB3(c) {
  if (c === 'b') {
    return matchX
  } else {
    return data
  }
}

function matchX(c) {
  if (c === 'x') {
    return end
  } else {
    return matchA3(c)
  }
}

function end() {
  return end
}

function matchAB(str) {
  let state = data
  for (let c of str) {
    state = state(c)
  }
  state = state(EOF)
  return state === end
}

console.log(matchAB('abababx'))
console.log(matchAB('ababababx'))
console.log(matchAB('abababababx'))