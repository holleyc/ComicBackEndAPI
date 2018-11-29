const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ComicSchema = new Schema({
    name: {type: String, required: true, max: 100},
    publisher: {type: String, required: true, max: 100},
    issue: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Comic', ComicSchema);