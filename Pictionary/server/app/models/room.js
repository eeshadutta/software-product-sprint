'use strict';

class Room {

  constructor(roomName) {
        this.players = [];
        this.roomName = roomName;
    }

    addPlayerToRoom(player) {
       this.players.push(player);
    }

    print() {
        console.log(this.players.length);
    }

    findIndex(player) {
        for(var i = 0;i<this.players.length;i++) {
            if(this.players[i].getSocketId()==player.getSocketId()) {
                return i;
            }
        }
        return -1;
    }
    
    removePlayer(player) {
        var index = this.findIndex(player);
        if(index == -1) {
            return;
        }
        for(var i = index;i<this.players.length - 1;i++) {
            this.players[i] = this.players[i+1];
        }
        this.players.pop();
    }
       
}

module.exports = Room