import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';

export default class PositionTextRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.goVelcity = this.gameObject.getComponent("Transform");
		this.label = data.label || "";
		this.x = data.x;
		this.y = data.y;
	}

	update(dt) {
		let ctx = Graphics.ctx;
		let text = this.label + " (x: " + this.goVelcity.x.toFixed(4).toString() + ", y: " + this.goVelcity.y.toFixed(4).toString() + ")";
		
		ctx.save();
		ctx.font = "16px Arial";
		ctx.fillStyle="green";
		ctx.fillText(text, this.x, this.y);
		ctx.restore();
	}
}