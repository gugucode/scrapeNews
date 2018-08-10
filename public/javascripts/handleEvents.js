// load the each article's comment
function loadComments () {
  var news = $('.posts-wrap')

  for (var i = 0; i < news.length; i++) {
    const id = $(news[i]).attr('post-id')

    $.ajax({
      method: 'GET',
      url: '/postId/' + id
    }).then(function (data) {
      // show article's comments
      data.forEach(element => {
        element.postDate = new Date(element.postDate)
        var commentblocks = Handlebars.templates.commentblocks(element)
        $('#commentList' + id).prepend(commentblocks)
      })
    })
  }
}

// Check all loaded articles if they are saved, and if yes, mark them as saved 
function markSaved () {
  // get a list of saved articles from localStorage
  var savedArticles = localStorage.getItem('scrapeArticles')

  if (savedArticles !== null) {
    savedArticles = savedArticles.split(',')

    savedArticles.forEach(function (id) {
      var saveBnt = $("p button[post-id='" + id + "']")
      $(saveBnt).text('Unsave')
      $(saveBnt).removeClass('saveBnt').addClass('unsaveBnt')
      $(saveBnt).removeClass('btn-primary').addClass('btn-warning')
      var p = $(saveBnt).parent().parent().parent().parent().parent()
      $(p).attr('isSave', 'yes')
    })
  }
}

// concatenate two strings
var concat = function (s1, s2) {
  return s1 + s2
}

// convert date object to mm/dd/yyyy
var formatDate = function (date) {
  // console.log(date)
  if (date) {
    var m = date.getMonth() + 1
    var d = date.getDate() === 31 ? 31 : date.getDate() + 1
    return m + '/' + d + '/' + date.getFullYear()
  }
}

// register handlebars helpers
Handlebars.registerHelper('concat', concat)
Handlebars.registerHelper('formatDate', formatDate)

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
    var comment = $('#commentBox' + id).val().trim()

    if (comment !== '') {
      $.ajax({
        method: 'POST',
        url: '/saveComment',
        data: {
          postUser: 'xx',
          comment: comment,
          newsId: id
        }
      }).then(function (data) {
        // craete and save date object to data.postDate
        data.postDate = new Date(data.postDate)
        // pass returned data to commentblocks template
        var commentblocks = Handlebars.templates.commentblocks(data)
        $('#commentList' + id).prepend(commentblocks)
        $('#commentBox' + id).val('')
      })
    }
  })

  // handle delete comment event
  $('.posts-wrap').on('click', 'button.delBnt', function () {
    var commentId = $(this).attr('comment-id')
    var p = ($(this).parent()).parent()

    $.ajax({
      url: '/commentDelete/' + commentId,
      method: 'DELETE'
    }).then(function (data) {
      if (data === 'OK') {
        $(p).remove()
      } else {
        console.log('fail')
      }
    })
  })

  $('.posts-wrap').on('click', 'button.saveBnt', function () {
    var newsId = $(this).attr('post-id')
    var savedArticles = localStorage.getItem('scrapeArticles')

    // savedArticles = savedArticles === null ? newsId : savedArticles + ',' + newsId
    if (savedArticles === null) {
      localStorage.setItem('scrapeArticles', newsId)
    } else if (savedArticles.indexOf(newsId) === -1) {
      localStorage.setItem('scrapeArticles', savedArticles + ',' + newsId)
    }
    
    $(this).text('Unsave').removeClass('saveBnt').addClass('unsaveBnt')
    $(this).removeClass('btn-primary').addClass('btn-warning')
    var p = $(this).parent().parent().parent().parent().parent()
    $(p).attr('isSave', 'yes')
  })

  $('.posts-wrap').on('click', 'button.unsaveBnt', function () {
    var newsId = $(this).attr('post-id')
    var savedArticles = localStorage.getItem('scrapeArticles')
    console.log(savedArticles)
    var startInd = savedArticles.indexOf(newsId)
    if (startInd !== -1) {
      var pre = startInd === 0 ? '' : savedArticles.slice(0, startInd - 1)
      var next = savedArticles.slice(startInd + newsId.length + 1)
      console.log("pre"+pre)
      console.log("next"+next)
      localStorage.setItem('scrapeArticles', pre + next)
    }
    $(this).text('Save it').removeClass('unsaveBnt').addClass('saveBnt')
    $(this).removeClass('btn-warning').addClass('btn-primary')
    var p = $(this).parent().parent().parent().parent().parent()
    $(p).attr('isSave', 'no')
  })

  $('#SavedArt').on('click', function () {
    var unSaveDom = $("[issave='no']")
    for (var i = 0; i < unSaveDom.length; i++) {
      $(unSaveDom[i]).remove()
    }
  })
})
