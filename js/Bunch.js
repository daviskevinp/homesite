/// <reference path="jquery.d.ts" />
var Box = (function () {
    function Box(ordinal) {
        this.index = ordinal;
        this.xPos = ordinal % 3;
        this.yPos = Math.floor(ordinal / 3);
    }
    Box.prototype.flip = function () {
        this.isOn = !(this.isOn);
    };
    return Box;
})();

function setState(element, onOffSwitch) {
    if (onOffSwitch) {
        element.attr("style", "background-color:green;");
    } else {
        element.attr("style", "background-color:red;");
    }
}

function userHasWon(boxes) {
    for (var index = 0; index < 9; index++) {
        if (!boxes[index].isOn) {
            return false;
        }
    }
    return true;
}

window.onload = function () {
    var myBoxes = new Array();
    numClicks = 0;

    for (var index = 0; index < 9; index++) {
        myBoxes.push(new Box(index));
    }

    $("#controls").click(function (event) {
        for (var index = 0; index < 9; index++) {
            myBoxes[index].isOn = false;
            setState($("#" + index), false);
        }

        numClicks = 0;
        $("#countNumber").text(numClicks);
        $("#success").hide();
        $("#controls").hide();
    });

    $("td").click(function (event) {
        var clickedId = $(this).attr("id");

        var clickedBox = myBoxes[clickedId];
        clickedBox.flip();
        setState($(this), clickedBox.isOn);

        $("#countNumber").text(++numClicks);

        var anotherId;

        if (clickedBox.xPos != 0) {
            anotherId = parseInt(clickedId) - 1;
            var currentBox = myBoxes[anotherId.toString()];
            currentBox.flip();
            setState($("#" + anotherId), currentBox.isOn);
        }

        if (clickedBox.xPos != 2) {
            anotherId = parseInt(clickedId) + 1;
            if (anotherId >= 0 && anotherId < 9) {
                var currentBox = myBoxes[anotherId.toString()];
                currentBox.flip();
                setState($("#" + anotherId), currentBox.isOn);
            }
        }

        if (clickedBox.yPos != 0) {
            anotherId = parseInt(clickedId) - 3;
            if (anotherId >= 0 && anotherId < 9) {
                var currentBox = myBoxes[anotherId.toString()];
                currentBox.flip();
                setState($("#" + anotherId), currentBox.isOn);
            }
        }

        if (clickedBox.yPos != 2) {
            anotherId = parseInt(clickedId) + 3;
            if (anotherId >= 0 && anotherId < 9) {
                var currentBox = myBoxes[anotherId.toString()];
                currentBox.flip();
                setState($("#" + anotherId), currentBox.isOn);
            }
        }

        if (userHasWon(myBoxes)) {
            $("#success").show();
            $("#controls").show();
        }
    });
};
