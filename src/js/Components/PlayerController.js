import Graphics from '../utils/graphics';
import Geometry from '../utils/geometry';
import Input from '../utils/input';
import MessageHub from '../utils/messageHub';

import Behavior from '../Core/Behavior';


export default class PlayerController extends Behavior {
	
	constructor(gameObject, data){
		super(gameObject);
		
		this.controller2D = this.gameObject.getComponent("Controller2D");
		this.transform = this.gameObject.getComponent("Transform");
		this.shooter = this.gameObject.getComponent("Shooter");
		//this.sprite = this.gameObject.getComponent("SpriteSheetRenderer");

		this.moveSpeed = data.moveSpeed || 6;
		this.jumpHeight = data.jumpHeight || 2;
		this.timeToJumpApex = data.timeToJumpApex || 0.4;

		this.gravity = (2 * this.jumpHeight) / Math.pow (this.timeToJumpApex, 2);
		this.jumpVelocity = -1 * Math.abs(this.gravity) * this.timeToJumpApex;

		this.direction = 1;
	}

	update(dt){
		// jump
		if (Input.getKeyDown("space") && ( this.controller2D.collisions.below || this.controller2D.collisions.right) ) {
			// MessageHub.emit("player_jump", "event: player jumped");
			this.transform.velocity.y = this.jumpVelocity;
		}

		// horizontal movement
		this.transform.velocity.x = Input.getAxis("horizontal").x * this.moveSpeed;

		// update player direction
		if(this.transform.velocity.x !== 0){
			this.direction = this.transform.velocity.x > 0 ? 1 : -1;
		}
	}
}