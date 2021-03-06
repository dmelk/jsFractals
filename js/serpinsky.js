/**
 * Mode: true for teach, false for demo
 * @type Boolean
 */
var teach = false;

/**
 * Change mode: demo or teach
 */
var changeMode = function() {
    teach = !teach;
    alert('Mode changed to: '+(teach? 'teaching' : 'demo'));
}

/**
 * Main function for fractal drawing
 */
var drawFractal = function() {
    // check for max depth
    if (fractalDepth == 6) {
        alert('Max depth reached');
        return;
    }
    // turn off teach mode for depth greater than 3
    if (fractalDepth > 3 && teach) changeMode();
    // get canvas, it's size and 2d context
    var canvas = document.getElementById('paintBox'),
        coords = {x: 0, y:  0, w: canvas.width, h: canvas.height},
        context = canvas.getContext('2d');
    // fill screen with main color
    fillScreen(color);
    // draw fractal
    draw(context, coords, fractalDepth)
    // increase depth
    fractalDepth++;
}

/**
 * Recursivelly draws fractal
 * @param Context context Context for drawing
 * @param Object coords Object with fractal coordinates: x, y, w, h
 * @param int depth Current fractal depth
 */
var draw = function(context, coords, depth) {
    // depth check (if less then 0 do nothing)
    if (depth <= 0) return;
    // get coordinates of center rectangle
    var x1 = coords.x + coords.w / 3,
        x2 = coords.x + 2 * coords.w / 3,
        y1 = coords.y + coords.h / 3,
        y2 = coords.y + 2 * coords.h / 3,
        w = coords.w / 3,
        h = coords.h / 3;
    // clear centered rectangle
    context.fillStyle = emptyColor;
    context.fillRect(x1, y1, w, h);
    // if teach mode: pause
    if (teach) alert('press key to continue...');
    // call draw for other rectangles
    draw(context, {x: coords.x, y: coords.y, w: w, h: h}, depth-1);
    draw(context, {x: x1, y: coords.y, w: w, h: h}, depth-1);
    draw(context, {x: x2, y: coords.y, w: w, h: h}, depth-1);
    draw(context, {x: coords.x, y: y1, w: w, h: h}, depth-1);
    draw(context, {x: x2, y: y1, w: w, h: h}, depth-1);
    draw(context, {x: coords.x, y: y2, w: w, h: h}, depth-1);
    draw(context, {x: x1, y: y2, w: w, h: h}, depth-1);
    draw(context, {x: x2, y: y2, w: w, h: h}, depth-1);
}