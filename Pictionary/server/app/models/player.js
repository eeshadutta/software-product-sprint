class Player {
	
    constructor(playerName, isAdmin, socketId) {
        this.playerName = playerName;
        this.isAdmin = isAdmin;
        this.points = 0;
        this.socketId = socketId;
        this.guessStatus = false;
        this.gain = 0;
    }

    getSocketId() {
        return this.socketId;
    }
}

module.exports = Player
