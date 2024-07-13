const app = require('./App')
const { Server } = require('socket.io');
const server = require('http').createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    // console.log('A user connected:', socket.id);

    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data)
    });
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.devHOST;

server.listen(PORT, HOST, () => {
    console.log(`Listening: http://${HOST}:${PORT}`);
});

