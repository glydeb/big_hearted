var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VerificationSchema = new Schema({
  verification: { type: String, required: true },
  used: { type: Boolean, required: true },
});

var Verification = mongoose.model('Verification', VerificationSchema);

module.exports = Verification;
