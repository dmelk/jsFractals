/**
 * Main fractal builder class
 */
var FractalBuilder = function() {
    // initial Rule (axiome)
    this.initStr = '';
    // rules list
    this.rules = {};
    // attached actions
    this.actions = {};
    // set type of produce
    this.recursion = false;
}

/**
 * Set initial Rule
 * @param String str Rule
 */
FractalBuilder.prototype.init = function(str) {
    this.initStr = str;
}

/**
 * Set transformation rule for some character
 * @param Char char Character
 * @param String rule Rule
 */
FractalBuilder.prototype.setRule = function(char, rule) {
    this.rules[char] = rule;
}

/**
 * Attach action to some character
 * @param Char char Characte
 * @param Function action Action function
 * @param Object scope Function scope
 */
FractalBuilder.prototype.attachAction = function(char, action, scope) {
    if (typeof(scope) == 'undefined') scope = this;
    this.actions[char] = {action: action, scope: scope};
}

/**
 * Produce rule of some depth, based on initial rule and transformation rules
 * @param Int depth 
 * @return String New rule
 */
FractalBuilder.prototype.produce = function(depth) {
    // set rule to inital
    var rule = this.initStr;
    // move from 1 to depth-1
    for (var i = 1; i < depth; i++) {
        // set new rule to empty string and get current rule depth
        var newRule = '', length = rule.length;
        // move through all charaters in current rule
        for (var j = 0; j < length; j++) {
            if (typeof(this.rules[rule[j]]) !== 'undefined') {
                // if transformation found -> transform charater to string
                newRule += this.rules[rule[j]];
            } else {
                // else just add this character
                newRule += rule[j];
            }
        }
        // set new rule to current rule
        rule = newRule;
    }
    // return produced rule
    return rule;
}

FractalBuilder.prototype.produceRecursivelly = function(depth, rule) {
    if (typeof(rule) === 'undefined') rule = this.initStr;
    if (depth <= 1) return rule;
    var newRule = '', length = rule.length;
    // move through all charaters in current rule
    for (var j = 0; j < length; j++) {
        if (typeof(this.rules[rule[j]]) !== 'undefined') {
            // if transformation found -> transform charater to string
            newRule += this.rules[rule[j]];
        } else {
            // else just add this character
            newRule += rule[j];
        }
    }
    return this.produceRecursivelly(depth-1, newRule);
}

/**
 * Draw fractal with current depth
 * @param Number depth
 */
FractalBuilder.prototype.draw = function(depth) {
    // get fractal rule
    var rule = (this.recursion)? this.produceRecursivelly(depth) : this.produce(depth);
    // get rule length
    var length = rule.length;
    // move through all characters in rule
    for (var i = 0; i < length; i++) {
        // if action found for character - do it!
        if (typeof(this.actions[rule[i]]) != 'undefined') {
            // call action function in actions scope
            this.actions[rule[i]].action.call(this.actions[rule[i]].scope);
        }
    }
}

/**
 * Basic drawer class
 */
var FractalDrawer = function() {
    // Line width divider for each point of depth
    this.divider = 3;
    // Canvas context data
    this.context = null;
    this.width = 0; 
    this.height = 0;
}

/**
 * Set divider
 * @param Number divider
 */
FractalDrawer.prototype.setDivider = function (divider) {
    this.divider = divider;
}

/**
 * Attach drawer to canvas
 * @param String id Canvas element id
 */
FractalDrawer.prototype.setCanvas = function(id) {
    var canvas = document.getElementById(id);
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
}

/**
 * This method will be inherited. Prepare drawer
 * @param Fractal depth depth
 */
FractalDrawer.prototype.beginDraw = function(depth) {
    // clear canvas
    this.context.clearRect(0, 0, this.width, this.height);
}

/**
 * Set line width for current depth
 * @param Number baseWidth Line width for depth 1
 * @param Number depth
 */
FractalDrawer.prototype.setLineWidth = function(baseWidth, depth) {
    this.lineWidth = baseWidth;
    for (var i = 1; i < depth; i++) this.lineWidth = this.lineWidth / this.divider;
}

/**
 * Just draw line
 */
FractalDrawer.prototype.drawLine = function() {
    // init coordinates of line
    var x1 = this.x, y1 = this.y, x2 = 0, y2 = 0;
    // init current angle
    var turnAngle = (this.angle < 0)? (360 - this.angle) : this.angle;
    turnAngle = this.angle * Math.PI / 180;
    // get end of line
    x2 = x1 + Math.cos(turnAngle) * this.lineWidth;
    y2 = y1 + Math.sin(turnAngle) * this.lineWidth;
    // draw line
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
    // move current point to end of line
    this.x = x2; 
    this.y = y2;
}

/**
 * Change direction
 * @param String direction
 */
FractalDrawer.prototype.turn = function(direction) {
    if (direction == '+') {
        this.angle += this.turnAngle;
    } else if (direction = '-') {
        this.angle -= this.turnAngle;
    }
}

/**
 * Turn left
 */
FractalDrawer.prototype.turnLeft = function() {
    this.turn('-');
}

/**
 * Turn right
 */
FractalDrawer.prototype.turnRight = function() {
    this.turn('+');
}

/**
 * Maximum fractal depth
 * @type Number
 */
var maxDepth = 9;

/**
 * Draw fractal
 * @param FractalBuilder builder
 * @param FractalDrawer drawer
 */
var drawFractal = function(builder, drawer) {
    // if max depth reach do nothing
    if (fractalDepth == maxDepth) {
        alert('Max depth reached');
        return;
    }
    
    // prepare drawer
    drawer.beginDraw(fractalDepth);
    
    // draw fractal
    builder.draw(fractalDepth);
    
    // increase depth
    fractalDepth ++;
}
