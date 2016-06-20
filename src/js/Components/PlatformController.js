import RaycastController from './RaycastController';
import Geometry from '../utils/geometry';
import Graphics from '../utils/graphics'; 


export default class PlatformController extends RaycastController {

	constructor(gameObject, data){
		data = data || {};
		super(gameObject, data);
		this.quadTree = data.sceneQuadTree;

		this.velocity = data.velocity || {x: 1, y: 0};
		this.collisionLayer = data.collisionLayer;

		this.computeRaySpacing();
		this.updateRaycastOrigins();
	}

	update(dt){
		this.updateRaycastOrigins();

		this.movePassengers(this.velocity);

		this.transform.Translate (this.velocity);
	}


	movePassengers(velocity){
		let movedPassengers = [];

		this._horizontalHit(velocity, movedPassengers);
		this._verticalHit(velocity, movedPassengers);

		this._verticalStand(velocity, movedPassengers);
	}

	// Passenger on top of a horizontally or downward moving platform
	_verticalStand(velocity, movedPassengers){
		let directionY = Math.sign (velocity.y);

		if (directionY === -1 || velocity.y == 0 && velocity.x != 0 ) {
			let rayLength = this.skinWidth * 2;
			
			for (let i = 0; i < this.verticalRayCount; i ++) {

				let rayOrigin = {
					x: this.raycastOrigins.bottomLeft.x + (this.verticalRaySpacing * i) + this.transform.velocity.x, 
					y: this.raycastOrigins.topLeft.y
				};

				let objectsToCollide = this.quadTree ? this.quadTree.filterObjects( this.gameObject, this.collisionLayer ) : 
												   this.gameObject.getSiblings(this.collisionLayer);

				let hit = Geometry.RaycastY(
								  objectsToCollide,
								  rayOrigin, 
								  -1, 
								  rayLength);		

				this.debugDraw && Graphics.line(rayOrigin, {x: rayOrigin.x, y: rayOrigin.y + -1 * rayLength*200 }, "green");
		
				if (hit) {
					let targetTransform = hit.targetObject.getComponent("Transform");

					if (movedPassengers.indexOf(targetTransform) === -1) {
						movedPassengers.push(targetTransform);
						
						let pushX = velocity.x;
						let pushY = velocity.y;
						
						targetTransform.Translate({x: pushX, y: pushY });
					}
				}
			}
		}
	}

	// Horizontally moving platform, detect hits on x direction
	_horizontalHit (velocity, movedPassengers) {

		let directionX = Math.sign (velocity.x);

		if (velocity.x != 0) {
			let rayLength = Math.abs(velocity.x) + this.skinWidth;
			
			for (let i = 0; i < this.horizontalRayCount; i ++) {
				
				let rayOrigin = {
					x: directionX > 0 ? this.raycastOrigins.topRight.x - this.skinWidth : this.raycastOrigins.topLeft.x + this.skinWidth, 
					y: this.raycastOrigins.topLeft.y + (this.horizontalRaySpacing * i)
				};
				
				let objectsToCollide = this.quadTree ? this.quadTree.filterObjects( this.gameObject, this.collisionLayer ) : 
												   this.gameObject.getSiblings(this.collisionLayer);

				let hit = Geometry.RaycastX(
							  objectsToCollide,
							  rayOrigin, 
							  directionX, 
							  rayLength);

				this.debugDraw && Graphics.line(rayOrigin, {x: rayOrigin.x, y: rayOrigin.y + directionX * rayLength*10 }, "green");

				// platform hit something in x direction
				if ( hit ) {
					let targetTransform = hit.targetObject.getComponent("Transform");

					if (movedPassengers.indexOf(targetTransform) === -1) {
						movedPassengers.push(targetTransform);

						let pushX = velocity.x - (hit.distance - this.skinWidth) * directionX;
						let pushY = 0;
						
						targetTransform.Translate( {x: pushX, y:pushY} );
					}
				}
			}
		}
	}

	// Vertically moving platform
	_verticalHit (velocity, movedPassengers) {

		let directionY = Math.sign (velocity.y);

		if (velocity.y != 0) {
			let rayLength = Math.abs (velocity.y) + this.skinWidth;
			
			for (let i = 0; i < this.verticalRayCount; i ++) {
				
				let rayOrigin = {
					x: this.raycastOrigins.bottomLeft.x + (this.verticalRaySpacing * i) + this.transform.velocity.x, 
					y: directionY > 0 ? this.raycastOrigins.bottomLeft.y : this.raycastOrigins.topLeft.y
				};

				let objectsToCollide = this.quadTree ? this.quadTree.filterObjects( this.gameObject ) : 
												   	   this.gameObject.getSiblings();
				
				let hit = Geometry.RaycastY(
								  objectsToCollide,
								  rayOrigin, 
								  directionY, 
								  rayLength);

				this.debugDraw && Graphics.line(rayOrigin, {x: rayOrigin.x, y: rayOrigin.y + directionY * rayLength*10 }, "green");

				if (hit) {
					let targetTransform = hit.targetObject.getComponent("Transform");

					if (movedPassengers.indexOf(targetTransform)) {
						movedPassengers.push(targetTransform);
						let pushX = velocity.x;
						let pushY = velocity.y - (hit.distance - this.skinWidth) * directionY;

						targetTransform.Translate({x: pushX, y: pushY});
					}
				}
			}
		}
	}
}