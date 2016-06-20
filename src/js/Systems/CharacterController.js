import Input from '../utils/input';

let moveSpeed = 6;
let jumpHeight = 2;
let timeToJumpApex = 0.4;

let gravity = (2 * jumpHeight) / Math.pow(timeToJumpApex, 2);
let jumpVelocity = -1 * Math.abs(gravity) * timeToJumpApex;

function CharacterController (state) {

	let player = state.dynamicObjects[0];

	// jump
	if (Input.getKeyDown("space") && player.collisions.below) {
		player.velocity.y = jumpVelocity;
	}

	// horizontal movement
	player.velocity.x = Input.getAxis("horizontal").x * moveSpeed;
}

export default CharacterController;