import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';

export default class DashRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		data = data || {};

		this.transform = this.gameObject.getComponent("Transform");
		this.color = data.color || "black";
		this.offset = 0;
		this.expand = 2;
		
		//if(data.expand !== null){
		//	this.expand = data.expand;
		//}
	}

	update(dt) {
		let ctx = Graphics.ctx;

		ctx.save();
		
		ctx.translate(this.transform.x, this.transform.y);
		//ctx.rotate(this.transform.rotation * Math.PI/180);

		ctx.strokeStyle = this.color;
		ctx.setLineDash([4,2]);
		ctx.lineWidth = 1;
		ctx.lineDashOffset = -this.offset;
		
		ctx.strokeRect(-this.transform.width/2-this.expand,
					   -this.transform.height/2-this.expand, 
					   this.transform.width + 2*this.expand, this.transform.height + 2*this.expand);

		ctx.restore();

		this.offset++;
		if (this.offset > 16) {
			this.offset = 0;
		}
	}
}
