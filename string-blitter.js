/*
 * Split a message String into a character array and fire each character to the screen half a second apart.
 */

 var Bacon = require('baconjs').Bacon;

// Create a stream of characters spaced half a second apart
var letters = Bacon.sequentially(500, "Hello from Tessel!".split(''));

// Log each value in the stream
letters.onValue(function(letter) {
	console.log(letter);
});