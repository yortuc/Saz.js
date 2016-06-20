import Behavior from '../Core/Behavior';
import Easing from '../utils/easing';

export default class Camera extends Behavior {
	constructor(gameObject, data){
		super(gameObject);
		this.transform = data;

		//this.elapsedTime = 0;
	}

	update(dt) {
		//
	}

	shake(){
		// t: current time, b: begInnIng value, c: change In value, d: duration

		// Easing.easeInOut(this.elapsedTime, this.transform.x, )
	}
}
