var Room = require('../models/room')
const Player = require('../models/player')

var rooms = [];

const getRoomName = function () {
    return Array(7).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');
}

const getRoom = function (roomName) {
    var room = rooms.find(room => room.roomName == roomName);
    return room;
}

const getPlayerIndex = function(roomName, socketId) {
    var room = getRoom(roomName);
    if (typeof(room) != "undefined") {
        for(var i=0;i<room.players.length;i++) {
            if(room.players[i].getSocketId()==socketId) {
                return i;
            }
        }
    }
    return -1;
} 

const getPlayer = function (roomName, socketId) {
	var room = getRoom(roomName);
    var player;
    if (typeof(room) != "undefined") {
        player = room.players.find(player => player.getSocketId() == socketId);
        return player;
    }
    return player;
}

const createRoom = function () {
    let roomName = getRoomName();
    let room = new Room(roomName);
    rooms.push(room);
    return room;
}

const addPlayerToRoom = function (roomName, player) {
	var room = getRoom(roomName);
    if(typeof (room) != "undefined") {
        room.addPlayerToRoom(player);
        return 200;
    }
    return 404;
}

const findIndex = function(room) {
    for(var i = 0;i<rooms.length;i++) {
        if(rooms[i].roomName==room.roomName) {
            return i;
        }
    }
    return -1;
}

const removeRoom  = function(room) {
    var index = findIndex(room);
    if(index == -1) {
        return;
    }
    for(var i = index;i<rooms.length - 1;i++) {
        rooms[i] = rooms[i+1];
    }
    rooms.pop();
}

const deletePlayer = function(room,socketId) {
    var player = getPlayer(room.roomName,socketId);
    if (typeof(player) != "undefined") {
        room.removePlayer(player)
        if(room.players.length==0) {
            console.log('deleting room '+ room.roomName);
            removeRoom(room);
        }
    }
}

module.exports = {createRoom, getRoom, getPlayer, addPlayerToRoom, deletePlayer, getPlayerIndex}
