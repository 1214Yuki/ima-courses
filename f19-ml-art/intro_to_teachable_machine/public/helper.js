Array.prototype.diff = function (arr) {
    return this.filter(function (i) {
        return arr.indexOf(i) < 0;
    });
};

Array.prototype.in_array = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === value) {
            return true;
        }
    }
    return false;
};

function drawIdentifier() {
    if (labelIdentifier === true) {
        push();
        noStroke();
        labelBgColor.setAlpha(128);
        fill(labelBgColor);
        rect(16, height - 26, 40, 20, 10);
        pop();

        // Change identifier location
        if (position !== 0) {
            push();
            noStroke();
            fill(color(labelColor()));
            if (position == 1) {
                // Left
                ellipse(26, height - 16, 18, 18);
            } else if (position == 2) {
                // Center
                ellipse(36, height - 16, 18, 18);
            } else if (position == 3) {
                // Right
                ellipse(46, height - 16, 18, 18);
            }
            pop();
        }
    } else {

    }
}

function labelColor() {
    if (mouthOpen) {
        return '#ed0cef';
    } else if (!mouthOpen) {
        return '#8105d8';
    }
}

function drawEatingArea() {
    if (eatingAreaIdentifier == true) {
        push();
        areaColor = color('#ed0cef');
        areaColor.setAlpha(16);
        fill(areaColor);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, height / 2, width, eatingAreaH + 20);
        pop();
    }
}