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

  function removeComment (commentId, res) {
    comments.findByIdAndDelete(commentId, function (err, data) {
      console.log(data)
      if (err) {
        res.sendStatus(400).end()
      } else {
        res.sendStatus(200).end()
      }
    })
  }

  return {
    saveComment: saveComment,
    findByNewsId: findByNewsId,
    removeComment: removeComment
  }
}
