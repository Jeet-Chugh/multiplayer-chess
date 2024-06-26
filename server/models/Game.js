const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  moves: [{ type: String }],
  state: { type: String }, // FEN string
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;