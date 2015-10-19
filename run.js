var run = function () {
    
    var interval = 1000;
    
    var rObj = {
        id: Math.random()
    };

    console.log('obj.id:', rObj.id);

    var existObj = function () {
        var obj = JSON.parse(localStorage.getItem("rObj"));
        return (obj && obj['time'] && obj['id']);
    };

    var isRunning = function () {
        var obj = JSON.parse(localStorage.getItem("rObj"));

        var lastTime = parseInt(obj['time']);
        return (lastTime + interval + 500 > Date.now());
    };

    var thisRunning = function () {
        var obj = JSON.parse(localStorage.getItem("rObj"));
        var id = parseFloat(obj['id']);
        return ( id === rObj.id );
    };

    var tick = function () {
        rObj['time'] = Date.now();
        console.log('run', rObj.id, rObj['time']);
        return str = JSON.stringify(rObj)
    };
    
    var init = function () {
        localStorage.setItem("rObj", tick());
        setInterval(function () {
            localStorage.setItem("rObj", tick());
        }, interval);
    };
    
    var tryInit = function () {        
        if (!existObj() || !isRunning()) {
            init();    
        }
    };

    if (isRunning() && !thisRunning()) {        
        var q = setInterval(function () {
            console.log('tryInit');
            tryInit();
            if (thisRunning()) { 
                clearInterval(q); 
            }
        }, interval);        
    } else {
        tryInit();
    }

    return {
        isRunning: isRunning,
        thisRunning: thisRunning
    };
};