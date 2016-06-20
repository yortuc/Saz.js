import GameObject from './GameObject';
import requestAnimationFrame from '../requestAnimationFrame';  
import Graphics from '../utils/graphics';
import Geometry from '../utils/Geometry';
import Resources from '../utils/resources';

export default class Scene extends GameObject {

	constructor(children=[]) {
		super(children);
	}

	setChildren(children=[]){
		children.map(c=> this.addChild(c));
	}

	start() {
		this.transform = this.getComponent("Transform");
		this.camera = this.getComponent("Camera");
		this.lastRender = Date.now();
		this.update();
	}

	update() {
		// dt
		const time = Date.now();
		const dt =  time - this.lastRender;

		let ctx = Graphics.ctx;

		// clear scene
		//Graphics.clearScene();
		//ctx.fillStyle = "#444";
        //ctx.fillRect(0,0,this.transform.width,this.transform.height);
        ctx.drawImage(Resources.images["bg2.jpg"], 0,0, 1200, 800);

		ctx.save();
		ctx.translate(-this.camera.transform.x, 
		              -this.camera.transform.y);

		// update self components
		this.components.map(s=> {
			if(s.update) {
				s.update(dt);
			}
		});

		// update children
		this.children.map(g => {
			if(g.update) {
				g.update(dt);
			}
		});
		
		Graphics.ctx.restore();

		this.lastRender = time;

		// call next frame
		requestAnimationFrame(this.update.bind(this));
	}
}