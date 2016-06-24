var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var profanityFilter = require('../modules/profanity-filter');

var CommentSchema = new Schema({
  content: { type: String, required: true },
  postedBy: { type: String, required: true },
});

CommentSchema.pre('save', function (next) {
  var cleanContent = profanityFilter(this.content);
  this.content = cleanContent;
  next();
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
