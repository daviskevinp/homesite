﻿
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000/60);
    };
})();

$(function () {
    blue = 0;
    direction = 1;
    animate();
});

function animate() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw stuff
    for ( var red = 0; red < 256 ; red += 3) {
        for (var green = 0; green < 256; green +=3 ) {
            context.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + 1 + ")";
            context.fillRect(red, green, 3, 3);
        }
    }

    if (blue == 255 && direction == 1) {
        direction = -1;
    }
    if (blue == 0 && direction == -1) {
        direction = 1;
    }
    
    blue += direction;
    
    // request new frame
    requestAnimFrame(function () {
        animate();
    });
}