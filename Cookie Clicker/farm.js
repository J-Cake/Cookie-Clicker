function farm(tier) {
    this.tier = tier;
    this.rate = tier * 50;
    
    this.update = function() {
        if (timeSincePageLoad % this.rate === 0) {
            addCookie(1);
        }
    };
}

//general Purpose JavaScript
function addCookie(num) {
  score += num;
  updateScore();
}

function updateScore() {
    if (document.querySelector("#indicator").innerHTML != score) {
        document.querySelector("#indicator").innerHTML = score;
    }
    
    document.querySelector("#indicator").innerHTML = score + '<svg class="svg" width="100" height="100"><ellipse rx=50 ry=50 cx=50 cy=50 fill="#CD853F"/><ellipse rx=5 ry=5 cx=25 cy=25 fill="#8B4513"/><ellipse rx=5 ry=5 cx=52 cy=72 fill="#8B4513"/><ellipse rx=5 ry=5 cx=53 cy=40 fill="#8B4513"/><ellipse rx=5 ry=5 cx=35 cy=57 fill="#8B4513"/><ellipse rx=5 ry=5 cx=68 cy=56 fill="#8B4513"/><ellipse rx=5 ry=5 cx=69 cy=21 fill="#8B4513"/><ellipse rx=5 ry=5 cx=25 cy=75 fill="#8B4513"/><ellipse rx=5 ry=5 cx=52 cy=72 fill="#8B4513"/></svg>';
}

var pressed = false;

var cookiesPerSecond = [];
var cookies = 0;

window.addEventListener("keypress", function (e) {
    var keyCode = e.which;
    if (keyCode == 32 && !paused) {
        if (pressed === false) {
            addCookie(1);
            pressed = true;
        }
    }
    if (passedTime % 1000 === 0) {
        cookiesPerSecond.push(cookies);
        cookies = 0;
        findAverageCookieSpeed();
    }
}, false);

function findAverageCookieSpeed() {
    var speed = 0;
    for (var i = 0; i < cookiesPerSecond.length; i++) {
        speed += cookiesPerSecond[i];
    }
    speed /= cookiesPerSecond.length;
    return speed;
}

window.addEventListener("keyup", function() {
    pressed = false;
    updateScore();
}, false);

var farms = [];


function addFarm(tier) {
    if (score - (6 - tier) * 1000 > 0) {
        farms.push(new farm(tier));
        score -= (6 - tier) * 1000;
        //addGraphicalFarm(tier);
    } else {
        Alert("Insuffient Cookies!", "There aren't enough Cookies Yet!");
    }
}

function sellFarm(tier) {
    doUpdateCycle();
    for (var i = 0; i < farms.length; i++) {
        if (farms[i].tier == tier) {
            farms.splice(i, 1);
            //removeGraphicalFarm(tier);
            break;
        }
    }
    score += (6 - tier) * 1000;
    updateScore();
}

var timeSincePageLoad = 0;
setInterval(function() {
    timeSincePageLoad += 10;
}, 10);
