export default {
  getRgba (value, percent = 1) {
    value = value.toLowerCase()
    if (value.length <= 2) {
      return `rgba(20,50,140,${percent})`
    } else {
      let factor = value.length
      let first = getColorCalculed(letterToNumber(value.charAt(0)), factor)
      let mid = getColorCalculed(
        letterToNumber(value.charAt(Math.round(value.length / 2))), factor
      )
      let last = getColorCalculed(
        letterToNumber(value.charAt(value.length - 1)), factor
      )
      return `rgba(${first},${mid},${last},${percent})`
    }
  }
}
let letterToNumber = letter => {
  return typeof letter !== 'string' ? letter : letter.charCodeAt(0) - 97 + 1
}
let getColorCalculed = (num, factor = 1) => {
  let numero = 26 - (num - 1)
  let numMax = 260
  let max = 255
  num = Math.abs(numero * 10 - factor * 2) > numMax ? 26 : numero
  return Math.round(((num * 10 - factor * 2) / numMax) * max)
}
