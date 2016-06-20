import Geometry from '../utils/geometry';
import RaycastController from './RaycastController';
import Graphics from '../utils/graphics'; 

// extends RaycastController
export default class Controller2D extends RaycastController {
	
	constructor(gameObject, data){
		super(gameObject, data);

		data = data || {};

		// props
		this.moveSpeed = data.moveSpeed || 6;
		this.jumpHeight = data.jumpHeight || 2;
		this.timeToJumpApex = data.timeToJumpApex || 0.4;
		this.accelerationTimeAirborne = data.accelerationTimeAirborne || 0.2;
		this.accelerationTimeGrounded = data.accelerationTimeGrounded || 0.1;
		this.quadTree = data.sceneQuadTree;
		this.wallFriction = data.wallFriction || 1;

		// private
		this.gravity = (2 * this.jumpHeight) / Math.pow (this.timeToJumpApex, 2);
		this.jumpVelocity = -1 * Math.abs(this.gravity) * this.timeToJumpApex;
		this.transform = this.gameObject.getComponent("Transform");

		this.collisions = {
			reset: function(){ 
				this.above = this.below = false, 
				this.right = this.left = false
			},
			above: false, below: false,
			left: false, right: false
		}
		
		this.computeRaySpacing();
		this.updateRaycastOrigins();
	}

	update (dt){
		// update raycast source points on the gameobject
		this.updateRaycastOrigins();
		
		// gravity effect on vertical velocity
		this.transform.velocity.y += this.gravity * dt/1000;

		// move the player
		this.Move(this.transform.velocity);
	}

	// @param velocity : V2
	Move(velocity) {

		this.collisions.reset();
		
		if ( velocity.x != 0 ) {
			this._horizontalCollisions (/*ref*/ velocity);
		}

		if ( velocity.y != 0 ) {
			this._verticalCollisions (/*ref*/ velocity);
		}

		this.transform.Translate (velocity);
	}

	// @param ref velocity : V2
	_verticalCollisions(velocity) {
		let directionY = velocity.y > 0 ? 1: -1;
		let rayLength = Math.abs (velocity.y) + this.skinWidth;

		for (let i = 0; i < this.verticalRayCount; i ++) {

			let rayOrigin = {
				x: this.raycastOrigins.bottomLeft.x + (this.verticalRaySpacing * i) + this.transform.velocity.x, 
				y: directionY > 0 ? this.raycastOrigins.bottomLeft.y : this.raycastOrigins.topLeft.y
			};

			let objectsToCollide = this.quadTree ? this.quadTree.filterObjects( this.gameObject ) : 
												   this.gameObject.getCollidibleSiblings();

			// console.log("collidible count", objectsToCollide.length);


			let hit = Geometry.RaycastY(
							  objectsToCollide,
							  rayOrigin, 
							  directionY, 
							  rayLength);

			this.debugDraw && Graphics.line(rayOrigin, {x: rayOrigin.x, y: rayOrigin.y + directionY * rayLength*10 }, "green");

			if (hit) {
				velocity.y = (hit.distance - this.skinWidth) * directionY;
				rayLength = hit.distance;

				this.collisions.below = directionY === 1;
				this.collisions.above = directionY === -1;
			}
		}
	}
 
	// @param ref velocity : V2
	_horizontalCollisions(velocity) {
		let directionX = Math.sign (velocity.x);
		let rayLength = Math.abs (velocity.x) + this.skinWidth;

		for (let i = 0; i < this.horizontalRayCount; i ++) {

			let rayOrigin = {
				x: directionX > 0 ? this.raycastOrigins.topRight.x : this.raycastOrigins.topLeft.x, 
				y: this.raycastOrigins.topLeft.y + (this.horizontalRaySpacing * i)
			};

			let objectsToCollide = this.quadTree ? this.quadTree.filterObjects( this.gameObject ) : 
												   this.gameObject.getCollidibleSiblings();

			let hit = Geometry.RaycastX(
							  objectsToCollide,
							  rayOrigin, 
							  directionX, 
							  rayLength);

			this.debugDraw && Graphics.line(rayOrigin, {x: rayOrigin.x + directionX * rayLength * 10, y: rayOrigin.y }, "green");

			if (hit) {
				velocity.x = (hit.distance - this.skinWidth) * directionX;
				console.log(velocity);

				rayLength = hit.distance;

				this.collisions.right = directionX === 1;
				this.collisions.left = directionX === -1;

				// vertical friction
				velocity.y *= this.wallFriction;
			}
		}
	}
}