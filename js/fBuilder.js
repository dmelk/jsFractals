var FractalBuilder = function() {
    this.initStr = '';
    this.rules = {};
    this.actions = {};
}

FractalBuilder.prototype.init = function(str) {
    this.initStr = str;
}

FractalBuilder.prototype.setRule = function(char, rule) {
    this.rules[char] = rule;
}

FractalBuilder.prototype.produce = function(depth) {
    var rule = this.initStr;
    for (var i = 1; i < depth; i++) {
        var newRule = '', length = rule.length;
        for (var j = 0; j < length; j++) {
            if (typeof(this.rules[rule[j]]) !== 'undefined') {
                newRule += this.rules[rule[j]];
            } else {
                newRule += rule[j];
            }
        }
        rule = newRule;
    }
    return rule;
}

FractalBuilder.prototype.attachAction = function(char, action, scope) {
    if (typeof(scope) == 'undefined') scope = this;
    this.actions[char] = {action: action, scope: scope};
}

FractalBuilder.prototype.draw = function(depth) {
    var rule = this.produce(depth);
    var length = rule.length;
    for (var i = 0; i < length; i++) {
        if (typeof(this.actions[rule[i]]) != 'undefined') {
            this.actions[rule[i]].action.call(this.actions[rule[i]].scope);
        }
    }
}

var FractalDrawer = function() {
    this.divider = 3;
    this.context = null;
    this.width = 0; 
    this.height = 0;
}

FractalDrawer.prototype.setDivider = function (divider) {
    this.divider = divider;
}

FractalDrawer.prototype.setCanvas = function(id) {
    var canvas = document.getElementById(id);
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
}

FractalDrawer.prototype.beginDraw = function(depth) {
    this.context.clearRect(0, 0, this.width, this.height);
}

FractalDrawer.prototype.setLineWidth = function(baseWidth, depth) {
    this.lineWidth = baseWidth;
    for (var i = 1; i < depth; i++) this.lineWidth = this.lineWidth / this.divider;
}


FractalDrawer.prototype.drawLine = function() {
    var x1 = this.x, y1 = this.y, x2 = 0, y2 = 0;
    var turnAngle = (this.angle < 0)? (360 - this.angle) : this.angle;
    turnAngle = this.angle * Math.PI / 180;
    x2 = x1 + Math.cos(turnAngle) * this.lineWidth;
    y2 = y1 + Math.sin(turnAngle) * this.lineWidth;
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
    this.x = x2; 
    this.y = y2;
}

FractalDrawer.prototype.turnLeft = function() {
    this.turn('-');
}

FractalDrawer.prototype.turnRight = function() {
    this.turn('+');
}

FractalDrawer.prototype.turn = function(direction) {
    if (direction == '+') {
        this.angle += this.turnAngle;
    } else if (direction = '-') {
        this.angle -= this.turnAngle;
    }
}

var maxDepth = 9;

var drawFractal = function(builder, drawer) {
    if (fractalDepth == maxDepth) {
        alert('Max depth reached');
        return;
    }
    fillScreen(emptyColor);
    
    drawer.beginDraw(fractalDepth);
    builder.draw(fractalDepth);
    
    fractalDepth ++;
}
