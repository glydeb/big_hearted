var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./comment').schema;

var PostSchema = new Schema({
  user_verify: { type: String, required: true},
  title: { type: String, required: true },
  author: { type: String, required: true },
  postedDate: Date,
  comments: [CommentSchema],
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
