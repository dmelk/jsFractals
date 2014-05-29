/**
 * Init new class for drawing Cesaro curve
 * @returns {CesaroDrawer}
 */
var CesaroDrawer = function(){
    // call parents constructor
    FractalDrawer.call(this);
}

/**
 * Make this class child of FractalDrawer
 * @type FractalDrawer
 */
CesaroDrawer.prototype = new FractalDrawer();

/**
 * Change beginDraw method
 * @param Number depth
 */
CesaroDrawer.prototype.beginDraw = function(depth) {
    // call parent method
    FractalDrawer.prototype.beginDraw.call(this, depth);
    
     // set begin data
    this.x = 0;
    this.y = this.height*0.7;
    this.turnAngle = 85;
    this.angle = 0;
    
     // calculate line width
    this.setLineWidth(this.width, depth);
}