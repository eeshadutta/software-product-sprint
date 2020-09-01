const Player = require('../models/player')

const createPlayer = function (playerName, isAdmin, socketId) {
    var player = new Player(playerName, isAdmin, socketId);
    return player;
}


module.exports = { createPlayer }