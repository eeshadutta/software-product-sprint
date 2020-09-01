import React, { useEffect, useRef, useState } from 'react';
import './canvas.css'
import { socket, _roomName } from '../api';

function Canvas() {
    let mode = "pen";
    let drawing = false;
    const current = { x: 0, y: 0, color: "#000000" };
    const canvasRef = useRef(null);
    const [sliderValue, changeSlider] = useState(50);
    const [playerInfo, changePlayerInfo] = useState({});

    useEffect(() => {
        socket.on('playerInfo', (data) => {
            if (data.socketId === socket.id) {
                changePlayerInfo(data);
            }
        });

        socket.on('drawReceive', (data) => {
            onDrawingEvent(data);
        });

        socket.on('clearReceive', () => {
            clearCanvas();
        });
    });

    useEffect(() => {
        onResize();
    }, []);

    function onResize() {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
    }

    function drawLine(x0, y0, x1, y1, color, lineWidth, emit) {
        const context = canvasRef.current.getContext('2d');
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = lineWidth / 10;

        context.stroke();
        context.closePath();

        if (!emit) {
            return;
        }
        var w = canvasRef.current.width;
        var h = canvasRef.current.height;

        var data = {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color,
            lineWidth: lineWidth,
            roomName: _roomName
        }
        socket.emit('drawEvent', data);
    }

    function obtainPosition(e) {
        var rect = e.target.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        const inputX = e.clientX || e.touches[0].clientX;
        const inputY = e.clientY || e.touches[0].clientY;

        var x = (inputX - rect.left) * scaleX;
        var y = (inputY - rect.top) * scaleY;

        return [x, y];
    }

    function onMouseDown(e) {
        drawing = true;

        var pos = obtainPosition(e);

        current.x = pos[0];
        current.y = pos[1];
    }

    function onMouseUp(e) {
        drawing = false;

        var pos = obtainPosition(e);

        current.x = pos[0];
        current.y = pos[1];
    }

    function onMouseMove(e) {
        if (!drawing || !playerInfo.drawing) {
            return;
        }

        var lastX = current.x;
        var lastY = current.y;

        var pos = obtainPosition(e);

        current.x = pos[0];
        current.y = pos[1];

        drawLine(lastX, lastY, current.x, current.y, current.color, sliderValue, true);
    }

    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function () {
            var time = new Date().getTime();

            if (time - previousCall >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    function onDrawingEvent(data) {
        var w = canvasRef.current.width;
        var h = canvasRef.current.height;
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.lineWidth, false);
    }

    function clearCanvas() {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    function onSliderChange(e) {
        changeSlider(e.target.value);
    }

    function selectBrush() {
        mode = "pen";
        current.color = "#000000";
    }

    function selectEraser() {
        mode = "pen";
        current.color = "#FFFFFF";
    }

    function onClearCanvas() {
        if (playerInfo.drawing) {
            socket.emit("clearCanvas", { roomName: _roomName });
        }
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        selectBrush();
    }

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={(e) => onMouseDown(e)}
                    onMouseUp={(e) => onMouseUp(e)}
                    onMouseOut={(e) => onMouseUp(e)}
                    onMouseMove={(e) => throttle(onMouseMove(e), 10)}
                    onTouchStart={(e) => onMouseDown(e)}
                    onTouchEnd={(e) => onMouseUp(e)}
                    onTouchCancel={(e) => onMouseUp(e)}
                    onTouchMove={(e) => throttle(onMouseMove(e), 10)}
                ></canvas>
            </div>

            {playerInfo.drawing &&
                <div className="canvas-tools">
                    <input
                        type="range"
                        min="10" max="500"
                        value={sliderValue}
                        onChange={(e) => onSliderChange(e)}
                        step="1"
                        className="slider"
                    ></input>

                    <div className="horizontal-list">
                        <i className="material-icons" onClick={selectBrush} style={{ cursor: "pointer" }}>brush</i>
                        <img src="https://img.icons8.com/material/24/000000/eraser--v1.png" alt="eraser" onClick={selectEraser} style={{ cursor: "pointer", marginRight: 20, marginLeft: 20 }} />
                        <i className="material-icons" onClick={onClearCanvas} style={{ cursor: "pointer" }}>delete</i>
                    </div>
                </div>
            }

            {playerInfo.drawing === false && 
                <div className="canvas-tools"></div>
            }
        </div>
    );
};

export default Canvas;