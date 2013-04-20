function initCanvas( width, height) {
	var canvas = $("#mainCanvas");
	
    canvas[0].width = width;
    canvas[0].height = height;
}

function drawCanvas(cellWidth, cellHeight, dividerWidth) {
    var canvas = $("#mainCanvas");
    console.log(canvas);
	var ctx = canvas[0].getContext("2d")
    var horizontalSpacer = 0;
	for ( i = 0; i < 3; i++ ) {
        var verticalSpacer=0;
		for ( j = 0; j < 3; j++ ) {
			var x = i * cellWidth + horizontalSpacer;
			var y = j * cellHeight + verticalSpacer;
			ctx.fillStyle = "#0000ff";
            console.log(x); 
            console.log(y);
			ctx.fillRect(x, y, cellWidth, cellHeight);
            verticalSpacer += dividerWidth;
		}
        horizontalSpacer += dividerWidth;
	}    
}