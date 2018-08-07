const cheerio = require('cheerio')
var request = require('request')

var newYorkTimeUrl = 'https://www.nytimes.com/section/technology?module=SectionsNav&action=click&version=BrowseTree&region=TopBar&contentCollection=Tech&pgtype=collection'

function scrapeNewYorkTime (newsModel, res) {
  request(newYorkTimeUrl, function (err, response, html) {
    if (err) {
      throw err
    }

    var $ = cheerio.load(html)

    var lastOne = $('#latest-panel div ol.theme-stream li').length - 1
    console.log(lastOne)
    $('#latest-panel div ol.theme-stream li').each(function (i, element) {
      console.log(i)
      var newsData = {
        title: $(element).find('h2.headline').text().trim(),
        author: $(element).find('p.byline').text().trim().slice(3),
        writtenDate: $(element).find('time.dateline').attr('datetime'),
        summary: $(element).find('p.summary').text().trim(),
        image: $(element).find('img').attr('src'),
        link: $(element).find('.story-link').attr('href')
      }
      if (newsData.title !== '' && newsData.link !== '') {
        newsModel.saveNews(newsData, res)
      }
    })
    res.end()
  })
}

module.exports = function (app, news) {
  var newsModel = require('../models/news.js')(news)

  app.get('/scrape', function (req, res) {
    console.log('scrape')
    scrapeNewYorkTime(newsModel, res)
  })
}
