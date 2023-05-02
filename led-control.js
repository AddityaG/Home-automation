// import `onoff` package
const { Gpio } = require( 'onoff' );

// configure LED pins
const pin_red = new Gpio( 17, 'out' );

// toggle LED states
exports.toggle = ( r ) => {
  pin_red.writeSync( r );
 // pin_green.writeSync( g ? 1 : 0 );
 // pin_blue.writeSync( b ? 1 :0 );
};
