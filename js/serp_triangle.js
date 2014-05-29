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
    // check if max depth reached
    if (fractalDepth == 11) {
        alert('Max depth reached');
        return;
    }
    // turn off teach mode if depth greater than 3
    if (fractalDepth > 3 && teach) changeMode();
    // get canvas, it's size and 2d context
    var canvas = document.getElementById('paintBox'),
        coords = {x: 0, y:  0, w: canvas.width, h: canvas.height},
        context = canvas.getContext('2d');
    // clear screen
    fillScreen(emptyColor);
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
    // draw rectangle if depth is equal to 1
    if (depth == 1) {
        context.fillStyle = color;
        context.fillRect(
            coords.x + coords.w * 0.1,
            coords.y + coords.h * 0.1, 
            coords.w * 0.8, 
            coords.h * 0.8
        );
    }
    // get coordinates of 3 rectangles
    var x1 = coords.x + coords.w / 4,
        x2 = coords.x + coords.w / 2,
        y1 = coords.y + coords.h / 2,
        w = coords.w / 2,
        h = coords.h / 2;
    // for teach mode: pause
    if (teach) alert('press key to continue...');
    // call draw for other rectangles
    draw(context, {x: x1, y: coords.y, w: w, h: h}, depth-1);
    draw(context, {x: coords.x, y: y1, w: w, h: h}, depth-1);
    draw(context, {x: x2, y: y1, w: w, h: h}, depth-1);
}