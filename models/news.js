
module.exports = function (news) {
//   var schemas = require('./schema.js')(mongoose)

  //   var news = mongoose.model('news', schemas.newsSchema)

  function saveNews (newsData) {
    // console.log(newsData);
    news.create(newsData, function (err, data) {
      if (err) {
        console.log(err)
      } 
    })
  }

  function findAll (res, cb) {
    news.find().sort({saveDate: 1}).exec(function (err, data) {
      if (err) {
        console.log(err)
      } else {
        // console.log(data)
        cb(res, data)
      }
    })
  }

  function removeNews (newsId,res,cb) {
    news.remove({_id: newsId}, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        cb(res,data);
      }
    })
  }

  return {
    saveNews: saveNews,
    findAll: findAll,
    removeNews: removeNews
  }
}
