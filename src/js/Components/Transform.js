import Behavior from '../Core/Behavior';

// transform

export default class Transform extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		// private
		this._x = data.x || 0;
		this._y = data.y || 0; 
		this._rotation = data.rotation || 0; // degrees
		
		this.velocity = data.velocity || {x: 0, y: 0};
		this.width = data.width;
		this.height = data.height;
		this.anchor = data.anchor || {x: 0.5, y: 0.5};
		this.collides = data.collides;
		this.debug = data.debug;

		this.parent = this.gameObject.parent ? this.gameObject.parent.getComponent("Transform") : null;
	}

	update(dt){
		//
	}

	// @param vector : V2
	Translate(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}

	// return global x
	get x(){
		if(this.parent){
			return this.parent.x + this._x; // - this._y * Math.sin(this.rotation*Math.PI/180);
		}
		else{
			return this._x ;
		}
	}

	set x(valueX){
		this._x = valueX;
	}

	get y(){ 
		if(this.parent){
			return this.parent.y + this._y; // - (1-Math.cos(this.rotation*Math.PI/180))*this._y;
		}else{
			return this._y;
		}
	}

	set y(valueY){
		this._y = valueY;
	}

	get rotation (){
		if(this.parent){
			//this.parent = this.gameObject.parent.getComponent("Transform");
			return this._rotation + this.parent.rotation;
		}
		else{
			return this._rotation;
		}
	}

	set rotation (valueRotation){
		this._rotation = valueRotation;
	}

	get bounds (){
		return {
			topLeft: {
				x: this.x - this.width * this.anchor.x,
				y: this.y - this.height * this.anchor.y
			},
			bottomLeft: {
				x: this.x - this.width * this.anchor.x,
				y: this.y + this.height * this.anchor.y
			},
			topRight: {
				x: this.x + this.width * this.anchor.x,
				y: this.y - this.height * this.anchor.y
			},
			bottomRight: {
				x: this.x + this.width * this.anchor.x,
				y: this.y + this.height * this.anchor.y
			}
		}
	}

	set bounds(valBounds) {/*rea-donly*/}
}