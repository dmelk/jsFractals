var fractalDepth = 1;
var color = '#000000';
var emptyColor = '#FFFFFF';

var clearScreen = function() {
    fractalDepth = 1;
    var canvas = document.getElementById('paintBox');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

var fillScreen = function(color) {
    var canvas = document.getElementById('paintBox'),
        context = canvas.getContext('2d');
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
