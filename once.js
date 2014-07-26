/*
 * Create a stream with a single value and log
 * that value to the console.
 */

var Bacon = require('baconjs').Bacon;

// Create the stream. It will give us only one value before it ends, being
// the string we pass.
var once = Bacon.once("Tessel and Bacon is good!");

// Create a side effect - log the stream's value
once.onValue(function(value) {
	console.log(value);
});