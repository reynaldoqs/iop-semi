export default {
  today () {
    let today = new Date()
    return formatDMY(today.getDate(), today.getMonth(), today.getFullYear(), 'YYYY/MM/DD', '-')
  },
  todayInv () {
    let today = new Date()
    return formatDMY(today.getDate(), today.getMonth(), today.getFullYear())
  },
  formatDate (fecha) {
    let array = fecha.split('-')
    return array.reverse().join('/')
  }
}

let formatDMY = (day = 1, month = 1, year = 18, format = 'DD/MM/YYYY', separator = '/') => {
  let oneToTen = ['01', '02', '03', '04', '05', '06', '07', '08', '09']
  let formatS = format.split('/')
  let newDate = formatS.map(data => {
    if (data === 'DD' || data === 'dd') {
      return `${day < 10 ? oneToTen[day - 1] : day}`
    }
    if (data === 'MM' || data === 'mm') {
      return `${month < 10 ? oneToTen[month] : month}`
    }
    if (data === 'YYYY' || data === 'yyyy') {
      return `${year < 100 ? '20' + oneToTen[day] : year}`
    }
    if (data === 'YY' || data === 'yy') {
      return `${year}`
    }
  })
  return newDate.join(separator)
}
