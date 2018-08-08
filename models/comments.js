module.exports = function (comments) {
  function saveComment (commentData, res) {
    comments.create(commentData, function (err, data) {
      if (err) {
        throw err
      } else {
        console.log(data)
        res.json(data)
      }
    })
  }

  function findByNewsId (newsId, res) {
    comments.find({newsId: newsId}).sort({postDate: 1}).exec(function (err, data) {
      if (err) {
        throw err
      } else {
        res.json(data)
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

  return {
    saveComment: saveComment,
    findByNewsId: findByNewsId,
    removeComment: removeComment
  }
}
