$(document).ready(function() {
    var circle;
    var stats;
    
    var backgroundLayer;
    var actorLayer;
    
    var setup = function() {
        var $container = $('#container');
        $('canvas').css({width:window.innerWidth, height:window.innerHeight});
        
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        
        //fill the browser
        $('canvas').attr({width:window.innerWidth, height:window.innerHeight});
        console.log(window.innerWidth + " - " + window.innerHeight);
        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        //maka da stats happen
        stats = new Stats();
        stats.domElement.id = "stats";
	    $container.append(stats.domElement);
        
        //Add some circles
        circle = new GEOMETRY.Circle(this.width*0.5, this.height*0.5, 100, "#ff0000");
        
        //Two Bitmaps - NOT added to stage. Modify these, draw routine will composite
        //Access via backgroundLayer.data[0]
        backgroundLayer = this.context.createImageData(this.width, this.height);
        actorLayer = this.context.createImageData(this.width, this.height);
    
        for (var i = 0; i < 20000*4; i+=4)
        {
            //R
            backgroundLayer.data[i] = 0;
            //G
            backgroundLayer.data[i+1] = 0;
            //B
            backgroundLayer.data[i+2] = 255;
            //A
            backgroundLayer.data[i+3] = 255;
        }
    };

    var draw = function(time) {
        
        stats.update();
        
        // clear the canvas
        this.context.clearRect(0, 0, this.width, this.height);

        // do some shit
        this.i = this.i + 0.01 || 0;
        //this.context.fillStyle = "#ff00ff";
        //this.context.fillRect(0, 0, ((Math.sin(this.i) + 1) / 2) * this.width, 100);
        
        //circle.draw(this.context);
        
        //Draw all Background Pixels, then the Actor Pixels
        this.context.putImageData(backgroundLayer, 0, 0);
        //this.context.putImageData(actorLayer, 0, 0);
        
    };

    setup();
    // ----- UPDATE LOOP ----- //
    (function updateFrame(time){
        draw(time);
        
		window.requestAnimationFrame(updateFrame);
	})();

});


// ----- POLY FILLS ---- //
// -- requestAnimationFrame
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());