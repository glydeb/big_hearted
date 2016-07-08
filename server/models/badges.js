var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BadgesSchema = new Schema({
  user_verify: { type: String },
  bibliophile: { type: Boolean, default: false },
  kindness_ambassador: { type: Boolean, default: false },
  royalty: { type: Boolean, default: false },
  creature_care: { type: Boolean, default: false },
  citizenship: { type: Boolean, default: false },
  super_fan: { type: Boolean, default: false },
  generosity: { type: Boolean, default: false },
  happy_habits: { type: Boolean, default: false },
  helpful_holiday: { type: Boolean, default: false },
  flash_kindness: { type: Boolean, default: false },
  wilderness_hero: { type: Boolean, default: false },
  urgent_needs: { type: Boolean, default: false },
  smile_sharing: { type: Boolean, default: false },
  on_your_way: { type: Boolean, default: false },
  halfway: { type: Boolean, default: false },
  champion: { type: Boolean, default: false },
  downloads: { type: Boolean, default: false },
  kindness_coach: { type: Boolean, default: false },
  bright_smiles: { type: Boolean, default: false }

});



var Badges = mongoose.model('Badges', BadgesSchema);

module.exports = Badges;
