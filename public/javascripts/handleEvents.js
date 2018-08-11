// load the each article's comment
function loadComments () {
  var news = $('.posts-wrap')

  for (var i = 0; i < news.length; i++) {
    const id = $(news[i]).attr('post-id')

    $.ajax({
      method: 'GET',
      url: '/postId/' + id
    }).then(function (data) {
      $('#commentList' + id).append(data)
      var commentCount = (data.match(/delBnt/g) || []).length;
      $('#commentCount' + id).text('Comment(' + commentCount + ')')
    })
  }
}

function changeSaveBnt (saveBnt) {
  $(saveBnt).text('Unsave')
  $(saveBnt).removeClass('saveBnt').addClass('unsaveBnt')
  $(saveBnt).removeClass('btn-primary').addClass('btn-warning')
  var p = $(saveBnt).parent().parent().parent().parent().parent()
  $(p).attr('isSave', 'yes')
}

// Check all loaded articles if they are saved, and if yes, mark them as saved
function markSaved () {
  // get a list of saved articles from localStorage
  var savedArticles = JSON.parse(localStorage.getItem('scrapeArticles'))

  if (savedArticles !== null) {
    savedArticles.forEach(function (id) {
      var saveBnt = $("p button[post-id='" + id + "']")
      changeSaveBnt(saveBnt)
    })
  }
}

// load below functions when html is ready
$(function () {
  markSaved()
  loadComments()

  // Send scrape data request to server
  $('#scrapeBnt').on('click', function () {
    $.get('/scrape').then(function (data) {
      location.reload()
    })
  })

  // fetch new data from server if there are any
  $('#freshBnt').on('click', function () {
    location.reload()
  })

  // handle save comment event
  $('.commentBnt').on('click', function (event) {
    event.preventDefault()
    var id = $(this).attr('post-id')
    var user = $('#user' + id).val().trim()
    var comment = $('#commentBox' + id).val().trim()

    if (comment !== '') {
      $.ajax({
        method: 'POST',
        url: '/saveComment',
        data: {
          postUser: user || 'unknow',
          comment: comment,
          newsId: id
        }
      }).then(function (data) {
        $('#commentList' + id).prepend(data)
        $('#commentBox' + id).val('')
        // increase number of comments
        var commentCount = $('#commentCount' + id)
        var count = parseInt(($(commentCount).text())[8]) + 1
        $(commentCount).text('Comment(' + count + ')')
      })
    }
  })

  // handle delete comment event
  $('.posts-wrap').on('click', 'button.delBnt', function () {
    var commentId = $(this).attr('comment-id')
    var commentSection = ($(this).parent()).parent()

    $.ajax({
      url: '/commentDelete/' + commentId,
      method: 'DELETE'
    }).then(function (data) {
      if (data === 'OK') {
        // reduce number of comments
        var newsId = ($(commentSection).parent().attr('id')).slice(11)
        var commentCount = $('#commentCount' + newsId)
        var count = parseInt(($(commentCount).text())[8]) - 1
        $(commentCount).text('Comment(' + count + ')')

        $(commentSection).remove()
      } else {
        console.log('fail')
      }
    })
  })

  // handle save article event
  $('.posts-wrap').on('click', 'button.saveBnt', function () {
    var newsId = $(this).attr('post-id')
    var savedArticles = localStorage.getItem('scrapeArticles')

    if (savedArticles === null) {
      localStorage.setItem('scrapeArticles', JSON.stringify([newsId]))
      changeSaveBnt(this)
    } else if (savedArticles.indexOf(newsId) === -1) {
      var tmp = JSON.parse(savedArticles)
      tmp.push(newsId)
      localStorage.setItem('scrapeArticles', JSON.stringify(tmp))
      changeSaveBnt(this)
    }   
  })

  // handle unsave article event
  $('.posts-wrap').on('click', 'button.unsaveBnt', function () {
    var newsId = $(this).attr('post-id')
    var savedArticles = JSON.parse(localStorage.getItem('scrapeArticles'))
    var ind = savedArticles.indexOf(newsId)

    if (ind !== -1) {
      savedArticles.splice(ind, 1)
      localStorage.setItem('scrapeArticles', JSON.stringify(savedArticles))
      $(this).text('Save it').removeClass('unsaveBnt').addClass('saveBnt')
      $(this).removeClass('btn-warning').addClass('btn-primary')
      var p = $(this).parent().parent().parent().parent().parent()
      $(p).attr('isSave', 'no')
    }

  })

  // handle show all saved articles event
  $('#SavedArt').on('click', function () {
    var unSaveDom = $("[issave='no']")
    for (var i = 0; i < unSaveDom.length; i++) {
      $(unSaveDom[i]).remove()
    }
  })
})
