var KohDrawer = function(){
    FractalDrawer.call(this);
}

KohDrawer.prototype = new FractalDrawer();

KohDrawer.prototype.beginDraw = function(depth) {
    FractalDrawer.prototype.beginDraw.call(this, depth);
    
    this.x = 0;
    this.y = this.height*0.7;
    this.turnAngle = 60;
    this.angle = 0;
    
    this.setLineWidth(this.width, depth);
}