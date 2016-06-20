import Behavior from '../Core/Behavior';

export default class RaycastController extends Behavior {

	constructor(gameObject, data){
		super(gameObject);

		data = data || {};

		// props
		this.skinWidth = data.skinWidth || 0.015;
		this.horizontalRayCount = data.horizontalRayCount || 8;
		this.horizontalRaySpacing = null;
		this.verticalRaySpacing = null;
		this.verticalRayCount = data.verticalRayCount || 8;
		this.verticalRaySpacing = null;
		this.raycastOrigins = null;
		this.debugDraw = false;

		// private
		this.transform = this.gameObject.getComponent("Transform");
	}

	updateRaycastOrigins() {
		this.raycastOrigins = this.transform.bounds;
	}

	computeRaySpacing(){
		this.verticalRaySpacing = (this.transform.width - 2*this.skinWidth) / (this.verticalRayCount-1);
		this.horizontalRaySpacing = (this.transform.height - 2*this.skinWidth) / (this.horizontalRayCount-1);
		console.log(this.horizontalRaySpacing, this.verticalRaySpacing);
	}
}