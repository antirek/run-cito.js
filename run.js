var run = function (options) {
    
    var callback = options.callback || function () {console.log('callback')};
    var debug = options.debug || true;

    var interval = 1000;
    
    var processMarker = {
        id: Math.random()
    };

    if (debug) console.log('marker.id:', processMarker.id);

    var existmarker = function () {
        var marker = JSON.parse(localStorage.getItem("processMarker"));
        return (marker && marker['time'] && marker['id']);
    };

    var isRunning = function () {
        var marker = JSON.parse(localStorage.getItem("processMarker"));
        if (marker) {
            var lastTime = parseInt(marker['time']);
            return (lastTime + interval + 2000 > Date.now());
        } else {
            return false;
        }
    };

    var thisTabRunOwner = function () {

        var marker = JSON.parse(localStorage.getItem("processMarker"));
        var id = parseFloat(marker['id']);
        if (debug) console.log('storage id', id, 'currentId', processMarker.id);
        return ( id === processMarker.id );
    };

    var tick = function () {
        processMarker['time'] = Date.now();
        if (debug) console.log('run', processMarker.id, processMarker['time']);
        return str = JSON.stringify(processMarker)
    };

    var intervalHandler = function () {
        localStorage.setItem("processMarker", tick());
        if (!thisTabRunOwner()) {
            clearInterval(intervalHandler);
        }
    };

    var init = function () {
        localStorage.setItem("processMarker", tick());
        setInterval(intervalHandler, interval);
        callback();
    };

    var tryInit = function () {        
        if (!existmarker() || !isRunning()) {
            init();
        }
    };

    if (isRunning()) {
        if (!thisTabRunOwner()) {
            if (debug) console.log('is isRunning but not this tab, set checker');   
            var q = setInterval(function () {
                if (debug) console.log('tryInit');
                tryInit();
                if (thisTabRunOwner()) { 
                    clearInterval(q); 
                }
            }, interval);        
        } else {
            if (debug) console.log('is running and this tab owner - all ok');
        }
    } else {
        if (debug) console.log('not running, tryInit')
        tryInit();
    }

    return {
        isRunning: isRunning,
        thisTabRunOwner: thisTabRunOwner
    };
};