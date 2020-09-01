import React from 'react';
import './chatbox.css'
import { TextField, MuiThemeProvider, createMuiTheme, colors } from '@material-ui/core';
import { socket, _roomName } from '../api'

const customTheme = createMuiTheme({ palette: { primary: colors.blue, secondary: colors.green } });

const sys_socket = "SYSTEM_SOCKET_ID";

export default class ChatBox extends React.Component {
    constructor() {
        super();
        this.state = {
            chatList: [],
            message: "",
        }
        this.messagesRef = React.createRef();
        this.setMessage = this.setMessage.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
    }

    appendMessage(list, entry) {
        list.push(entry);
        return list;
    }

    componentDidMount() {
        this.scrollToBottom();
        socket.on('revieveMessage', (data) => {
            console.log('Message :' + data.data[0] + data.data[1] + data.data[2]);
            this.setState({
                chatList: this.appendMessage(this.state.chatList, data.data),
            });
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
    }


    setMessage(event) {
        this.setState({
            message: event.target.value,
        })
    }

    handleSend() {

        var data = {
            roomName: _roomName,
            message: this.state.message,
        };
        if (this.state.message.length !== 0) {
            socket.emit('sendMessage', data);
        }

        this.setState({
            message: "",
        })
    }

    checkEnter(event) {
        if (event.keyCode === 13) {
            this.handleSend();
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={customTheme}>
                <div className="chat-box">
                    <div className="messages" ref={this.messagesRef}>
                        <div>{this.state.chatList.map(function (item, key) {
                            if (item[2] === socket.id) {
                                return (
                                    <div className="own-message">
                                        <p className="name"><b>You</b></p>
                                        <p className="message">{item[1]}</p>
                                    </div>
                                );
                            } else if (item[2] === sys_socket) {
                                return (
                                    <div className="system-message">
                                        <p className="name"><b>System</b></p>
                                        <p className="message">{item[1]}</p>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="other-message">
                                        <p className="name"><b>{item[0]}</b></p>
                                        <p className="message">{item[1]}</p>
                                    </div>
                                );
                            }

                        }, this)}
                        </div>
                    </div>

                    <div className="message-box">
                        <TextField
                            className="input-box"
                            variant="outlined"
                            margin="normal"
                            id="messageBox"
                            label="Message"
                            name="messageBox"
                            value={this.state.message}
                            onChange={this.setMessage}
                            onKeyDown={this.checkEnter}
                        />

                        <i className="material-icons send-button" onClick={this.handleSend}>send</i>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
