import Geometry from '../utils/geometry';
import Graphics from '../utils/graphics';

const V_RAY_COUNT = 8;
const H_RAY_COUNT = 8;
let skinWidth = 0.015;

function PhysicsSolver(state) {

	state.dynamicObjects.forEach(o=> {
		if (o.collisions.below) {
			o.velocity.y = 0;
		}

		//accelerate object
		o.velocity.y += o.acceleration.y * state.dt;

		// check collisions, update velocity
		if ( o.velocity.y != 0 ) {
			VerticalCollisions (state, o);
		}

		if (o.velocity.x != 0) {
			HorizontalCollisions(state, o);
		}

		// move object with new, safe velocity
		MoveObject(o);
	});
}

function VerticalCollisions(state, obj){
	
	let rayLength = Math.abs(obj.velocity.y) + skinWidth;
	let directionY = obj.velocity.y > 0 ? 1: -1;

	// check all objects
	let objectsToCollide = state.dynamicObjects.concat(state.grounds);

	for (let i = 0; i < V_RAY_COUNT; i++) {

		let rayOrigin = {
			x: obj.bounds.bottomLeft.x + skinWidth + (obj.raySpacing.vertical * i) /*+ obj.velocity.x*/, 
			y: directionY > 0 ? obj.bounds.bottomLeft.y - skinWidth : obj.bounds.topLeft.y + skinWidth
		};

		let hit = Geometry.RaycastY(
							  objectsToCollide,
							  rayOrigin, 
							  directionY,  
							  rayLength);

		Graphics.debugLine(rayOrigin, {x: rayOrigin.x, y: rayOrigin.y + directionY * rayLength*10 }, hit ? "red" : "green");

		if (hit) {
			obj.velocity.y = (hit.distance - skinWidth) * directionY;
			rayLength = hit.distance;

			obj.collisions.below = directionY === 1;
			obj.collisions.top = directionY === -1;
		}
	}
}

function HorizontalCollisions(state, obj){
	let rayLength = Math.abs(obj.velocity.x) + skinWidth;
	let directionX = Math.sign(obj.velocity.x);

	// check all objects
	let objectsToCollide = state.dynamicObjects.concat(state.grounds);

	for (let i = 0; i < H_RAY_COUNT; i ++) {

		let rayOrigin = {
			x: directionX > 0 ? obj.bounds.bottomRight.x - skinWidth : obj.bounds.bottomLeft.x + skinWidth, 
			y: obj.bounds.bottomLeft.y - skinWidth - (obj.raySpacing.horizontal * i) + obj.velocity.y
		};

		let hit = Geometry.RaycastX(
							  objectsToCollide,
							  rayOrigin, 
							  directionX,  
							  rayLength);

		Graphics.debugLine(rayOrigin, {x: rayOrigin.x + directionX * rayLength * 10, y: rayOrigin.y });

		if (hit) {
			obj.velocity.x = (hit.distance - skinWidth) * directionX;
			rayLength = hit.distance;
			
			obj.collisions.right = directionX === 1;
			obj.collisions.left = directionX === -1;
		}
	}
}

function MoveObject(obj) {
	obj.position.y += obj.velocity.y;
	obj.position.x += obj.velocity.x;
}

export default PhysicsSolver;