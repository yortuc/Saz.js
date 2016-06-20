//
// control a bulelts life.
// kills the bullet gameobject if the business comes to that point.
//
import Behavior from '../Core/Behavior';

export default class BulletController extends Behavior {
	constructor(gameObject, data){
		super(gameObject, data);
		
		data = data || {};

		this.lifeTime = data.lifeTime || 3000;
		this.elapsed = 0;
	}
	update(dt) {
		if(this.elapsed >= this.lifeTime) {
			// kill bullet
			this.gameObject.kill();
		}
		else{
			this.elapsed += dt;
		}
	}
}
