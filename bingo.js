var numbers;
var remaining;
var game = -1;
var min = 1;
var max = 90;
var playingAutomatic = false;
var intervalFunction;
var intervalTime;

resetButton();

function nextManualButton() {
	toDraw();
}

function playButton() {
	document.getElementById("nextManualButtonId").disabled = true;
	document.getElementById("resetButton1Id").disabled = true;
	document.getElementById("resetButton2Id").disabled = true;
	document.getElementById("playButtonId").disabled = true;
	document.getElementById("listNumbersButtonId").disabled = true;

	var timeElement = document.getElementById("selectTimeId");
	var intervalTime = 1000 * timeElement.options[timeElement.selectedIndex].value;
	intervalFunction = setInterval(function() { toDraw(); }, intervalTime);
	playingAutomatic = true;
}

function pauseButton() {
	document.getElementById("nextManualButtonId").disabled = false;
	document.getElementById("resetButton1Id").disabled = false;
	document.getElementById("resetButton2Id").disabled = false;
	document.getElementById("playButtonId").disabled = false;
	document.getElementById("listNumbersButtonId").disabled = false;

	if (playingAutomatic) 
		{
			clearInterval(intervalFunction);
			playingAutomatic = false;
		}
}

function resetButton() {
	reset();
	document.getElementById("numberId").innerHTML = "--";
	document.getElementById("nextManualButtonId").disabled = false;
	document.getElementById("resetButton1Id").disabled = false;
	document.getElementById("resetButton2Id").disabled = false;
	document.getElementById("playButtonId").disabled = false;
	document.getElementById("pauseButtonId").disabled = false;
	document.getElementById("listNumbersButtonId").disabled = false;
	game = game + 1;
	document.getElementById("gameId").innerHTML = game;
	document.getElementById("remainingId").innerHTML = remaining;

	clearList();
}

function listNumbersButton() {
	clearList();
	var sel = document.getElementById('selectId');
	for(var i = min; i <= max; i++) {
		if (numbers[i] == 0) {
			var opt = document.createElement('option');
			opt.innerHTML = i;
			opt.value = i;
			sel.appendChild(opt);
		}
	}
}

function reset() {
	remaining = max;
	numbers = [];
	for (var i = min; i <= max; i++)
		numbers[i] = 0;

	if (playingAutomatic) {
		clearInterval(intervalFunction);
		playingAutomatic = false;
	}
}

function toDraw() {
	do {
		var n = randomIntFromInterval(min, max);
	} 
	while(numbers[n] == 1);

	numbers[n] = 1;
	document.getElementById("numberId").innerHTML = n;
	remaining = remaining - 1;
	document.getElementById("remainingId").innerHTML = remaining;

	if (remaining == 0) {
		document.getElementById("nextManualButtonId").disabled = true;
		document.getElementById("playButtonId").disabled = true;
		document.getElementById("listNumbersButtonId").disabled = true;
		document.getElementById("pauseButtonId").disabled = true;
		document.getElementById("resetButton1Id").disabled = false;
		document.getElementById("resetButton2Id").disabled = false;

		if (playingAutomatic) clearInterval(intervalFunction);
	}
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function clearList() {
	var sel = document.getElementById("selectId");
	while (sel.length > 0) {
        sel.remove(sel.length-1);
    }
}

document.addEventListener('keydown', function(event) {
	if(event.keyCode == 39) {
        if (playingAutomatic == false) toDraw();
    }
});