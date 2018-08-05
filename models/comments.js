var mongoose = require('mongoose')
var schemas = require('./schema.js')(mongoose)

var comments = mongoose.model('comments', schemas.newsSchema)

function saveComment (commentData) {
  comments.save(commentData, function (err, data) {
    if (err) {
      throw err
    } else {
      return true
    }
  })
}

function findByNewsId (newsId) {
  comments.find({newsId: newsId}).sort({postDate: 1}, function (err, data) {
    if (err) {
      throw err
    } else {
      return data
    }
  })
}

function removeComment (commentId) {
  comments.remove({_id: commentId}, function (err, data) {
    if (err) {
      throw err
    } else {
      return true
    }
  })
}

module.exports = {
  saveComment: saveComment,
  findByNewsId: findByNewsId,
  removeComment: removeComment
}
