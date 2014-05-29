/**
 * Init new class for drawing Minkovsky curve
 * @returns {MinkovskyDrawer}
 */
var MinkovskyDrawer = function(){
    // call parents constructor
    FractalDrawer.call(this);
}

/**
 * Make this class child of FractalDrawer
 * @type FractalDrawer
 */
MinkovskyDrawer.prototype = new FractalDrawer();

/**
 * Change beginDraw method
 * @param Number depth
 */
MinkovskyDrawer.prototype.beginDraw = function(depth) {
    // call parent method
    FractalDrawer.prototype.beginDraw.call(this, depth);
    
     // set begin data
    this.x = 0;
    this.y = this.height*0.5;
    this.turnAngle = 90;
    this.angle = 0;
    
     // calculate line width
    this.setLineWidth(this.width, depth);
}