//画布大小

var app = new PIXI.Application(screen.width,screen.height,{backgroundColor:0x99cc99});
//html document 文档
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048 Game!');

basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 4;

app.stage.addChild(basicText);

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
