import Geometry from './geometry';

export default {
	init: function(width, height){
		this.width = width;
		this.height = height;

		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");

		this.debug = true;
	},

	clearScene: function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	line: function (p1, p2, color) {
		this.ctx.save();
		this.ctx.strokeStyle = color || "red";
		this.ctx.beginPath();
		this.ctx.moveTo(p1.x,p1.y);
		this.ctx.lineTo(p2.x,p2.y);
		this.ctx.stroke();
		this.ctx.restore();
	},

	// p top left, p bottom right
	rect: function(position, size, color) {
		this.ctx.save();
		this.ctx.translate(position.x, position.y);
		this.ctx.fillStyle = color || "black";
		this.ctx.fillRect(0,0, size.width, size.height);
		this.ctx.restore();
	},

	debugLine: function(p1, p2, color="green") {
		if(!this.debug) return;
		this.line(p1, p2, color);
	}
}