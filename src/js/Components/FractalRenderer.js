import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';

export default class FractalRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.static = data.static;
		this.color = data.color || "black";
		this.limit = data.limit || 3;
		this.rotation = 0;
	}

	updatePosition(){
		this.transform = this.gameObject.getComponent("Transform");
		this.p0 = { x: this.transform.bounds.bottomLeft.x + this.transform.width/2,
					y: this.transform.bounds.bottomLeft.y + this.transform.height/2 };

		this.p1 = { x: this.transform.bounds.topLeft.x + this.transform.width, 
					y: this.transform.bounds.topLeft.y };

		this.p2 = { x: this.transform.bounds.bottomRight.x + this.transform.width/2,
					y: this.transform.bounds.bottomRight.y + this.transform.height/2 };
	}

	sierpinski (p0,p1,p2,limit){
		if(limit > 0){
			let pA = {
					x: p0.x + (p1.x - p0.x)/2,
					y: p0.y - (p0.y - p1.y)/2
				},
				pB = {
					x: p1.x + (p2.x - p1.x)/2,
					y: p1.y - (p1.y - p2.y)/2
				},
				pC = {
					x: p0.x + (p2.x - p0.x)/2,
					y: p0.y
				};
 
			this.sierpinski(p0,pA,pC, limit-1);
			this.sierpinski(pA,p1,pB, limit-1);
			this.sierpinski(pC,pB,p2, limit-1);
		}
		else{
			this.drawTriangle(p0,p1,p2);
		}
	}

	drawTriangle(p0,p1,p2){
		let ctx = Graphics.ctx;
		ctx.moveTo( p0.x,
					p0.y );
		ctx.lineTo( p1.x, 
					p1.y );
		ctx.lineTo( p2.x,
					p2.y );
		ctx.fill(); 
	}

	update(dt) {
		this.updatePosition();
	
		let ctx = Graphics.ctx; 

		ctx.save();
		ctx.fillStyle = this.color;

		this.sierpinski(this.p0, this.p1, this.p2, this.limit);

		ctx.restore();
	}
}
