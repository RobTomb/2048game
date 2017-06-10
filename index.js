

var app = new PIXI.Application(screen.width,screen.height,{backgroundColor:0x99cc99});
document.body.appendChild(app.view);

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

var width =  app.renderer.width;

var grid = [];
for(var i = 0 ; i < 4 ; i++ ){
	grid[i] = [0,0,0,0];
} 


function genernetNumberRandom(){
	return Math.floor(Math.random() * 4);
}
var rowIndex = genernetNumberRandom();
var columIndex = genernetNumberRandom();
//var number = genernetNumberRandom();
var number = 2;
grid[rowIndex][columIndex] = number;

for(var i = 0 ; i < 4 ; i ++ ){
	for(var j = 0 ; j < 4 ; j++){
		drawCell(i,j);
	}
}

//drawCell(rowIndex,columIndex);

function drawCell(x,y){

	var color;

	if(grid[x][y] === 2){
		color = 0xd9bf77;
	}else{
		color = 0xffffcc;
	}

	var showNumber = new PIXI.Text(grid[x][y]);
	showNumber.anchor.set(0.5);
	showNumber.x = app.renderer.width/8+y*width/5-5+width/10;
	showNumber.y = app.renderer.height/8*3+x*width/5+width/10;

	var graphics = new PIXI.Graphics();
	graphics.beginFill(color, 1);
	graphics.lineStyle(3, 0x99cc99, 1);
	graphics.drawRect(app.renderer.width/8+y*width/5-5,app.renderer.height/8*3+x*width/5 , width /5,width/5);

	app.stage.addChild(graphics);
	if(grid[x][y] != 0 )
		app.stage.addChild(showNumber);	
}

document.addEventListener("keydown",function(event){
	if(event.key === 'ArrowRight')
		console.log(event.key);
});

