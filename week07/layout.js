function getStyle(element) {

  if (!element.style) {
    element.style = {}
  }

  for (let prop in element.computedStyle) {
    element.style[prop] = element.computedStyle[prop].value

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }

    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
  }
  return element.style
}

function layout(element) {
  if (!element.computedStyle) {
    return
  }

  var elementStyle = getStyle(element)
  if (elementStyle.display !== 'flex') {
    return
  }
  var items = element.children.filter(e => e.type === 'element')
  items.sort(function (a, b) {
    return (a.style.order || 0) - (b.style.order || 0)
  })
  var style = elementStyle;
  ['width', 'height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null
    }
  })
  if (!style.flexDirection || style.flexDirection === 'auto') 
    style.flexDirection = 'row'
  if (!style.alignItems || style.alignItems === 'auto')
    style.alignItems = 'stretch'
  if (!style.justifyContent || style.justifyContent === 'auto')
    style.justifyContent = 'flex-start'
  if (!style.flexWrap || style.flexWrap === 'auto')
    style.flexWrap = 'nowrap'
  if (!style.alignContent || style.alignContent === 'auto')
    style.alignContent = 'stretch'
  var mainSize, mainStart, mainEnd, mainSign, mainBase,
      crossSize, crossStart, crossEnd, crossSign, crossBase

  if (style.flexDirection === 'row') {
    mainSize = 'width'
    mainStart = 'left'
    mainEnd = 'right'
    mainSign = +1
    mainBase = 0

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }

  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainSign = -1
    mainBase = style.width

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }

  if (style.flexDirection === 'column') {
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainSign = +1
    mainBase = 0

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }

  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainSign = -1
    mainBase = style.height

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }

  if (style.flexWrap === 'wrap-reverse') {
    var tmp = crossStart
    crossStart = crossEnd
    crossEnd = tmp
    crossSign = -1
  } else {
    crossBase = 0
    crossSign = 1
  }

  var isAutoMainSize = false
  if (!style[mainSize]) {
    elementStyle[mainSize] = 0
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      var itemStyle = getStyle(item)
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
        elementStyle[mainSize] = (elementStyle[mainSize] || 0) + item.style[mainSize]
      }
    }
    isAutoMainSize = true
  }

  // 元素进行
  var flexLine = []
  var flexLines = [flexLine]

  var mainSpace = elementStyle[mainSize]
  var crossSpace = 0
  for (var i = 0; i < items.length; i++) {
    var item = items[i]
    var itemStyle = getStyle(item)
    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0
    }
    if (itemStyle.flex) {
      flexLine.push(item)
    } else if (style.flexWrap === 'nowrap' || isAutoMainSize) {
      mainSpace -= itemStyle[mainSize]
      if (itemStyle[crossSize] !== null) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      flexLine.push(item)
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize]
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace
        flexLine.crossSpace = crossSpace
        flexLine = [item]
        flexLines.push(flexLine)
        mainSpace = elementStyle[mainSize]
        crossSpace = 0
      } else {
        flexLine.push(item)
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== crossSpace) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      mainSpace -= itemStyle[mainSize]
    }
  }
  flexLine.mainSpace = mainSpace
  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace
  } else {
    flexLine.crossSpace = crossSpace
  }

  // 计算主轴
  // 找出所有 flex 元素
  // 把主轴方向的剩余尺寸按比例分配
  // 若剩余空间为负数等比压缩剩余元素

  if (mainSpace < 0) {
    var scale = style[mainSize] / (style[mainSize] - mainSpace)
    var currentMain = mainBase
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      var itemStyle = getStyle(item)

      if (itemStyle.flex) {
        itemStyle[mainSize] = 0
      }
      itemStyle[mainSize] = itemStyle[mainSize] * scale
      itemStyle[mainStart] = currentMain
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]

      currentMain = itemStyle[mainEnd]
    }
  } else {
    flexLines.forEach((items) => {
      var mainSpace = items.mainSpace
      var flexTotal = 0

      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        var itemStyle = getStyle(item)

        if (itemStyle.flex != null) {
          flexTotal += itemStyle.flex 
        }
      }
      if (flexTotal > 0) {
        var currentMain = mainBase

        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var itemStyle = getStyle(item)

          if (itemStyle.flex) {
            itemStyle[mainSize] = (itemStyle[mainSize] || 0) + (mainSpace / flexTotal)
          }
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * mainSign
          currentMain = itemStyle[mainEnd]
        }
      } else {
        var currentMain
        var step
        if (style.justifyContent === 'flex-start') {
          currentMain = mainBase
          step = 0
        } else if (style.justifyContent === 'flex-end') {
          currentMain = mainBase + mainSpace * mainSign
          step = 0
        } else if (style.justifyContent === 'center') {
          currentMain = mainBase + (mainSpace * mainSign) / 2
          step = 0
        } else if (style.justifyContent === 'space-between') {
          currentMain = mainBase
          step = mainSpace / (items.length - 1) * mainSign
        } else if (style.justifyContent === 'space-around') {
          currentMain = mainBase + ((mainSpace / items.length) * mainSign / 2)
          step = (mainSpace / items.length) * mainSign
        }

        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * mainSign
          currentMain = itemStyle[mainEnd] + step
        }
      }
    })
  }

  // 计算交叉轴
  // align-items align-self
  var crossSpace

  if (!style[crossSize]) {
    crossSpace = 0
    elementStyle[crossSize] = 0
    for (var i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] += elementStyle[crossSize] + flexLines[i].crossSpace
    }
  } else {
    crossSpace = style[crossSize]
    for (var i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize]
  } else {
    crossBase = 0
  }

  var lineSize = style[crossSize] / flexLines.length
  var step
  if (style.alignContent === 'flex-start') {
    crossBase += crossBase
    step = 0
  } else if (style.alignContent === 'flex-end'){
    crossBase += crossSpace * crossSign
    step = 0
  } else if (style.alignContent === 'center') {
    crossBase += (crossSpace * crossSign) / 2
    step = 0
  } else if (style.alignContent === 'space-between') {
    crossBase += 0
    step = crossBase / (flexLines.length - 1) * crossSign
  } else if (style.alignContent === 'space-around') {
    step = crossBase / (flexLines.length)
    crossBase += step / 2 * crossSign
  } else if (style.alignContent === 'stretch') {
    crossBase += 0
    step = 0
  }
  flexLines.forEach(function(items) {
    var lineCrossSize = style.alignContent === 'stretch' ?
        items.crossSpace + crossSpace / flexLines.length :
        items.crossSpace

    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      var itemStyle = getStyle(item)

      var align = itemStyle.alignSelf || style.alignItems
      if (itemStyle[crossStart] === null)
        itemStyle[crossSize] = (align === 'stretch') ?
          lineSize : 0

      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossSize] * crossSign
      } else if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + lineCrossSize * crossSign
        itemStyle[crossStart] = itemStyle[crossEnd] - corssSign * itemStyle[crossSize]
      } else if (align === 'center') {
        itemStyle[crossStart] = crossBase + corssSign * (lineCrossSize - itemStyle[crossSize]) / 2
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      } else if (align === 'stretch') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] = crossBase + crossSign * (itemStyle[crossSize] != null ? itemStyle[crossSize] : lineCrossSize)
        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      }
    }
    crossBase += crossSign * (lineCrossSize + step)
  })
}

module.exports = layout