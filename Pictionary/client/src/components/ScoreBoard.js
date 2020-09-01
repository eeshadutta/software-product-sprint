import React from 'react';
import './scoreboard.css';
import { Table, TableBody, TableCell, TableContainer, TableRow, Button, MuiThemeProvider, createMuiTheme, colors } from '@material-ui/core';
import { socket } from '../api.js';

const customTheme = createMuiTheme({ palette: { primary: colors.blue, secondary: colors.green } });

export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersList: [],
        };
    }

    componentDidMount() {
        socket.on('playerChangeUpdate', (data) => {
            let dataJson = JSON.parse(data);
            this.setState({
                playersList: dataJson.playersList,
            });
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={customTheme}>
                <div className="score-board">
                    <div className="score-bar">
                        <h3 className="score">Scoreboard</h3>
                    </div>
                    <div className="players">
                        <TableContainer>
                            <Table>
                                <TableBody>{this.state.playersList.map(function (item, key) {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell style={{ paddingLeft: 40 }}>{item.username}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="primary">{item.points}</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="secondary">+ {item.gain}</Button>
                                            </TableCell>
                                            <TableCell>
                                                {item.drawing === true &&
                                                    <i className="material-icons">brush</i>
                                                }
                                                {item.guessed === true &&
                                                    <i className="material-icons">done</i>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                }, this)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
