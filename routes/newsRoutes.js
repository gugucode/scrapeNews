const cheerio = require('cheerio')
var request = require('request')

var newYorkTimeUrl = 'https://www.nytimes.com/section/technology?module=SectionsNav&action=click&version=BrowseTree&region=TopBar&contentCollection=Tech&pgtype=collection'

module.exports = function (app, mongoose) {
  var newsModel = require('../models/news.js')(mongoose)
  app.get('/scrape', function (req, res) {
    request(newYorkTimeUrl, function (err, response, html) {
      if (err) {
        throw err
      }

      var $ = cheerio.load(html)
      $('#latest-panel div ol.theme-stream li').each(function (i, element) {
        var newsData = {
          title: $(element).find('h2.headline').text().trim(),
          author: $(element).find('p.byline').text().trim().slice(3),
          writtenDate: $(element).find('time.dateline').attr('datetime'),
          summary: $(element).find('p.summary').text().trim(),
          image: $(element).find('img').attr('src'),
          link: $(element).find('.story-link').attr('href')
        }
        if (newsData.title !== '' && newsData.link !== '') {
          newsModel.saveNews(newsData, function (err, data) {
            if (err) {
              throw err
            } else {
              res.json(data)
            }
          })
        }
      })
    })
  })
}
