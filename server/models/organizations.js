var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  description: { type: String, required: true },
  image: {type: String, required: true},
  link: {type: String, required: true}
});



var Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
