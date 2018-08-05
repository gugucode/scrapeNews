
module.exports = function (mongoose) {
  var schemas = require('./schema.js')(mongoose)

  var news = mongoose.model('news', schemas.newsSchema)

  function saveNews (newsData) {
    console.log(newsData);
    news.create(newsData, function (err, data) {
      if (err) {
        throw err
      } else {
        return true
      }
    })
  }

  function findAll () {
    news.findAll().sort({saveDate: 1}, function (err, data) {
      if (err) {
        throw err
      } else {
        return data
      }
    })
  }

  function removeNews (newsId) {
    news.remove({_id: newsId}, function (err, data) {
      if (err) {
        throw err
      } else {
        return true
      }
    })
  }

  return {
    saveNews: saveNews,
    findAll: findAll,
    removeNews: removeNews
  }
}
