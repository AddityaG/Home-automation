const path = require( 'path' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

// import LED control API
const { Gpio } = require( 'onoff' );
const led = new Gpio(17,'out');
// create an express app
const app = express();
// send `index.html` from the current directory
// when `http://<ip>:9000/` route is accessed using `GET` method
app.get( '/', ( request, response ) => {
  response.sendFile( path.resolve( __dirname, 'web-app/index.html' ), {
    headers: {
      'Content-Type': 'text/html',
    }
  } );
} );

// send asset files
app.use( '/assets/', express.static( path.resolve( __dirname, 'web-app' ) ) );
app.use( '/assets/', express.static( path.resolve( __dirname, 'node_modules/socket.io-client/dist' ) ) );

// server listens on `9000` port
const server = app.listen( 9000, () => {console.log( 'Express server started!');
console.log(`http://localhost:9000`)} );
//console.log(server);

// create a WebSocket server
const io = socketIO( server );
//console.log(io);
var booll = 1;
// listen for connection
io.on( 'connection', socket => {
  console.log( 'SOCKET: ', 'A client connected' );
//});
  //socket.on('connect_error' , err=>{console.log(err)});
  //socket.on('connect_failed', err=>{console.log(err)});
  // listen to `led-toggle` event
  socket.on( 'led-toggle', ( data ) => {
    console.log( 'Received led-toggle event.' );
    console.log(booll);
    led.writeSync(booll); // toggle LEDs
    booll = (booll+1)%2;
 }); 
} );

console.log('AAAAAAAAAAAAAAAA');
