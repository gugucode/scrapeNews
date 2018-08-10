module.exports = function (app, comments) {
  var commentModel = require('../models/comments.js')(comments)

  app.post('/saveComment', function (req, res) {
    commentModel.saveComment(req.body, res)
  })

  app.get('/postId/:id', function (req, res) {
    commentModel.findByNewsId(req.params.id, res)
  })

  app.delete('/commentDelete/:id', function (req, res) {
    commentModel.removeComment(req.params.id, res)
  })
}
