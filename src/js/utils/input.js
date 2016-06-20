// input helper

export default {

	axes: {
		horizontal: 0,
		vertical: 0
	},

	keys: {},
	mouse: null,
	isDown: false,

	init: function(){

		window.onkeydown = function(e){
			this.keys[e.keyCode] = 1;
		}.bind(this);

		window.onkeyup = function(e){
			this.keys[e.keyCode] = 0;
		}.bind(this);

		var canvas = document.getElementById('canvas');

		canvas.onmousedown = function(e){
			this.isDown = true;
			this.mouse = e;
		}.bind(this);

		canvas.onmousemove = function(e){
			if(this.isDown){
				this.mouse = e;	
			}
		}.bind(this);

		canvas.onmouseup = function(e){
			this.isDown = false;
			this.mouse = null;
		}.bind(this);
	},

	getAxis: function(axis){
		if(axis === "horizontal"){
			if(this.keys[37] > 0 || this.keys[65]) return {x:-1, y: 0};
			if(this.keys[39] > 0 || this.keys[68]) return {x: 1, y: 0};

			return {x:0 , y:0 }
		}
	},

	getKeyDown: function(key){
		if(key === "space") {
			return this.keys[32] > 0 || this.keys[87] > 0;
		}
		if(key === "s"){
			return this.keys[83] > 0;
		}
	},

	getMouseDown: function(){
		return this.mouse
	}
}