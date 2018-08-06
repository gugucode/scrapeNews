module.exports = function (app, news) {
  var newsModel = require('../models/news.js')(news)
  var concat = function (s1, s2) {
    return s1 + s2
  }

  var formatDate = function (date) {
    var m = date.getMonth() + 1
    var d = date.getDate() + 1
    return m + '/' + d + '/' + date.getFullYear()
  }

  app.get('/', function (req, res) {
    newsModel.findAll(res, formatDate, concat, function (res, data, formatDate, concat) {
      res.render('index', {
        news: data,
        helpers: {
          formatDate: formatDate,
          concat: concat
        }
      })
      // res.json(data)
    })
  })
}
