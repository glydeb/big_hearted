var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DownloadSchema = new Schema({
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: {type: String, required: true}
});

var Download = mongoose.model('Download', DownloadSchema);

module.exports = Download;
