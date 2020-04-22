function parseString(str) {
  if (!str) return null
  let reg = /(("([^"\r\n\u2028\u2029\\]|\u2028|\u2029|\\((['"\bfnrtv]|[^'"\bfnrtvdxu\r\n\u2028\u2029])|0(?!d)|x[0-9a-fA-F][0-9a-fA-F]|(u[0-9a-fA-F]{4}|u{(0[0-9a-fA-F]{5}|10[0-9a-fA-F]{4}|[0-9a-fA-F]{1,4})}))|\\(\r\n|[\r\n\u2028\u2029]))*"|'([^'\r\n\u2028\u2029\\]|\u2028|\u2029|\\((['"\bfnrtv]|[^'"\bfnrtvdxu\r\n\u2028\u2029])|0(?!d)|x[0-9a-fA-F][0-9a-fA-F]|(u[0-9a-fA-F]{4}|u{(0[0-9a-fA-F]{5}|10[0-9a-fA-F]{4}|[0-9a-fA-F]{1,4})}))|\\(\r\n|[\r\n\u2028\u2029]))*'))/    
  let match = str.match(reg)
  return match && match[0]
}

