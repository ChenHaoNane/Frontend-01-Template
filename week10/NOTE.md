# 每周总结可以写在这里

### Range API

Range 可以精确操作dom 甚至可以灵活的操作文本节点

- var range = new Range()
- range.setStart(element, 9)
- range.setEnd(element, 4)
- var range = document.getSelection().getRangeAt(0)

- var fragment = range.extractContents()
- range.insertNode(document.createTextNode('aaaa'))

### document.styleSheets

- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p { color: pink}", 0)
- document.styleSheets[0].removeRule(0)

### getComputedStyle

- window.getComputedStyle(elt, pseudoElt)

### window.open

- window.open(url, mode, style)
- moveBy
- moveTo
- resizeBy
- resizeTo

### scroll

- window.scrollY
- window.scrollX
- window.scrollBy
- window.scroll

- element.scrollTop
- element.scrollLeft
- element.scrollBy
- element.scrollTo
- element.scrollHeight
 
### getClientRects
### getBoundingClientRect

视口
### window.innerHeight
### window.innerWidth

