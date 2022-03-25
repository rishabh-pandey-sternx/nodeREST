const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user.model')

// create a schema
var listSchema = new Schema({
    listName: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
}, {collection:"lists", timestamps: true});

// we need to create a model using it
module.exports = mongoose.model('List', listSchema);