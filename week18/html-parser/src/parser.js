const EOF = Symbol("EOF")

let currentToken = null

let stack;

// 属性分为三种
// 1. 无引号属性
// 2. 单引号属性
// 3. 双引号属性

let currentAttribute = {
  name: '',
  value: ''
}

let currentTextNode = null

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

    top.children.push(element)
    // element.parent = top
    if (!token.isSelfClosing) {
      stack.push(element)
    }
  } else if (token.type === 'endToken') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match")
    } else {
      currentTextNode = null
      stack.pop()
    }
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
    throw new Error('invalid tagName char')
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
  } else if (c.match && c.match(/^[\t\n\f ]$/) || c === '/' || c === '>') {
    return unQuotedState(c)
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
    throw new Error("Tag attribute value must startwith \" or '")
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
    currentToken[currentAttribute.name] = true
    currentAttribute.name = ''
    currentAttribute.value = ''
    return beforeAttributeName
  } else if (c === '/') {
    currentToken[currentAttribute.name] = true
    currentAttribute.name = ''
    currentAttribute.value = ''
    return selfClosing
  } else {
    currentToken[currentAttribute.name] = true
    currentAttribute.name = ''
    currentAttribute.value = ''
    emit(currentToken)
    return data
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
  } else {
    return beforeAttributeName(c)
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



export function parseHTML(html) {
  let state = data
  stack = [{ type: 'document', children: []}]
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  return stack[0]
}

