

var app = new PIXI.Application(screen.width,screen.height,{backgroundColor:0x99cc99});
document.body.appendChild(app.view);

var maxCount = 16;
var currentCount = 0;

var score = 0;


var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});
var richText = new PIXI.Text('2048 Game!', style);
richText.anchor.set(0.5);
richText.x = app.renderer.width / 2;
richText.y = app.renderer.height / 4;
app.stage.addChild(richText);

var scoreText = new PIXI.Text('Score: ' + score, {
    fontSize: 48
});
scoreText.anchor.set(0.5);
scoreText.x = app.renderer.width / 2;
scoreText.y = app.renderer.height / 10 * 9;
app.stage.addChild(scoreText);


var width =  app.renderer.width;

var grid = [];
for(var i = 0 ; i < 4 ; i++ ){
	grid[i] = [0,0,0,0];
} 


function genernetNumberRandom(){
	return Math.floor(Math.random() * 4);
}
function addRandomCell(){
	var rowIndex = genernetNumberRandom();
	var columIndex = genernetNumberRandom();
	var number = 2;
	while(grid[rowIndex][columIndex] !== 0 ){
		rowIndex = genernetNumberRandom();
		columIndex = genernetNumberRandom();
	}
	grid[rowIndex][columIndex] = number;
	
}

function flushUI(){
	for(var i = 0 ; i < 4 ; i ++ ){
		for(var j = 0 ; j < 4 ; j++){
			drawCell(i,j);
		}
	}
     scoreText.text = 'Score: ' + score;
}
flushUI();



function drawCell(x,y){

	var showNumber = new PIXI.Text(grid[x][y]);
	showNumber.anchor.set(0.5);
	showNumber.x = app.renderer.width/8+y*width/5-5+width/10;
	showNumber.y = app.renderer.height/8*3+x*width/5+width/10;

	var graphics = new PIXI.Graphics();
	graphics.beginFill(getColorByNumber(grid[x][y]), 1);
	graphics.lineStyle(3, 0x99cc99, 1);
	graphics.drawRect(app.renderer.width/8+y*width/5-5,app.renderer.height/8*3+x*width/5 , width /5,width/5);

	app.stage.addChild(graphics);

	if(grid[x][y] !== 0 )
		app.stage.addChild(showNumber);	
}





function moveCellToRight() {
        var isChanged = false;
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;
                    var isChanged = true;

            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex+ 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;
                 score += grid[rowIndex][currentIndex + 1];

                isChanged = true;

                currentCount--;
            }

        }
    }
    return isChanged;
}

function getColorByNumber(number){
	var colorValue = {
		2:0xcc9966,
		4:0xffff99,
		0:0xffffcc,
		8:0x99cc99
	}
	var color = colorValue[number];
	if(colorValue[number] === undefined)
		color = 0xffffcc;
	return color;
}



addRandomCell();
addRandomCell();
flushUI();
/*
document.addEventListener("keydown",function(event){
	if(event.key === 'ArrowRight')
	{
		moveCellToRight();
		addRandomCell();
		flushUI();
	}

    if (event.key === 'ArrowUp') {
        rotateArray(1);
        moveCellToRight();
        rotateArray(3);
        addRandomCell();
        flushUI();
    }

    if (event.key === 'ArrowLeft') {
        rotateArray(2);
        moveCellToRight();
        rotateArray(2);
        addRandomCell();
        flushUI();
    }

    if (event.key === 'ArrowDown') {
        rotateArray(3);
        moveCellToRight();
        rotateArray(1);
        addRandomCell();
        flushUI();
    }
});
*/
var onToRightEventHandler = function () {
    var isChanged = moveCellToRight();
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToDownEventHandler = function () {
    rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToLeftEventHandler = function () {
    rotateArray(2);
    var isChanged = moveCellToRight();
    rotateArray(2);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToUpEventHandler = function () {
    rotateArray(1);
    var isChanged = moveCellToRight();
    rotateArray(3);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        onToRightEventHandler();
    }

    if (event.key === 'ArrowUp') {
        onToUpEventHandler();
    }

    if (event.key === 'ArrowLeft') {
        onToLeftEventHandler();
    }

    if (event.key === 'ArrowDown') {
        onToDownEventHandler();
    }
});

var hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});
hammertime.on('swiperight', function() {
    onToRightEventHandler();
});
hammertime.on('swipeup', function () {
    onToUpEventHandler();
});
hammertime.on('swipeleft', function () {
    onToLeftEventHandler();
});
hammertime.on('swipedown', function () {
    onToDownEventHandler();
});

function moveCellToRight() {
        var isChanged = false;
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;
                    var isChanged = true;

            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex+ 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;
                 score += grid[rowIndex][currentIndex + 1];

                isChanged = true;

                currentCount--;
            }

        }
    }
    return isChanged;
}

function findTheFirstRightCell(rowIndex, columnIndex) {
    for (let i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }
    return -1;
}

function rotateArray(rotateCount = 1) {
    for (var i = 0 ; i < rotateCount; i ++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map((row, rowIndex) => {
            return row.map((item, columnIndex) => {
                return array[3 - columnIndex][rowIndex];
            })
        })
    }
}

function checkGameOver() {
    if (currentCount !== maxCount) return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i-1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i+1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }

    return true;
}