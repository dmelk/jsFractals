var LeviDrawer = function(){
    FractalDrawer.call(this);
}

LeviDrawer.prototype = new FractalDrawer();

LeviDrawer.prototype.beginDraw = function(depth) {
    FractalDrawer.prototype.beginDraw.call(this, depth);
    
    this.x = this.width * 0.25;
    this.y = this.height*0.7;
    this.turnAngle = 45;
    this.angle = 0;
    
    this.setLineWidth(this.width * 0.5, depth);
}