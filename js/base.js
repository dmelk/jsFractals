/**
 * Current fractal depth
 * @type Number|Number
 */
var fractalDepth = 1;

/**
 * Paint color
 * @type String
 */
var color = '#000000';

/**
 * Background color
 * @type String
 */
var emptyColor = '#FFFFFF';

/**
 * Clear screen and drop depth to base value
 */
var clearScreen = function() {
    // drop base to base value
    fractalDepth = 1;
    // clear canvas
    var canvas = document.getElementById('paintBox');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

/**
 * Fill canvas with some color
 * @param String color Color
 */
var fillScreen = function(color) {
    // gen canvas and context
    var canvas = document.getElementById('paintBox'),
        context = canvas.getContext('2d');
    // fill canvas
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
