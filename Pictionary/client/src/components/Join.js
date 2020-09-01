import React from 'react';
import './join.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { joinPlayerInGame } from '../api';

const usePlaceholderStyles = makeStyles((theme) => ({
    placeholder: {
        color: "#aaa"
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};

export default class Join extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            numberOfRounds: 0,
            timeToGuess: 0,
            roomName: "",
        }
        this.setUsername = this.setUsername.bind(this);
        this.setNumberOfRounds = this.setNumberOfRounds.bind(this);
        this.setTimeToGuess = this.setTimeToGuess.bind(this);
        this.setRoomName = this.setRoomName.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.handleJoinRoom = this.handleJoinRoom.bind(this);
    }

    setUsername(event) {
        this.setState({
            username: event.target.value,
        })
    }

    setNumberOfRounds(event) {
        this.setState({
            numberOfRounds: event.target.value,
        })
    }

    setTimeToGuess(event) {
        this.setState({
            timeToGuess: event.target.value,
        })
    }

    setRoomName(event) {
        this.setState({
            roomName: event.target.value,
        })
    }

    handleCreateRoom() {
        if (this.state.username === "" || this.state.numberOfRounds === 0 || this.state.timeToGuess === 0) {
            alert("Please enter the required details");
            return;
        }
        var data = {
            playerName: this.state.username,
            isAdmin: true,
            totalRounds: this.state.numberOfRounds,
            timeToGuess: this.state.timeToGuess,
        }
        joinPlayerInGame(data);
    }

    handleJoinRoom() {
        if (this.state.username === "" || this.state.roomName === "") {
            alert("Please enter the required details");
            return;
        }
        var data = {
            playerName: this.state.username,
            isAdmin: false,
            roomName: this.state.roomName,
        }
        joinPlayerInGame(data);
    }

    render() {
        return (
            <Grid container className="layoutContainer back">
                <Grid item md={4} lg={4}></Grid>

                <Grid item md={4} lg={4}>
                    <div className="main-title">
                        PICTIONARY
                    </div>
                </Grid>

                <Grid item md={4} lg={4}></Grid>

                <Grid item md={3} lg={3}></Grid>

                <Grid item md={3} lg={3}>
                    <div className="paper">
                        <Typography component="h1" variant="h5">
                            Create a New Room
                        </Typography>
                        <form className="form" noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.setUsername}
                            />

                            <Select
                                variant="outlined"
                                style={{ marginTop: 8, marginBottom: 8 }}
                                required
                                fullWidth
                                displayEmpty
                                id="numberOfRounds"
                                label="Number of Rounds"
                                name="numberOfRounds"
                                value={this.state.numberOfRounds}
                                onChange={this.setNumberOfRounds}
                                renderValue={
                                    this.state.numberOfRounds !== 0
                                        ? undefined
                                        : () => <Placeholder>Number of Rounds *</Placeholder>
                                }
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                                <MenuItem value={14}>14</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                            </Select>

                            <Select
                                variant="outlined"
                                style={{ marginTop: 8, marginBottom: 8 }}
                                required
                                fullWidth
                                displayEmpty
                                id="timeToGuess"
                                label="Time to Guess"
                                name="timeToGuess"
                                value={this.state.timeToGuess}
                                onChange={this.setTimeToGuess}
                                renderValue={
                                    this.state.timeToGuess !== 0
                                        ? undefined
                                        : () => <Placeholder>Time to Guess *</Placeholder>
                                }
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                                <MenuItem value={70}>70</MenuItem>
                                <MenuItem value={80}>80</MenuItem>
                                <MenuItem value={90}>90</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={110}>110</MenuItem>
                                <MenuItem value={120}>120</MenuItem>
                                <MenuItem value={130}>130</MenuItem>
                                <MenuItem value={140}>140</MenuItem>
                                <MenuItem value={150}>150</MenuItem>
                                <MenuItem value={160}>160</MenuItem>
                                <MenuItem value={170}>170</MenuItem>
                                <MenuItem value={180}>180</MenuItem>
                                <MenuItem value={190}>190</MenuItem>
                                <MenuItem value={200}>200</MenuItem>
                                <MenuItem value={210}>210</MenuItem>
                                <MenuItem value={220}>220</MenuItem>
                                <MenuItem value={230}>230</MenuItem>
                                <MenuItem value={240}>240</MenuItem>
                                <MenuItem value={250}>250</MenuItem>
                                <MenuItem value={260}>260</MenuItem>
                                <MenuItem value={270}>270</MenuItem>
                                <MenuItem value={280}>280</MenuItem>
                                <MenuItem value={290}>290</MenuItem>
                                <MenuItem value={300}>300</MenuItem>
                            </Select>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ padding: 12, marginTop: 15 }}
                                onClick={this.handleCreateRoom}
                            >
                                Create Room
                            </Button>
                        </form>
                    </div>
                </Grid>

                <Grid item md={3} lg={3}>
                    <div className="paper">
                        <Typography component="h1" variant="h5">
                            Join a Room
                        </Typography>
                        <form className="form" noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.setUsername}
                            />
                            <TextField
                                variant="outlined"
                                style={{ marginTop: 8, marginBottom: 8 }}
                                required
                                fullWidth
                                id="roomName"
                                label="Room Name"
                                name="roomName"
                                value={this.state.roomName}
                                onChange={this.setRoomName}
                            />
                            <p style={{ color: "gray", marginTop: 15, marginBottom: 18 }}>Room Name is a unique code which someone shares with you which lets you join their room.</p>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ padding: 12, marginTop: 15 }}
                                onClick={this.handleJoinRoom}
                            >
                                Join Room
                            </Button>
                        </form>
                    </div>
                </Grid>

                <Grid item md={3} lg={3}></Grid>
            </Grid>
        );
    }
}