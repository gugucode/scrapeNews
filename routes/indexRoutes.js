module.exports = function (app, news, comments) {
  var newsModel = require('../models/news.js')(news)
  var helpers = require('./handlebarsHelpers.js')

  // handle index get require, send index page and articles
  app.get('/', function (req, res) {
    newsModel.findAll(res, helpers, function (res, data, helpers) {
      // console.log(helpers)
      res.render('index', {
        news: data,
        helpers: helpers
      })
    })
  })
}
