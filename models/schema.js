
module.exports = function (mongoose) {
  var Schema = mongoose.Schema

  var newsSchema = new Schema({
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },

    author: {
      type: String
    },

    summary: {
      type: String,
      maxlength: 600,
      trim: true
    },

    link: {
      type: String,
      require: true,
      validate: {
        validator: function (v) {
          return v.match(/^http/g)
        },
        message: '{VALUE} is not a valid url!'
      }
    }
  })

  var commentsSchema = new Schema({
    postUser: {
      type: String,
      required: true,
      maxlength: 100
    },

    comment: {
      type: String,
      minlength: 1,
      maxlength: 600,
      trim: true
    },

    newsId: {
      type: Number,
      require: true
    },

    postDate: {
      type: Date,
      default: Date.now
    }
  })

  return {
    newsSchema: newsSchema,
    commentsSchema: commentsSchema
  }
}
