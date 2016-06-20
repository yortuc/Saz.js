import Behavior from '../Core/Behavior';

// General update behavior for game object

export default class Update extends Behavior {

	constructor(gameObject, updateCallBack){
		super(gameObject);
		this.updateCallBack = updateCallBack;
	}

	update(dt){
		this.updateCallBack(dt);
	}
}