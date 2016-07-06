var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  user_verify: { type: String, required: true},
  username: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  dgd: { type: Boolean, required: true },
  dgdnumber: { type: Number, required: true },
  anonymous: { type: Boolean, required: true },
  likes: { type: Array },
  flagged: { type: Boolean, required: true },
  postedDate: Date
  // comments: [CommentSchema]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
