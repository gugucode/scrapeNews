
module.exports = function (comments) {
  // save comment into comments collection
  function saveComment (commentData, res) {
    comments.create(commentData, function (err, data) {
      if (err) {
        throw err
      } else {
        console.log(data)
        res.render('partials/comments/comment-blocks', {
          commentsData: [data],
          layout: false
        })
      }
    })
  }

  // find all comments of one article by newsId
  function findByNewsId (newsId, res) {
    comments.find({newsId: newsId}).sort({postDate: -1}).exec(function (err, data) {
      if (err) {
        console.log('err')
      } else {
        res.render('partials/comments/comment-blocks', {
          commentsData: data,
          layout: false
        })
      }
    })
  }

  // remove comment from collection
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
