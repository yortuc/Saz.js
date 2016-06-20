import PIXI from 'pixi.js';

export default {
	init: function(width, height){
		this.width = width;
		this.height = height;

		this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {backgroundColor : "#fff"});
		document.body.appendChild(this.renderer.view);

		// create the root of the scene graph
		this.stage = new PIXI.Container();
	},

	addRectangle: function(transfrom){
		// create a new graphics object
		var rect = new PIXI.Graphics();

		// set the fill
		rect.beginFill(0xFFFF00);
		 
		// set the line style to have a width of 5 and set the color to red
		rect.lineStyle(5, 0xFF0000);
		 
		// draw a rectangle
		rect.drawRect(transfrom.x, transfrom.y, transfrom.width, transfrom.height);

		this.stage.addChild(rect);

		return rect;
	},

	renderScene: function(){
		this.renderer.render( this.stage );
	},

	clearScene: function(){
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	line: function (p1, p2, color) {
		this.ctx.save();
		this.ctx.strokeStyle = color || "red";
		this.ctx.beginPath();
		this.ctx.moveTo(p1.x,p1.y);
		this.ctx.lineTo(p2.x,p2.y);
		this.ctx.stroke();
		this.ctx.restore();
	}
}