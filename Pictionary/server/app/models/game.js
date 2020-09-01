const fs = require('fs');

class Game {
    constructor(room, roundDuration, totalRounds) {
        this.roundDuration = parseInt(roundDuration);
        this.totalRounds = parseInt(totalRounds);
        this.room = room;
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
        this.unusedWords = [];
        this.currentWord = '';
        this.gameEnded = false;
        this.endTime = new Date();

        this.fetchWords();
    }

    fetchWords() {
        var text = fs.readFileSync('./words.txt', { encoding: 'utf8', flag: 'r' });
        text = text + "";
        this.unusedWords = text.split("\n")
    }

    resetGame() {
        for (index = 0; index < this.room.players.length; index++) {
            this.room.players[index].points = 0;
        }
        this.resetGuess();
        this.gameEnded = false;
        this.roundsPlayed = 0;
        this.currentPlayerDrawingIndex = 0;
    }

    getCurrentPlayerDrawingIndex() {
        return this.currentPlayerDrawingIndex;
    }

    getCurrentWord() {
        return this.currentWord;
    }

    getRoundDuration() {
        return this.roundDuration;
    }

    getTotalRounds() {
        return this.totalRounds;
    }

    getEndTime() {
        return this.endTime;
    }

    setEndTime() {
        var dt = new Date();
        dt.setSeconds(dt.getSeconds() + this.getRoundDuration() + 3);
        this.endTime = dt;
    }

    setNewWord() {
        var index = Math.floor((Math.random() * this.unusedWords.length));
        this.currentWord = this.unusedWords[index];

        for (var i = index; i < this.unusedWords.length - 1; i++) {
            this.unusedWords[i] = this.unusedWords[i + 1];
        }
        this.unusedWords.pop();


        if (this.unusedWords.length == 0) {
            this.fetchWords();
        }
    }

    addGain() {
        for (var i = 0; i < this.room.players.length; i++) {
            this.room.players[i].points = this.room.players[i].points + this.room.players[i].gain;
            this.room.players[i].gain = 0;
        }
    }

    resetGuess() {
        for (var i = 0; i < this.room.players.length; i++) {
            this.room.players[i].guessStatus = false;
        }
    }


    nextTurn() {
        this.currentPlayerDrawingIndex += 1;
        if (this.currentPlayerDrawingIndex == this.room.players.length) {
            this.roundsPlayed += 1;
            this.currentPlayerDrawingIndex = 0;
            if (this.roundsPlayed == this.totalRounds) {
                // this.announceWinner();
                this.gameEnded = true;
                return;
            }
        }
        // this.setNewWord();
    }

    checkWord(word) {
        var tempWord = word + "";
        tempWord = tempWord.split(" ").join("");
        var correctWord = this.currentWord;
        correctWord = correctWord + "";
        correctWord = correctWord.split(" ").join("");
        correctWord = correctWord.toLowerCase();
        var newWord = tempWord.toLowerCase();
        if (newWord === correctWord) {
            return true;
        }
        return false;
    }

    calculatePlayerScore() {
        var endTime = new Date(this.endTime);
        var currTime = new Date();
        var seconds = (endTime.getTime() - currTime.getTime()) / 1000;

        var points = (seconds * 500) / (this.roundDuration);
        return parseInt(points);
    }

    calculateDrawerScore() {
        var points = 500 / (this.room.players.length - 1);
        return parseInt(points);
    }

    allGuessed() {
        var count = 0;
        for (var i = 0; i < this.room.players.length; i++) {
            if (this.room.players[i].guessStatus) {
                count += 1;
            }
        }

        if (count == this.room.players.length - 1) {
            return true;
        }
        return false;
    }

}

module.exports = Game