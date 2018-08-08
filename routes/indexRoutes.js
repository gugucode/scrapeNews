module.exports = function (app, news, comments) {
  var newsModel = require('../models/news.js')(news)
  var commentsModel = require('../models/comments.js')(comments)
  var concat = function (s1, s2) {
    return s1 + s2
  }

  var formatDate = function (date) {
    var m = date.getMonth() + 1
    var d = date.getDate() === 31 ? 31 : date.getDate() + 1
    return m + '/' + d + '/' + date.getFullYear()
  }

  app.get('/', function (req, res) {
    var helpers = {
      formatDate: formatDate,
      concat: concat
    }
    newsModel.findAll(res, helpers, function (res, data, helpers) {    
      res.render('index', {
        news: data,
        helpers: helpers
      })
      // res.json(data)
    })
  })
}
