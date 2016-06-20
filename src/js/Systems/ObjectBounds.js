import Geometry from '../utils/geometry';

var HAS_COMPUTED_STATIC_BOUNDS = false;
const V_RAY_COUNT = 8;
const H_RAY_COUNT = 8;
let skinWidth = 0.015;

function ObjectBounds (state) {
	// compute statics once
	if(!HAS_COMPUTED_STATIC_BOUNDS) {
		state.grounds.forEach(cycle);
		HAS_COMPUTED_STATIC_BOUNDS = true;
	}

	// compute dynamic object bounds every cycle
	state.dynamicObjects.forEach(cycle);
}

function cycle(obj) {
	obj.bounds = Geometry.GetBounds(obj.position, obj.size);

	if(!obj.raySpacing) {
		obj.raySpacing = Geometry.Rayspacing(obj.size, skinWidth, V_RAY_COUNT, H_RAY_COUNT)
	}

	obj.collisions = {};	// reset collision info
}

export default ObjectBounds;