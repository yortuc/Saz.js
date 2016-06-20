import Behavior from '../Core/Behavior';

export default class CameraFollow extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.targetTransform = this.gameObject.getComponent("Transform");
		this.camera = data.camera;
	}

	update(dt) {
		this.camera.transform.x = (this.targetTransform.x - this.camera.transform.width/2);


		if(this.targetTransform.y - this.camera.transform.y < 200) {
			this.camera.transform.y = this.targetTransform.y + 200;
		}
		else{
			this.camera.transform.y = this.targetTransform.y + 200 - this.camera.transform.height;
		}

	}
}
