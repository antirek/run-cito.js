# run-cito.js

If you add this script with callback on page and open page in two tabs
you exec callback only in one tab, other tab will wait when first tab 
will be closed.


## Use

`````javascript

var r = new run({
	callback: function () {
		console.log("start!");
	},
    debug: true
});

console.log('isRunning', r.isRunning());
console.log('this tab run owner?', r.thisTabRunOwner());


`````


## Install

> bower install run-cito.js



## More 

https://toster.ru/q/260582
