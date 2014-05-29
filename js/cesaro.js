var CesaroDrawer = function(){
    FractalDrawer.call(this);
}

CesaroDrawer.prototype = new FractalDrawer();

CesaroDrawer.prototype.beginDraw = function(depth) {
    FractalDrawer.prototype.beginDraw.call(this, depth);
    
    this.x = 0;
    this.y = this.height*0.7;
    this.turnAngle = 85;
    this.angle = 0;
    
    this.setLineWidth(this.width, depth);
}