// CircleRenderer 
import Graphics from '../utils/graphics';

export default class CircleRenderer{
	constructor(color="black"){
		this.color = color;
	}
	update(dt) {
		var transform = this.gameObject.getComponent("Transform");
		
		let ctx = Graphics.ctx;
		ctx.beginPath();
      	ctx.arc(transform.x, transform.y, transform.width, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
      	ctx.fill();
      	ctx.lineWidth = 1;
      	ctx.strokeStyle = '#333';
      	ctx.stroke();
	}
}
