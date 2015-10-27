# run-cito.js


## Use

`````

var r = new run({
	callback: function () {
		console.log("start!");
	},
    debug: true
});

console.log('isRunning', r.isRunning());
console.log('this tab run owner?', r.thisTabRunOwner());


`````