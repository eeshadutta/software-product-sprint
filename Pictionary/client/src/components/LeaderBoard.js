import React from 'react';
import { Grid, Table, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import './leaderboard.css';
import { socket, CURR } from '../api';

export default class LeaderBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            playersList: [],
        }
    }

    componentDidMount() {
        socket.on('leaderboard', (data) => {
            this.setState({
                playersList: data,
            });
        });
    }

    render() {
        return (
            <Grid container className="layoutConatiner back">
                <Grid item md={4} lg={4}></Grid>

                <Grid item md={4} lg={4}>
                    <div className="leaderboard">
                        <h1 className="title">Game Over</h1>
                        <img src="https://i.pinimg.com/originals/44/d5/ff/44d5ff705fd223c4cddd1cdc1e2eefa1.jpg" alt="" className="crown"></img>
                        <h2 className="subtitle">Leaderboard</h2>
                        <Table>
                            <TableBody>{this.state.playersList.map(function (item, key) {
                                return (
                                    <TableRow key={key} className="row">
                                        <TableCell><p className="entry">#{item.rank}</p></TableCell>
                                        <TableCell><p className="entry">{item.username}</p></TableCell>
                                        <TableCell><p className="entry">{item.points}</p></TableCell>
                                    </TableRow>
                                )
                            }, this)}
                            </TableBody>
                        </Table>
                        <Button variant="contained" color="primary" href={CURR} style={{ marginTop: 20, fontSize: 25 }}>Play again</Button>
                    </div>
                </Grid>

                <Grid item md={4} lg={4}></Grid>

            </Grid>
        );
    }
}