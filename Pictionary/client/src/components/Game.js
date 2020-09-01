import React from 'react';
import { Grid } from '@material-ui/core';
import Canvas from './Canvas';
import ScoreBoard from './ScoreBoard';
import Timer from './Timer';
import ChatBox from './ChatBox';
import StatusBar from './StatusBar'
import Waiting from './Waiting';
import { socket } from '../api';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerCount: 0,
        };
    }

    componentDidMount() {
        socket.on('playerCountUpdate', (data) => {
            this.setState({
                playerCount: data.count,
            });
        });
    }


    render() {
        if (this.state.playerCount <= 1) {
            return (
                <Grid container className="layoutContainer">
                    <Grid item md={3} lg={3}>
                        <ScoreBoard />
                    </Grid>

                    <Grid item md={6} lg={6}>
                        <StatusBar />
                        <Waiting />
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <Timer />
                        <ChatBox />
                    </Grid>

                </Grid>
            );
        } else {
            return (
                <Grid container className="layoutContainer">
                    <Grid item md={3} lg={3}>
                        <ScoreBoard />
                    </Grid>

                    <Grid item md={6} lg={6}>
                        <StatusBar />
                        <Canvas />
                    </Grid>

                    <Grid item md={3} lg={3}>
                        <Timer />
                        <ChatBox />
                    </Grid>

                </Grid>
            );
        }
    }
}
