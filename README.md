# Tessel and Bacon.js

## Introduction

Bacon.js is a neat little Functional Reactive Programming (FRP) library for
JavaScript. You can use it on the server in node.js or in the browser. Better still it works
out of the box in your Tessel scripts!

Bacon.js takes events and turns them into streams that can be filtered, composed and otherwise
manipulated with functional programming idioms. This can help make your programs easier to understand and maintain. See the [Bacon.js website](http://baconjs.github.io/) for a more detailed overview and for API details.

Bacon.js maps pretty well to event driven programs on the Tessel. To use the examples below simply run `npm install baconjs` in your script folder and use `tessel run` to run each script.

## Examples

Feel free to contribute your own examples of using Bacon.js with different Tessel modules and features; or improvements to the existing examples.

Just fork this repo, add a file with your example, add a description of it to the bottom of this README and send me
pull request.

### [once.js](once.js) - A single valued stream

This is perhaps the simplest example of creating and handling a stream. `Bacon.once(value)` creates a stream with a single value passed as a parameter. The stream ends once it gives up its sole value.

When we want to create a side-effect from the values in a stream (turning on a LED, printing to the console, toggling a pin etc.) we can pass a function to the stream's `onValue` method. This function is called once for each value in the stream, taking the value as its parameter.

In this example we simply log the one and only value to `stdout`.

### [string-blitter.js](string-blitter.js) - A stream of evenly spaced events

This example shows how to create a stream with events fired at a fixed interval. It uses `Bacon.sequentially` which given an interval and an array of values returns a stream of those values delivered at that interval.

Here we split our message String into a character array and fire each character to `stdout` half a second apart.

Similar stream creation methods are `Bacon.interval(interval,value)` which creates a stream repeating the same value at a fixed interval; and `Bacon.repeatedly(interval, values)` which creates a stream sending the same list of values at a regular interval.

### [button-to-led.js](button-to-led.js) - Toggle a LED on each button press

This example shows how to convert individual key press events from the Tessel's `config` button into a stream of those events. Then by passing a callback to the stream's `onValue` method we toggle one of the Tessel's status LEDs for each item in the stream.

The Tessel button API conveniently follows the Node.js EventEmitter pattern allowing us to use `Bacon.fromEventTarget` which creates a stream from events fired by an EventEmitter.

### [button-to-led2.js](button-to-led2.js) - Light a LED while the button is pressed

This example turns on the Tessel's LED as long as the `config` button is held down. It introduces two new stream methods - `map` and `merge`.

Firstly we create individual streams for button presses and releases in the same fashion as the previous example. 

We then call `map(1)` and `map(0)` on these streams respectively to turn the event objects on them into simple ones and zeros which we can pass to the LED object's `output` method.

Note that while in this example `map` is returning a constant value for each input value, the more general case is to pass it a function that will transform the input value.

Lastly we use `merge` to combine the two streams, creating a stream of interleaved ones and zeros. We subscribe to that stream with `onValue` using the value of the stream to set the LED's state.

