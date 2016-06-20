function Transform(state){
	state.dynamicObjects.map(o=> {

		let position = o.position;
		let vel = o.velocity;
		let acc = o.acceleration;

		vel.x += state.dt * acc.x;
		vel.y += state.dt * acc.y;

		position.x += state.dt * vel.x;
		position.y += state.dt * vel.y;
		
	});
}

export default Transform;