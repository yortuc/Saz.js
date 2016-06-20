// RectangleRenderer 
import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';
import GameObject from '../Core/GameObject';
import Transform from '../Components/Transform';
import RectangleRenderer from '../Components/RectangleRenderer';
import Input from '../utils/input';
import BulletController from '../Components/BulletController';
import Controller2D from '../Components/Controller2D';

export default class Shooter extends Behavior {
	
	constructor(gameObject, data){
		super(gameObject);

		this.playerController = this.gameObject.getComponent("PlayerController");
		this.bullets = [];
		this.lastFire = null;

		this.bulletSpeed = 20;

		this.fireTime = 1200; // ms
	}

	shoot(weapon, targetPoint) {
		let transform = this.gameObject.getComponent("Transform");
		//let direction = this.playerController.direction;

		let targetVector = {
			x: targetPoint.x - transform.x,
			y: targetPoint.y - transform.y
		}

		let magnitudeTargetVector = Math.sqrt(targetVector.x*targetVector.x + targetVector.y*targetVector.y);
		
		let normalizeTargetVector = {
			x: targetVector.x / magnitudeTargetVector,
			y: targetVector.y / magnitudeTargetVector
		}

		var bulletR = 4; // + (7 * Math.random());
		let bullet = { 
			x: transform.x + normalizeTargetVector.x * 30 ,
			y: transform.y - normalizeTargetVector.y * 30,
			vx: normalizeTargetVector.x * this.bulletSpeed,
			vy: normalizeTargetVector.y * this.bulletSpeed,
			target: targetVector,
			r: bulletR,
			color: this.color( 255 , 0,0)
		}

		// construct the bullet according to weapon
		var objBullet = new GameObject();
			new Transform(objBullet, {
				x: bullet.x, 
				y: bullet.y, 
				width: 10, 
				height: 10, 
				velocity: {x: bullet.vx, y: bullet.vy}, 
				collides: true }
			);
			new RectangleRenderer(objBullet, "blue");
			new BulletController(objBullet);	// killer
			new Controller2D(objBullet, {jumpHeight: 0.000000000001});

		this.gameObject.parent.addChild(objBullet);

		//250 + (bulletR-3)*-250/7

		console.log(bullet.color);

		//this.bullets.push( bullet );
		this.lastFire = Date.now();
	}

	color(r,g,b){
		return "rgb(" + parseInt(r).toString() + "," + g.toString() + "," + b.toString() + ")";
	}

	renderBullets() {
		let ctx = Graphics.ctx;

		ctx.save();
		

		this.bullets.map((b, index)=>{
			b.x += b.vx;
			b.y += b.vy;

			if( Math.abs(b.target.x - b.x) < 20 &&
				Math.abs(b.target.y - b.y) < 20 ) {

				// at target 
				bullets.splice(index, 1);
			}
			else{
				ctx.fillStyle = b.color;
				ctx.beginPath();
	      		ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI, false);
	      		ctx.fill();
			}

			
	    });

	    ctx.restore();
	}

	update(dt){
		// shoot
		//if(Input.getKeyDown("s") && Date.now() - this.lastFire > this.fireTime){
	//		this.shoot();
	//	}

		//let ctx = Graphics.ctx;
		
		//this.renderBullets();
	}

}