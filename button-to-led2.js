/*
 * Turn on an LED while a button is pressed
 */

var tessel = require('tessel');
var Bacon = require('baconjs').Bacon;

// Create a stream of button down events from a node.js style event emitter.
var presses = Bacon.fromEventTarget(tessel.button, "press");

// Create a stream of button up events the same way.
var releases = Bacon.fromEventTarget(tessel.button, "release");

// Map values on the 'presses' stream to the constant value 1
// and values on the 'releases' stream to 0
// Merge the two streams values - each press and release of
// the button outputs a 1 and then a 0 on the merged stream
var led_values = presses.map(1).merge(releases.map(0));

// Use the stream values to control the state of the LED
led_values.onValue(function(value) {
	tessel.led[0].output(value);
});