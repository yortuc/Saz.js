import Behavior from '../Core/Behavior';
import Easing from '../utils/easing';
import Graphics from '../utils/graphics';

export default class SpriteRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);
		this.size = data.size || 36;
		this.transform = this.gameObject.getComponent("Transform");
		this.spriteSheet = data.spriteSheet;
	}

	update(dt) {
		
		if(!this.spriteSheet) return;

		let ctx = Graphics.ctx;

		ctx.save();

		ctx.translate(this.transform.x - this.transform.width/2, this.transform.y - this.transform.height/2); 

		ctx.drawImage(this.spriteSheet,0,0,this.size,this.size);

		if(this.transform.debug){
			ctx.fillStyle= "green";
			ctx.fillRect(0,0,this.size,this.size);
		}

		ctx.restore();
	}

}
