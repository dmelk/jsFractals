/**
 * Init new class for drawing Levi curve
 * @returns {PlantDrawer}
 */
var PlantDrawer = function(){
    // call parents constructor
    FractalDrawer.call(this);
    // add coords stack
    this.coords = [];
}

/**
 * Make this class child of FractalDrawer
 * @type FractalDrawer
 */
PlantDrawer.prototype = new FractalDrawer();

/**
 * Change beginDraw method
 * @param Number depth
 */
PlantDrawer.prototype.beginDraw = function(depth) {
    // call parent method
    FractalDrawer.prototype.beginDraw.call(this, depth);
    
    // set begin data
    this.x = 0;
    this.y = 0;
    this.turnAngle = 25;
    this.angle = 35;
    
    // calculate line width
    this.setLineWidth(this.width * 0.25, depth);
}

/**
 * Add current state to stack
 */
PlantDrawer.prototype.saveCoords = function() {
    this.coords.push({x: this.x, y: this.y, angle: this.angle});
}

/**
 * Get current state from stack
 */
PlantDrawer.prototype.loadCoords = function() {
    var data = this.coords.pop();
    this.x = data.x;
    this.y = data.y;
    this.angle = data.angle;
}