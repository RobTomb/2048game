//画布大小

var app = new PIXI.Application(screen.width,screen.height,{backgroundColor:0x99cc99});
//html document 文档
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048 Game!');

basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 4;
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


//app.stage.addChild(basicText);

var grid = [];
for(var i = 0 ; i < 4 ; i++ ){
	grid[i] = [0,0,0,0];
} 
var graphics = new PIXI.Graphics();
var width =  app.renderer.width;
// set a fill and line style
graphics.lineStyle(3, 0x99cc99, 1);
graphics.beginFill(0xffffcc, 1);
for(var i = 0 ; i < 4 ; i++ ){
	for(var j = 0 ; j < 4 ; j ++ ){
		graphics.drawRect(app.renderer.width/8+j*width/5-5,app.renderer.height/8*3+i*width/5 , width /5,width/5);
	}
}
app.stage.addChild(graphics);

function genernetNumberRandom(){
	return Math.floor(Math.random() * 4);
}
/*
var number = genernetNumberRandom();
var showNumber = PIXI.Text(number,{fontSize:15px;});

*/
var showNumber = new PIXI.Text(genernetNumberRandom());
var x = genernetNumberRandom();
var y = genernetNumberRandom();

showNumber.anchor.set(0.5);
showNumber.x = app.renderer.width/8+x*width/5-5+width/10;
showNumber.y = app.renderer.height/8*3+y*width/5+width/10;
var changeGraphics = new PIXI.Graphics();
changeGraphics.lineStyle(3,0x99cc99,1);
changeGraphics.beginFill(0xd9bf77,1);
changeGraphics.drawRect(app.renderer.width/8+x*width/5-5,app.renderer.height/8*3+y*width/5,width/5,width/5);
app.stage.addChild(changeGraphics);
app.stage.addChild(showNumber);


