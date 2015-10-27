var run = function (options) {
    
    var callback = options.cb || function () {console.log('callback')};

    var interval = 1000;
    
    var processMarker = {
        id: Math.random()
    };

    console.log('marker.id:', processMarker.id);

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
        console.log('storage id', id, 'currentId', processMarker.id);
        return ( id === processMarker.id );
    };

    var tick = function () {
        processMarker['time'] = Date.now();
        console.log('run', processMarker.id, processMarker['time']);
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
            console.log('is isRunning but not this tab, set checker');   
            var q = setInterval(function () {
                console.log('tryInit');
                tryInit();
                if (thisTabRunOwner()) { 
                    clearInterval(q); 
                }
            }, interval);        
        } else {
            console.log('is running and this tab owner - all ok');
        }
    } else {
        console.log('not running, tryInit')
        tryInit();
    }

    return {
        isRunning: isRunning,
        thisTabRunOwner: thisTabRunOwner
    };
};