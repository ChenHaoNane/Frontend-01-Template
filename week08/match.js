const splitSelector = require('./selectorDFS')

function match(element, selector) {
  // optional 复合选择器
  if (!selector || !element || !element.attributes) {
    return false
  }

  function foo(element, s) {
    if (s[0] === '#') {
      // 如果是以 # 开头 说明是 id
      // var attributes = element.attributes
      var idAttribute = element.attributes.filter(attr => attr.name === 'id')
      if (!idAttribute[0]) {
        return false
      }

      return `#${idAttribute[0].value}` === s

    } else if (s[0] === '.') {
      // 如果是以 . 开头 说明是 class
      // optional 支持空格分隔的class选择器
      var classAttribute = element.attributes.filter(attr => attr.name === 'class')
      if (!classAttribute[0]) {
        return false
      }
      var value = `${classAttribute[0].value}`.split(' ')
      return value.includes(s.substr(1))
    } else {
      return s === element.tagName
    }
  }
  return splitSelector(selector).every(s => foo(element, s))
}