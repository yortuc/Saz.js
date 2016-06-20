export default class Behavior {
	constructor(gameObject) {

		if(!gameObject) return;
		
		this.gameObject = gameObject;
		this.gameObject.addComponent(this);
	}
}