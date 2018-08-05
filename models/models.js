var mongoose = require("mongoose");
var schemas = require("./schema.js")(mongoose);

var news = mongoose.model("news",schemas.newsSchema);
var comments = mongoose.model("comments",schemas.newsSchema);