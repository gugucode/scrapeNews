module.exports = function (app, comments) {
  var commentModel = require('../models/comments.js')(comments)

  // save comment
  app.post('/saveComment', function (req, res) {
    commentModel.saveComment(req.body, res)
  })

  // get comment by article's id
  app.get('/postId/:id', function (req, res) {
    commentModel.findByNewsId(req.params.id, res)
  })

  // remove comment
  app.delete('/commentDelete/:id', function (req, res) {
    commentModel.removeComment(req.params.id, res)
  })
}
