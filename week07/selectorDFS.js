module.exports = function splitSelector(str) {

  const EOF = Symbol('EOF')

  let arr = []
  let currentSelector = ''

  function emit(selector) {
    currentSelector = ''
    arr.push(selector)
  }
  function data(c) {
    if (c === EOF) {
      emit(currentSelector)
      currentSelector = ''
      return
    } else if (c === '#') {
      currentSelector = '#'
      return id
    } else if (c === '.') {
      currentSelector = '.'
      return clazz
    } else {
      return tag(c)
    }
  }

  function id(c) {
    if (c === EOF) {
      emit(currentSelector)
      currentSelector = ''
      return
    } else if (c.match(/\n\t\f /)) {
      emit(currentSelector)
      currentSelector = ''
      return data
    } else if (c === '#') {
      emit(currentSelector)
      currentSelector = '#'
      return id
    } else if (c === '.') {
      emit(currentSelector)
      currentSelector = '.'
      return clazz
    } else {
      currentSelector += c
      return id
    }
  }

  function clazz(c) {
    if (c === EOF) {
      emit(currentSelector)
      currentSelector = ''
      return
    } else if (c.match(/\n\t\f /)) {
      emit(currentSelector)
      currentSelector = ''
      return data
    } else if (c === '#') {
      emit(currentSelector)
      currentSelector = '#'
      return id
    } else if (c === '.') {
      emit(currentSelector)
      currentSelector = '.'
      return clazz
    } else {
      currentSelector += c
      return clazz
    }
  }

  function tag(c) {
    if (c === EOF) {
      emit(currentSelector)
      currentSelector = ''
      return
    } else if (c.match(/\n\t\f /)) {
      emit(currentSelector)
      currentSelector = ''
      return data
    } else if (c === '#') {
      emit(currentSelector)
      currentSelector = '#'
      return id
    } else if (c === '.') {
      emit(currentSelector)
      currentSelector = '.'
      return clazz
    } else {
      currentSelector += c
      return tag
    }
  }

  let state = data
  for (let c of str) {
    state = state(c)
  }
  state(EOF)
  return arr
}
