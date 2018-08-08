$(function () {
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
    var comment = $('#commentBox' + id).val()
    $.ajax({
      method: 'POST',
      url: '/saveComment',
      data: {
        postUser: 'Erin',
        comment: comment,
        newsId: id
      }
    }).then(function (data) {
      $('#commentList' + id).prepend('<p>' + data.comment + '<p>')
    })
  })

  function loadComments () {
    var news = $('.posts-wrap')
    console.log(news)
    for (var i = 0; i < news.length; i++) {
      const id = $(news[i]).attr('post-id')
      $.ajax({
        method: 'GET',
        url: '/postId/' + id
      }).then(function (data) {
        data.forEach(element => {
          $('#commentList' + id).prepend('<p>' + element.comment + '<p>')
        })
      })
    }
  }

  loadComments()
})
