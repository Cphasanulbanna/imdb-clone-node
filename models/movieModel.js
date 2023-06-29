const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    genre: {
        type: [string],
        required: true,
    },
    rating: Number,
    required: true,
});

module.exports = mongoose.model("Movie", movieSchema);
