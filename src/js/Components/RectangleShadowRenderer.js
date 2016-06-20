import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';

export default class RectangleShadowRenderer extends Behavior {
	constructor(gameObject, color="black"){
		super(gameObject);
		this.transform = this.gameObject.getComponent("Transform");
		this.color = color;
	}

	update(dt) {
		let ctx = Graphics.ctx;

		ctx.save();

		ctx.translate(this.transform.x, this.transform.y);
		ctx.rotate(this.transform.rotation*Math.PI/180);

		ctx.fillStyle = "magenta";
		ctx.fillRect(-this.transform.width/2 -1.6*this.transform.velocity.x, 
					 -this.transform.height/2-1.6*this.transform.velocity.y, this.transform.width, this.transform.height);

		ctx.fillStyle = "green";
		ctx.fillRect(-this.transform.width/2 -1.2*this.transform.velocity.x, 
					 -this.transform.height/2-1.2*this.transform.velocity.y, this.transform.width, this.transform.height);

		ctx.fillStyle = "blue";
		ctx.fillRect(-this.transform.width/2 -0.8*this.transform.velocity.x, 
					 -this.transform.height/2-0.8*this.transform.velocity.y, this.transform.width, this.transform.height);

		ctx.fillStyle = "orange";
		ctx.fillRect(-this.transform.width/2 -0.4*this.transform.velocity.x, 
					 -this.transform.height/2-0.4*this.transform.velocity.y, this.transform.width, this.transform.height);

		ctx.fillStyle = this.color;
		ctx.fillRect(-this.transform.width/2, -this.transform.height/2, this.transform.width, this.transform.height);

				ctx.beginPath();
		ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();

		ctx.restore();
	}
}
