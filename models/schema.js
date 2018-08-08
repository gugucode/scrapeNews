
module.exports = function (mongoose) {
  var Schema = mongoose.Schema

  var newsSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
      trim: true
    },

    author: {
      type: String
    },

    writtenDate: {
      type: Date,
      default: Date.now
    },

    saveDate: {
      type: Date,
      default: Date.now
    },

    summary: {
      type: String,
      maxlength: 600,
      trim: true
    },

    image: {
      type: String,
      default: 'Sorry, no image!'
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
      type: String,
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
