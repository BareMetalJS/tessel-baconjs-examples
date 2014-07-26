/* 
 * Toggles one of the Tessel's status LEDs when the config button
 * is pressed.
 */

var tessel = require('tessel');
var Bacon = require('baconjs').Bacon;

// create a stream of button press events from a node.js style event emitter.
var presses = Bacon.fromEventTarget(tessel.button, "press");

// Toggle the LED for each value (button press event) in the stream.
// This time we don't care about the stream's values.
presses.onValue(function() {
	tessel.led[0].toggle();
})
