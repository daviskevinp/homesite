function updateVariables() {
    
    model.CurrentOriginX += model.WIDTH_INTERVAL * model.XOriginDirection;
    model.CurrentOriginY += model.HEIGHT_INTERVAL * model.YOriginDirection;
    model.CurrentDestinationX += model.WIDTH_INTERVAL * model.XDestinationDirection;
    model.CurrentDestinationY += model.HEIGHT_INTERVAL * model.YDestinationDirection;
    
    if (Math.abs(model.CurrentOriginX - model.UpperRightX) < 5 && Math.abs(model.CurrentOriginY - model.UpperRightY) < 5) {
        model.XOriginDirection = 0;
        model.YOriginDirection = 1;
        model.XDestinationDirection = -1;
        model.YDestinationDirection = 0;
    }
    if (Math.abs(model.CurrentOriginY - model.LowerRightY) < 5 && Math.abs(model.CurrentOriginX - model.LowerRightX) < 5) {
        model.CurrentOriginY = model.LowerRightY;
        model.XOriginDirection = -1;
        model.YOriginDirection = 0;
        model.XDestinationDirection = 0;
        model.YDestinationDirection = -1;
    }
    if (Math.abs(model.CurrentOriginX - model.LowerLeftX) < 5 && Math.abs(model.CurrentOriginY - model.LowerLeftY) < 5) {
        model.CurrentOriginX = model.LowerLeftX;
        model.XOriginDirection = 0;
        model.YOriginDirection = -1;
        model.XDestinationDirection = 1;
        model.YDestinationDirection = 0;
    }
    if (Math.abs(model.CurrentOriginY - model.UpperLeftY) < 5 && model.YOriginDirection == -1) {
        model.CurrentOriginY = model.UpperLeftY;
        model.XOriginDirection = 1;
        model.YOriginDirection = 0;
        model.XDestinationDirection = 0;
        model.YDestinationDirection = 1;
    }
        
    model.CurrentColorR = (model.CurrentColorR + model.R_INCREMENT) % 255;
    model.CurrentColorG = (model.CurrentColorG + model.G_INCREMENT) % 255;
    model.CurrentColorB = (model.CurrentColorB + model.B_INCREMENT) % 255;

    console.log(model.CurrentColorR, model.CurrentColorG, model.CurrentColorB);
}

function drawPath( initialX1, initialY1, initialX2, initialY2 ) {
    context = document.getElementById("displayArea").getContext('2d');

    context.beginPath();
    context.moveTo(initialX1, initialY1);
    context.lineTo(initialX2, initialY2);

    context.strokeStyle = "rgb(" + model.CurrentColorR + ","
        + model.CurrentColorG + "," +
        model.CurrentColorB + ")";
    context.stroke();
    context.closePath();
}

function animate() {
    drawPath(model.CurrentOriginX, model.CurrentOriginY, model.CurrentDestinationX, model.CurrentDestinationY);
    updateVariables();

        setTimeout(animate, model.TIME_INTERVAL);
}

$(document).ready(
  function () {

      model = { YDestinationDirection: 1, XOriginDirection: 1, YOriginDirection: 0, XDestinationDirection: 0 };
        
      var gridCanvas = document.getElementById("displayArea");
      if (gridCanvas.getContext) {

          model.TIME_INTERVAL = 10; //ms I think
          model.NUMBER_OF_INCREMENTS = 40 ;
          model.INITIAL_COLOR_R = 0;
          model.INITIAL_COLOR_G = 0;
          model.INITIAL_COLOR_B = 0;
          model.CurrentColorR = model.INITIAL_COLOR_R;
          model.CurrentColorG = model.INITIAL_COLOR_G;
          model.CurrentColorB = model.INITIAL_COLOR_B;
          model.R_INCREMENT = 1;
          model.G_INCREMENT = 4;
          model.B_INCREMENT = 7;

          model.Width = gridCanvas.width;
          model.Height = gridCanvas.height;

          model.UpperLeftX = model.Width / 4;
          model.UpperLeftY = model.Height / 4;

          model.UpperRightX = model.Width * 3 / 4;
          model.UpperRightY = model.Height / 4;

          model.LowerLeftX = model.Width / 4;
          model.LowerLeftY = model.Height * 3 / 4;
          
          model.LowerRightX = model.Width * 3 / 4;
          model.LowerRightY = model.Height * 3 / 4;

          model.WIDTH_INTERVAL = (model.UpperRightX - model.UpperLeftX) / model.NUMBER_OF_INCREMENTS;
          model.HEIGHT_INTERVAL = (model.LowerLeftY - model.UpperLeftY) / model.NUMBER_OF_INCREMENTS;

          model.CurrentOriginX = model.UpperLeftX;
          model.CurrentOriginY = model.UpperLeftY;
          model.CurrentDestinationX = model.UpperRightX;
          model.CurrentDestinationY = model.UpperRightY;

          setTimeout(animate,model.TIME_INTERVAL);

      } else {
          alert("Canvas is unsupported in your browser.");
      }
  }
);