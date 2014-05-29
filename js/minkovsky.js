var MinkovskyDrawer = function(){
    FractalDrawer.call(this);
}

MinkovskyDrawer.prototype = new FractalDrawer();

MinkovskyDrawer.prototype.beginDraw = function(depth) {
    FractalDrawer.prototype.beginDraw.call(this, depth);
    
    this.x = 0;
    this.y = this.height*0.5;
    this.turnAngle = 90;
    this.angle = 0;
    
    this.setLineWidth(this.width, depth);
}