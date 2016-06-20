import Behavior from '../Core/Behavior';
import Easing from '../utils/easing';
import Graphics from '../utils/graphics';

export default class SpriteSheetRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.transform = this.gameObject.getComponent("Transform");
		this.spriteSheet = data.spriteSheet;
		this.atlas = data.atlas;

		this.frames = [];
		this.currentFrameIndex = 0;
		this.playing = data.playing;
		this.fps = data.fps || 12;

		this.elapsedTime = 0;

		this.extractFrameFromAtlas(this.atlas);
	}

	extractFrameFromAtlas(atlas){
		for(var i=0; i<atlas.length; i++){

			let atlasFrame = atlas[i];
			let frame = {
				x: 		atlasFrame.frame.x, 
				y: 		atlasFrame.frame.y,
				width: 	atlasFrame.frame.w,
				height: atlasFrame.frame.h
			}

			this.frames.push(frame);
		}

		console.log("frames extracted", this.frames.length)
	}

	stop() {
		this.playing = false;
		this.currentFrameIndex = 0;
	}

	update(dt) {
		
		if(this.playing && this.elapsedTime >= 1000.0 / this.fps){
			this.currentFrameIndex++;
			this.elapsedTime = 0; 
		}

		let ctx = Graphics.ctx;

		ctx.save();

		ctx.translate(this.transform.x - this.transform.width/2, this.transform.y - this.transform.height/2);

		let currentFrame = this.frames[this.currentFrameIndex % this.frames.length];

		ctx.drawImage(this.spriteSheet,
					  currentFrame.x,currentFrame.y,currentFrame.width,currentFrame.height,	// source
		  			  0,0,this.transform.width,this.transform.height);	// destination


		ctx.restore();

		this.elapsedTime += dt;
	}

}
