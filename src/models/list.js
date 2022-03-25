const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
var listSchema = new Schema({
    listId: { type: String, required: true },
    listName: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
}, {collection:"lists", timestamps: true});

// we need to create a model using it
module.exports = mongoose.model('List', listSchema);