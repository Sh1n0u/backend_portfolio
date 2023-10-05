const http = require('http');
const app = require('./app');

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '4000');
console.log('port:', port)
app.set('port', port);

const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

process.on('SIGINT', () => {
    console.log("Caught interrupt signal");
    process.exit();
});  // CTRL+C

process.on('SIGQUIT', () => {
    console.log("Caught interrupt signal");
    process.exit();
}); // Keyboard quit

process.on('SIGTERM', () => {
    console.log("Caught interrupt signal");
    process.exit();
}); // `kill` command

server.listen(port);
