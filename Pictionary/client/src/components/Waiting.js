import React from 'react';
import { _roomName } from '../api';
import './waiting.css';
import { Grid } from '@material-ui/core';

export default class Waiting extends React.Component {
    render() {
        return (
            // <Grid container className="layoutContainer borders">
            //     <Grid item md={2} lg={2}></Grid>

            //     <Grid item md={8} lg={8}>
            <div className="borders">
                <div className="card">
                    <p> Looks like you're the only one here </p>
                    <p> Pictionary is best enjoyed with family and friends </p>
                    <p> Invite them over now!! </p>
                    <p> Your unique room code : <b>{_roomName}</b> </p>
                </div>
            </div>
            //     </Grid> 

            //     <Grid item md={2} lg={2}></Grid>

            // </Grid>
        );
    }
}