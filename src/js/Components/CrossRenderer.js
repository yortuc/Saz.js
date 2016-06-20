import Behavior from '../Core/Behavior';
import Input from '../utils/input';
import Graphics from '../utils/graphics';

export default class CrossRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		data = data || {};
		this.maxDistance = data.maxDistance || 580;
		this.maxRadius = data.maxRadius || 40;
		this.currentDistance = 0;
		this.inRange = false;

		this.shooter = this.gameObject.getComponent("Shooter");
	}

	update(dt) {
		
		var mouseDown = Input.getMouseDown();
		if( mouseDown ){

			console.log("im mouse. and im down.");

			this.camera = this.gameObject.parent.getComponent("Camera");
			this.transform = this.gameObject.getComponent("Transform");

			/// get corrected mouse position and store as first point
		    let rect = Graphics.canvas.getBoundingClientRect();
		    let x1 = mouseDown.clientX - rect.left + this.camera.transform.x;
		    let y1 = mouseDown.clientY - rect.top + this.camera.transform.y;  

		    let dx = Math.abs(x1-this.transform.x);
		    let dy = Math.abs(y1-this.transform.y);
		    
		    this.currentDistance = Math.sqrt( dx*dx + dy*dy );
		    this.inRange = this.currentDistance < this.maxDistance;

			let ctx = Graphics.ctx;

			ctx.save();

			ctx.beginPath();
			var r = 20 + this.maxRadius - (this.currentDistance * (this.maxRadius - 5) / this.maxDistance);
			console.log( this.currentDistance,r);

	      	ctx.arc(x1 , y1, r, 0, 2 * Math.PI, false);

	      	ctx.lineWidth = 3;
	      	ctx.strokeStyle = this.inRange ? '#f33' : "#ddd";
	      	ctx.stroke();

	      	if(this.inRange){
	      		//ctx.beginPath();
				//ctx.moveTo(this.transform.x, this.transform.y);
				//ctx.lineTo(x1,y1);
				//ctx.lineWidth = 1;
				//ctx.stroke();

				this.shooter.shoot(1, {x: x1, y:y1});
	      	}

	      	ctx.restore();


		}

	}

}


