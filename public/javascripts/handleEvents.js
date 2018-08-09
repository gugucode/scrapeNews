
var concat = function (s1, s2) {
  return s1 + s2
}

var formatDate = function (date) {
  console.log(date)
  if (date) {
    var m = date.getMonth() + 1
    var d = date.getDate() === 31 ? 31 : date.getDate() + 1
    return m + '/' + d + '/' + date.getFullYear()
  }
}

Handlebars.registerHelper('concat', concat)
Handlebars.registerHelper('formatDate', formatDate)

function loadComments () {
  var news = $('.posts-wrap')
  for (var i = 0; i < news.length; i++) {
    const id = $(news[i]).attr('post-id')
    $.ajax({
      method: 'GET',
      url: '/postId/' + id
    }).then(function (data) {
      data.forEach(element => {
        element.postDate = new Date(element.postDate)
        var commentblocks = Handlebars.templates.commentblocks(element)
        $('#commentList' + id).prepend(commentblocks)
      })
    })
  }
}

$(function () {
  loadComments()

  $('#scrapeBnt').on('click', function () {
    $.get('/scrape').then(function (data) {
      location.reload()
    })
  })

  $('#freshBnt').on('click', function () {
    location.reload()
  })

  $('.commentBnt').on('click', function (event) {
    event.preventDefault()
    var id = $(this).attr('post-id')
    var comment = $('#commentBox' + id).val().trim()
    if (comment !== '') {
      $.ajax({
        method: 'POST',
        url: '/saveComment',
        data: {
          postUser: 'Erin',
          comment: comment,
          newsId: id
        }
      }).then(function (data) {
        // $('#commentList' + id).prepend('<p>' + data.comment + '<p>')
        data.postDate = new Date(data.postDate)
        var commentblocks = Handlebars.templates.commentblocks(data)
        $('#commentList' + id).prepend(commentblocks)
      })
    }
  })

  $('.posts-wrap').on('click','button.delBnt', function () {
    var commentId = $(this).attr('comment-id')
    var p = ($(this).parent()).parent()

    $.ajax({
      url: '/commentDelete/' + commentId,
      method: 'DELETE'
    }).then(function (data) {
      console.log(typeof data)
      if (data === 'OK') {
        $(p).remove()
      } else {
        console.log('fail')
      }
    })
  })
})
