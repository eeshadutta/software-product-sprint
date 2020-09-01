const app = require('express')();
const server = require('http').Server(app);
const path = require('path');
const {port} = require('./config');

let roomManager = require('./app/controllers/room')
let playerManager = require('./app/controllers/player')
let gameManager =  require('./app/controllers/game')
let socket = require('./app/controllers/socket')

var url = require('url');
var bodyParser = require('body-parser');

app.use(require('express').static(path.join(__dirname, 'app/views')));
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
    console.log(`Server running at port:${port}`);
    socket.startSocketConnection(server);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/views/index.html');
});

app.post('/createRoom', function (req, res) {
	
});

app.post('/joinRoom', function (req, res) {
	
});

app.get('/game', (req, res) => {
	// res.sendFile(__dirname + '/app/views/game.html');
});

