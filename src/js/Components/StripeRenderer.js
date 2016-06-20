// RectangleRenderer 
import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';

export default class StripeRenderer extends Behavior {
	constructor(gameObject, color="black"){
		super(gameObject);
		this.transform = this.gameObject.getComponent("Transform");
		this.bounds = this.transform.bounds;
		this.color = color;

		this.theta = Math.PI / 4;
		this.dy = 36;
		this.tanTheta = Math.tan(this.theta);
		this.offsetY = 0;
	}

	update(dt) {
		let ctx = Graphics.ctx;

		ctx.save();
		//ctx.translate(this.transform.x, this.transform.y);
		//ctx.rotate(this.transform.rotation*Math.PI/180);
	
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 1;
		ctx.strokeRect(
			this.transform.bounds.topLeft.x,
			this.transform.bounds.topLeft.y, 
			this.transform.width, 
			this.transform.height
		);

		var x0 = this.transform.x - this.transform.width/2;
		var y0 = this.transform.y - this.transform.height/2 - this.offsetY;
		var x1, y1, y2, x2, ddx, ddy;

		ctx.lineWidth = 1;

		for(var i=1; i <= 200; i++){
			x1 = x0;
			y1 = y0 + i * this.dy;
			x2 = x0 + ( this.tanTheta * i * this.dy);
			y2 = y0;

			// right x exceeded
			ddx = x2 - this.transform.bounds.topRight.x;
			if(ddx > 0){
				y2 = y0 + ( ddx / this.tanTheta );
				x2 = this.transform.bounds.topRight.x;
			}

			// bottom y exceeded
			ddy = y1 - (y0 + this.transform.height);

			// lines are not in rect anymore
			if(ddy >= this.transform.width/this.tanTheta){
				break;
			}

			if(ddy > 0){
				x1 = x0 + (this.tanTheta * ddy);
				y1 = y0 + this.transform.height;
			}

			Graphics.line({x: x1, y: y1},
						  {x: x2, y: y2},
				  		  this.color);

			//this.offsetY += 0.1;
		}

/*
		ctx.beginPath();
		ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
*/	
		ctx.restore();
	}
}
