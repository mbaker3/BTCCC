var GEOMETRY = {};

GEOMETRY.Circle = function(x, y, radius, color) {
    // ---- PRIVATE VARS ---- //
    //used so that private methods have access to public methods/properties
	var self = this;
	
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    
    console.log("COL?", this.color);
    
    this.draw = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    }

	// ---- PUBLIC VARS ---- //
	//this.myPublicVar = 10;

	// ---- CONSTRUCTOR ---- //
	//Put your constructor code here

	// ---- PRIVATE FUNCTIONS ---- //
	//NOTE: If you want access to a public method/property reference it through the self property.
	//	Ex: self.myPublicVar = 10;
	// function myPrivateFunc(){
		//do something
	// };

	// ---- PUBLIC FUNCTIONS ---- //
	// this.myPublicFunc = function (){
		//do something
	// };
};