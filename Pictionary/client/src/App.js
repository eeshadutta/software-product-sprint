import React from 'react';
import Game from './components/Game';
import Join from './components/Join';
import LeaderBoard from './components/LeaderBoard';
import Betrayal from './components/Betrayal';
import { socket } from './api'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            playerName: '',
            gameOver: false,
            betrayal: false,
        };
    }

    componentDidMount() {
        socket.on('newJoinee', (tempData) => {
            var data = JSON.parse(tempData);
            if (data.status === 200) {
                this.setState({
                    roomName: data.roomName,
                    playerName: data.playerName,
                });
            } else {
                alert('This Room Does Not Exist');
            }
        });
        socket.on('playerCountUpdate', (data) => {
            this.setState({
                playerCount: data.count,
            });
        });
        socket.on('GameOver', () => {
            this.setState({
                gameOver: true,
            })
        });
        socket.on('Betrayal', () => {
            this.setState({
                gameOver: true,
                betrayal: true,
            });
        });
    }

    render() {
        if (this.state.roomName === "") {
            return (
                <Join />
            );
        } else {
            if (this.state.gameOver === false) {
                return (
                    <Game />
                );
            } else {
                if (this.state.betrayal === false) {
                    return (
                        <LeaderBoard />
                    );
                } else {
                    return (
                        <Betrayal />
                    );
                }
            }
        }
    }
}
