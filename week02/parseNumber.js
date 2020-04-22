function parseNumber(str) {
  if (!str) return null
  let reg = /^0b[01]+$|^0o[0-7]+$|^0x[0-9a-f]+$|^-?0(\.\d*(e[\-\+]?\d+)?)?$|^-?([1-9]\d*\.?\d*(e[\-\+]?\d+)?)$/i
  let match = str.match(reg)
  return match && match[0]
}