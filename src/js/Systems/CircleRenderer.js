import Graphics from '../utils/graphics'; 

function CircleRenderer (state) {
	state.dynamicObjects.concat(state.grounds).map(o=> {
		Graphics.ctx.save();
		Graphics.ctx.translate(o.position.x, o.position.y);
		Graphics.ctx.fillStyle = o.render.color;

		Graphics.ctx.beginPath();
  		Graphics.ctx.arc(0, 0, 30, 0, 2 * Math.PI, false);
  		Graphics.ctx.fill();

		Graphics.ctx.restore();
	});
}

export default CircleRenderer; 