const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// The schema for place
const placeSchema = new Schema({
  // required means must not be empty
    title: { type: String, required: true },
    description: { type: String, required: true },
    // note that we store image as just an url, not a file
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    // here the type: mongoose.Types.ObjectId tells real mongo ID
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

// .model() here return a constructor function later
// it needs two argument, 1st is name of model, convention is a singular uppercase word
// 2nd argument is the schema we want to refer to, here is the placeSchema above this block of comment
module.exports = mongoose.model('Place', placeSchema);