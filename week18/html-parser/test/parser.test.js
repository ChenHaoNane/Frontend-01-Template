import { parseHTML } from '../src/parser.js';
import assert from 'assert';

it('parse a single element', () => {
  let doc = parseHTML("<div></div>")
  let div = doc.children[0]
  assert.equal(div.type, 'element')
  assert.equal(div.attributes.length, 0)
  assert.equal(div.tagName, 'div')
  assert.equal(div.children.length, 0)
})

it('parse a with content element ', () => {
  let doc = parseHTML("<div>content</div>")
  let div = doc.children[0]
  let content = div.children[0]
  assert.equal(div.children.length, 1)
  assert.equal(content.type, 'text')
  assert.equal(content.content, 'content')
})

it('start end tag mismatch', () => {
  try {
    let doc = parseHTML('<div></dav>')
    throw new Error('mismatch not throw error')
  } catch (e) {
    assert.equal(e.message, "Tag start end doesn't match")
  }
})

it()
it('parse a with singleQuoted attribute element', () => {
  let doc = parseHTML("<div class='contaienr'></div>")
  let container = doc.children[0]
  assert.equal(container.attributes[0].name, 'class')
  assert.equal(container.attributes[0].value, 'contaienr')
})

it('parse a with doubleQuoted attribute element', () => {
  let doc = parseHTML('<div class="contaienr"></div>')
  let container = doc.children[0]
  assert.equal(container.attributes[0].name, 'class')
  assert.equal(container.attributes[0].value, 'contaienr')
})

it('parse a with unQuoted attribute element', () => {
  let doc = parseHTML('<div disabled></div>')
  let container = doc.children[0]
  assert.equal(container.attributes[0].name, 'disabled')
  assert.equal(container.attributes[0].value, true)
})

it('parse a with unQuoted attribute selfClosing element', () => {
  let doc = parseHTML('<div disabled />')
  let container = doc.children[0]
  assert.equal(container.attributes[0].name, 'disabled')
  assert.equal(container.attributes[0].value, true)
})

it('parse a with unQuoted attribute selfClosing2 element', () => {
  let doc = parseHTML('<div disabled/>')
  let container = doc.children[0]
  assert.equal(container.attributes[0].name, 'disabled')
  assert.equal(container.attributes[0].value, true)
})

it('parse a multiple attribute', () => {
  let doc = parseHTML('<div disabled class="a"/>')
  let container = doc.children[0]
  assert.equal(container.attributes[0].name, 'disabled')
  assert.equal(container.attributes[0].value, true)
  assert.equal(container.attributes[1].name, 'class')
  assert.equal(container.attributes[1].value, 'a')
})
it('parse a multiple attribute', () => {
  let doc = parseHTML('<div disabled class="a" />')
  let container = doc.children[0]
  assert.equal(container.attributes[0].name, 'disabled')
  assert.equal(container.attributes[0].value, true)
  assert.equal(container.attributes[1].name, 'class')
  assert.equal(container.attributes[1].value, 'a')
})

it('parse a multiple attribute', () => {
  let doc = parseHTML('<div width="100px"class="a" />')
  let container = doc.children[0]
  assert.equal(container.attributes[0].name, 'width')
  assert.equal(container.attributes[0].value, "100px")
  assert.equal(container.attributes[1].name, 'class')
  assert.equal(container.attributes[1].value, 'a')
})

it('parse a error attribute value element', () => {
  try {
    parseHTML("<br a=1>")
    throw new Error()
  } catch(e) {
    assert.equal(e.message, "Tag attribute value must startwith \" or '")
  }
})

it('parse a selfclosing element', () => {
  let doc = parseHTML("<br a=>")
  let ele = doc.children[0]
  assert.equal(ele.type, 'element')
  assert.equal(ele.children.length, 0)
  assert.equal(ele.attributes.length, 0)
})

it('parse a selfclosing element', () => {
  let doc = parseHTML("<br a1")
  let ele = doc.children[0]
  assert.equal(ele.type, 'element')
  assert.equal(ele.children.length, 0)
  assert.equal(ele.attributes.length, 0)
})



it('parse a selfclosing element', () => {
  let doc = parseHTML("<br/>")
  let ele = doc.children[0]
  assert.equal(ele.type, 'element')
  assert.equal(ele.children.length, 0)
  assert.equal(ele.attributes[0].name, 'isSelfClosing')
  assert.equal(ele.attributes[0].value, true)
})
it('parse a selfclosing element', () => {
  let doc = parseHTML("<br/ >")
  let ele = doc.children[0]
  assert.equal(ele.type, 'element')
  assert.equal(ele.children.length, 0)
  assert.equal(ele.attributes[0].name, 'isSelfClosing')
  assert.equal(ele.attributes[0].value, true)
})