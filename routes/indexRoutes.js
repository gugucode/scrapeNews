module.exports = function (app, news) {
  var newsModel = require('../models/news.js')(news)

  app.get('/', function (req, res) {
    var data = newsModel.findAll(res,function(res,data){
        res.json(data)
    })
  })
}
