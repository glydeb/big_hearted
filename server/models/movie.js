var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./comment').schema;

var MovieSchema = new Schema({
  title: { type: String, required: true },
  director: String,
  releaseDate: Date,
  comments: [CommentSchema],
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
