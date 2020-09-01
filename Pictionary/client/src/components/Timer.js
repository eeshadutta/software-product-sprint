import React from 'react';
import './timer.css'
import { socket, _roomName } from '../api.js';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerInfo: {},
            timestampToEnd: new Date(),
            timeremaining: 0,
        };
    }

    calculateTime() {
        var currentTime = new Date();
        var endTime = new Date(this.state.timestampToEnd);
        var seconds = (endTime.getTime() - currentTime.getTime()) / 1000;
        return parseInt(seconds);
    }

    componentDidMount() {
        socket.on('playerInfo', (data) => {
            if (socket.id === data.socketId) {
                this.setState({
                    playerInfo: data,
                });
            }
        });

        socket.on('endTimeData', (data) => {
            var dt = new Date(data.endTime);
            this.setState({
                timestampToEnd: dt,
            });
            this.setState({
                timeRemaining: this.calculateTime(),
            });
        });
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }


    tick() {
        console.log(this.state.playerInfo.drawing + " --- " + this.state.timeRemaining);
        if (typeof (this.state.playerInfo.drawing) == "undefined") {
            return;
        }
        if ((this.state.timeRemaining === 1) && (this.state.playerInfo.drawing === true)) {
            socket.emit('nextTurn', { roomName: _roomName });
            this.setState({
                timeRemaining: 0,
            });
        } else {
            this.setState({
                timeRemaining: this.calculateTime(),
            });
        }
    }

    render() {
        return (
            <div className="timer-bar">
                <h3 className="time">
                    Time Left: {this.state.timeRemaining}
                </h3>
            </div>
        );
    }
}
