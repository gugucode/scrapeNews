
module.exports = function (news) {
  
  function saveNews (newsData, res) {
    news.find({title: newsData.title}).then(function (data) {
      if (data.length === 0) {
        news.create(newsData)
          .then(function (data) {
            // View the added result in the console
            console.log(data)
          })
      }
    })
  }

  function findAll (res, helpers, cb) {
    news.find().sort({writtenDate: -1}).exec(function (err, data) {
      if (err) {
        console.log(err)
      } else {
        cb(res, data, helpers)
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
