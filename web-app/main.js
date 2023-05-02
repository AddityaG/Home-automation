var button_red = document.getElementById( 'button-red' );

// initial button states
var button_red_state = false;

// check for active connection
var isConnectionActive = false;

// connect to the Web Socket server
var connection = io( 'http://192.168.222.19:9000' );

// when connection is established 
connection.on( 'connect', () => {
  isConnectionActive = true;
} );

connection.on( 'disconnect', () => {
  isConnectionActive = false;
} );

// WebSocket event emitter function
var emitEvent = function( event ) {
  if( ! isConnectionActive ) {
    return alert( 'Server connection is closed!' );
  }

  // change button state
  if( event.target.id === 'button-red') { button_red_state = ! button_red_state; }

  // emit `led-toggle` socket event
  connection.emit( 'led-toggle', {
    r: button_red_state,
  } );
};

// add event listeners on button
button_red.addEventListener( 'click', emitEvent );
