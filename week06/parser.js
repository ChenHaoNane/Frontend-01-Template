const css = require('css')
const splitSelector = require('./selectorDFS')
const EOF = Symbol("EOF")

let currentToken = null

let stack = [{ type: 'document', children: []}]

// 属性分为三种
// 1. 无引号属性
// 2. 单引号属性
// 3. 双引号属性

let currentAttribute = {
  name: '',
  value: ''
}

let currentTextNode = null

let rules = []

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

function addCSSRules(text) {
  var ast = css.parse(text)
  rules.push(...ast.stylesheet.rules)
}

function specificity(selector) {
  var p = [0, 0, 0, 0]
  var selectorParts = selector.split(' ')
  for (var part of selectorParts) {
    for (let s of splitSelector(part)) {
      if (s.charAt(0) === '#') {
        p[1] += 1
      } else if (s.charAt(0) === '.') {
        p[2] += 1
      } else {
        p[3] += 1
      }
    }
  }
  return p
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0]
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1]
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2]
  }
  return sp1[3] - sp2[3] 
}

function computeCSS(element) {
  var elements = stack.slice().reverse()
  if (!element.computeStyle) {
    element.computeStyle = {}
  }

  // 将当前 element 加上 elements 与 rules 进行对比

  for (let rule of rules) {
    var selectorPart = rule.selectors[0].split(' ').reverse()

    if (!match(element, selectorPart[0])) {
      continue
    }

    var matched
    var j = 1

    for (var i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorPart[j])) {
        j++
      }
    }

    if (j >= selectorPart.length) {
      matched = true
    }

    if (matched) {
      var sp = specificity(rule.selectors[0])
      var computeStyle = element.computeStyle
      for (var declaration of rule.declarations) {
        if (!computeStyle[declaration.property]) {
          computeStyle[declaration.property] = {}
        }
        if (!computeStyle[declaration.property].specificity) {
          computeStyle[declaration.property].value = declaration.value
          computeStyle[declaration.property].specificity = sp
        } else if (compare(computeStyle[declaration.property].specificity, sp) <= 0) {
          // 优先级大于或者等于都会覆盖原有声明
          computeStyle[declaration.property].value = declaration.value
          computeStyle[declaration.property].specificity = sp
        }
      }
    }
  }
}

function emit(token) {
  let top = stack[stack.length - 1]

  if (token.type === 'startToken') {
    currentTextNode = null
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
    computeCSS(element)

    top.children.push(element)
    // element.parent = top
    if (!token.isSelfClosing) {
      stack.push(element)
    }
  } else if (token.type === 'endToken') {
    currentTextNode = null
    if (token.tagName === 'style') {
      addCSSRules(top.children[0].content)
    }
    stack.pop()
  } else if (token.type === 'text') {
    if (currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }

  currentToken = {
    type: '',
    tagName: ''
  }
}

function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    emit({
      type: 'EOF'
    })
    return ;
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data
  }
}

function tagOpen(c) {
  if (c === '/') {
    return endTag
  } else {
    currentToken = {
      type: 'startToken',
      tagName: ''
    } 
    return tagName(c)
  }
}

function endTag(c) {
  currentToken = {
    type: 'endToken',
    tagName: ''
  } 
  return tagName(c)
}

function tagName(c) {
  if (c.match(/^[\n\t\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosing
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName 
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else {
    currentToken.tagName += c
    return tagName
  }
}

function beforeAttributeName(c) {
  if (/\s/.test(c)) {
    return beforeAttributeName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else if (c === '/') {
    return selfClosing
  } else {
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c === '=') {
    return beforeAttributeNameValue
  } else if (c === EOF) {
    emit(currentToken)
    return data
  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeNameValue(c) {
  if (c === '"') {
    return doubleQuotedState
  } else if (c === '\'') {
    return singleQuotedState
  } else if (c === '>'){
    emit(currentToken)
    return data
  } else { 
    return unQuotedState(c)
  }
}

function singleQuotedState(c) {
  if (c === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute.name = ''
    currentAttribute.value = ''
    return afterAttributeValue
  } else {
    currentAttribute.value += c
    return singleQuotedState
  }
}

function doubleQuotedState(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute.name = ''
    currentAttribute.value = ''
    return afterAttributeValue
  } else {
    currentAttribute.value += c
    return doubleQuotedState
  }
}

function unQuotedState(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute.name = ''
    currentAttribute.value = ''
    return beforeAttributeName
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute.name = ''
    currentAttribute.value = ''
    return selfClosing
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute.name = ''
    currentAttribute.value = ''
    emit(currentToken)
    return data
  } else {
    currentAttribute.value += c
    return unQuotedState
  }
}

function afterAttributeValue(c) {
  if (c === ' ') {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosing
  } else if (c === '>') {
    emit(currentToken)
    return data
  }
}

function selfClosing(c) {
  currentToken.isSelfClosing = true
  if (c === '>') {
    emit(currentToken)
    return data
  } else {
    return beforeAttributeName(c)
  }
}



module.exports.parseHTML = function parseHTML(html) {
  let state = data
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  return stack[0]
}

