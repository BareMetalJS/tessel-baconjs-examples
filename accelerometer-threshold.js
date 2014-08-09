/*
 * Turn on an LED while a the acceleromter X axis
 * is within a certain range.
 * NB. install the accelerometer driver library 'accel-mma84'
 * before running.
 */

var tessel = require('tessel');
var Bacon = require('baconjs').Bacon;
var accel = require('accel-mma84').use(tessel.port['A']);

// Creates a stram from the accelerometer's ready event, maps it to a
// stream of true values and converts the stream to a property.
// In other words this property will become true when the ready event fires
var ready = Bacon.fromEventTarget(accel, "ready").map(true).toProperty();

// log when the ready event fires
ready.onValue(function(value) {
		console.log("Acceleromter ready");
});

// Convert 'data' events from the acceleromter into a stream
// Comes as an array of three values, one for each axis.
var xyz = Bacon.fromEventTarget(accel, 'data');

// We only care about the X axis so map to a stream of single values
var x = xyz.map(function(xyz) {
		return xyz[0];
});

// Create a stream boolean values which emits true values
// only when the X axis value is between -0.5 and +0.5
var led_status = x.map(function(x) {
	return (Math.abs(x) <= 0.5);
});

// Create a stream that emits values only while the 'ready' property is true
// Set the state of the LED for each value. The LED will be on only when
// the X axis is in the correct range.
led_status.takeWhile(ready).onValue(function(val) {
	tessel.led[0].output(val);
});