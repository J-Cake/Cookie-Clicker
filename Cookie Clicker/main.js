var paused = false;
var inSettings = 0;

function reset() {
    score = 0;
    updateScore();
    farms = [];
}

function updateFarmContainer() {
    document.querySelector("#farmContainer").innerHTML = "";
    for (var i = 0; i < farms.length; i++) {
        document.querySelector("#farmContainer").innerHTML += '<em class="Vfarm" onclick="sellFarm(' + farms[i].tier + ')"><strong>' + (6 - farms[i].tier) + '</strong></em>';
    }
}

setInterval(updateFarmContainer, 500);

//clock
var gameClock;
var passedTime = 0;
gameClockKeeper();
function gameClockKeeper() {
    if (paused === false) {
        gameClock = setInterval(doUpdateCycle, 1000 / 30); //update game 30 times per second
    } else {
        clearInterval(gameClock);
    }
}

function doUpdateCycle() {
    passedTime++;
    var len = 0;
    while(len < farms.length) {
        farms[len].update();
        len++;
    }
    if (inSettings >= 1) {
        inSettings ++;
    }
}

function togglePauseAndPlay() {
    
    var state = (document.querySelector("#papb").value == "play") ? document.querySelector("#papb").value = "pause" : document.querySelector("#papb").value = "play";
    
    (state == "pause") ? document.querySelector("#papb").firstChild.setAttribute("src", "res/play.png") : document.querySelector("#papb").firstChild.setAttribute("src", "res/pause.png");
    
    (state == "play") ? paused = false : paused = true;
    (state == 'play') ? document.querySelector("#pauseIndicator").innerHTML = "" : document.querySelector("#pauseIndicator").innerHTML = "<img src='res/pause.png'>";
    gameClockKeeper();
}

var password = "";

function settings() {
    continueToSettings();
}
function continueToSettings() {
    document.querySelector("#settingsWindow").style.display = "block";
    inSettings += 1;
}
function Alert(head, body) {
    document.querySelector("#alertBox").style.display = "block";
    document.querySelector("#head").innerHTML = head;
    document.querySelector("#body").innerHTML = body;
    
    setTimeout(function () {
        document.querySelector("#alertBox").style.display = "none";
    }, 10000);
}






