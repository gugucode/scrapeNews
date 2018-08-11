// handlebars helper funcion: combines two strings into one
var concat = function (s1, s2) {
  return s1 + s2
}

// handlebars helper function: convert date object to the formatted date (MM/DD/YYYY)
var formatDate = function (date) {
  if (date) {
    var m = date.getMonth() + 1
    var d = date.getDate() === 31 ? 31 : date.getDate() + 1
    return m + '/' + d + '/' + date.getFullYear()
  }
}

function hbsHelpers (exphbs) {
  return exphbs.create({
    defaultLayout: 'main', // set default layout
    helpers: {  // register helper functions
      concat: concat,
      formatDate: formatDate
    }
  })
}

module.exports = hbsHelpers
