import Behavior from '../Core/Behavior';
import Easing from '../utils/easing';

export default class Popup extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.transform = this.gameObject.getComponent("Transform");

		// target values
		this.startHeight = this.transform.height * 0.6;
		this.dH = this.transform.height * 0.4;

		this.startY = this.targetY + this.targetHeight/2;
		this.targetY = this.transform.y;
		this.dY = this.targetHeight / 2;

		this.timeElapsed = 0;
		this.duration = 500;
	}

	update(dt){
		this.timeElapsed += dt;
		if(this.timeElapsed < this.duration) {
			this.transform.height = Easing.easeInOut(this.timeElapsed, this.startHeight, this.dH, this.duration);
			//this.transform.y = this.easeIn(this.timeElapsed, this.startY, -this.dY, this.duration);
		}
	}



}