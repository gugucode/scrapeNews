var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')

var app = express()
const PORT = 3000

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
var schemas = require('./models/schema.js')(mongoose)
var news = mongoose.model('news', schemas.newsSchema)
var comments = mongoose.model('comments', schemas.commentsSchema)

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')

require('./routes/indexRoutes.js')(app, news, comments)
require('./routes/newsRoutes.js')(app, news)
require('./routes/commentsRoutes.js')(app, comments)

// Start the server
app.listen(PORT, function () {
  console.log('App running on port ' + PORT + '!')
})
