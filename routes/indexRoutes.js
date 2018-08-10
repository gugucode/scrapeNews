module.exports = function (app, news, comments) {
  var newsModel = require('../models/news.js')(news)

  // handle index get require, send index page and articles
  app.get('/', function (req, res) {
    newsModel.findAll(res, function (res, data) {
      res.render('index', {
        news: data
      })
    })
  })
}
