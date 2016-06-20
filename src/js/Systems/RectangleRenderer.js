import Graphics from '../utils/graphics'; 

function RectangleRenderer (state) {
	state.dynamicObjects.concat(state.grounds).forEach(o=> 
		Graphics.rect(o.position, o.size, o.collisions.below ? "black" : o.render.color)
	);
}

export default RectangleRenderer;