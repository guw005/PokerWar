const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    win: {
        type: Number,
        required: true
    },
    gamewon: {
        type: Number,
        required: true
    }
})

const Player = mongoose.model('player', PlayerSchema);

module.exports = Player;