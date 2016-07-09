var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DownloadSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filepath: { type: String, required: true },
  link: {type: String, required: true}
});

var Download = mongoose.model('Download', DownloadSchema);

module.exports = Download;
