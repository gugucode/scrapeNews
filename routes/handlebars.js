var concat = function (s1, s2) {
  return s1 + s2
}

var formatDate = function (date) {
  if (date) {
    // console.log(typeof date)
    var m = date.getMonth() + 1
    var d = date.getDate() === 31 ? 31 : date.getDate() + 1
    return m + '/' + d + '/' + date.getFullYear()
  }
}

function hbsHelpers (exphbs) {
  return exphbs.create({
    defaultLayout: 'main',
    helpers: {
      concat: concat,
      formatDate: formatDate
    }
  })
}

module.exports = hbsHelpers
