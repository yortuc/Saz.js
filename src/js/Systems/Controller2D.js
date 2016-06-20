let _jumpHeight = 2;
let _timeToJumpApex = 0.4;
let _gravity = (2 * _jumpHeight) / Math.pow (_timeToJumpApex, 2);
let _jumpVelocity = -1 * Math.abs(_gravity) * _timeToJumpApex;
let _skinWidth = 0.015;
let _verticalRayCount = 4;

function Controller2D (state) {
	state.dynamicObjects.map(o=> {
		o.velocity.y += _gravity * state.dt;
		Move(o);
	});
}

function Move(object) {
	object.colliding = [0,0,0,0];	// reset collisions

	//if ( object.velocity.x != 0 ) {
	//	object.velocity.x = _horizontalCollisions (object.velocity);
	//}

	if ( object.velocity.y != 0 ) {
		object.velocity.y = VerticalCollisions (object);
	}

	object.position.x += object.velocity.x;
	object.position.y += object.velocity.y; 
}

function VerticalCollisions(object) {

	let directionY = object.velocity.y > 0 ? 1: -1;
	let rayLength = Math.abs (object.velocity.y) + _skinWidth;

	for (let i = 0; i < _verticalRayCount; i ++) {

		let rayOrigin = {
			x: this.raycastOrigins.bottomLeft.x + (this.verticalRaySpacing * i) + this.transform.velocity.x, 
			y: directionY > 0 ? this.raycastOrigins.bottomLeft.y : this.raycastOrigins.topLeft.y
		};

		let objectsToCollide = this.quadTree ? this.quadTree.filterObjects( this.gameObject ) : 
											   this.gameObject.getCollidibleSiblings();

		console.log("collidible count", objectsToCollide.length);


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


export default Controller2D;