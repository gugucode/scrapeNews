
module.exports = function (news) {
//   var schemas = require('./schema.js')(mongoose)

  //   var news = mongoose.model('news', schemas.newsSchema)

  function saveNews (newsData, res) {
    // console.log(newsData);
    news.create(newsData)
      .then(function (data) {
        // View the added result in the console
        // return res.json(data)
        console.log("saved")
      })
  }

  function findAll (res, formatDate, concat, cb) {
    news.find().sort({saveDate: 1}).exec(function (err, data) {
      if (err) {
        console.log(err)
      } else {
        cb(res, data, formatDate, concat)
        // return data
      }
    })
  }

  function removeNews (newsId, res, cb) {
    news.remove({_id: newsId}, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        cb(res, data)
      }
    })
  }

  return {
    saveNews: saveNews,
    findAll: findAll,
    removeNews: removeNews
  }
}
