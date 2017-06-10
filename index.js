//画布大小
var app = new PIXI.Application(1000,1000,{backgroundColor:0x99cc99});
//html document 文档
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048 Game!');
basicText.x = 30;
basicText.y = 90;

app.stage.addChild(basicText);
