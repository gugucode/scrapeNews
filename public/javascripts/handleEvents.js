$(function () {
  $('#scrapeBnt').on('click', function () {
    $.get('/scrape').then(function () {
      location.reload()
    })
  })
})
