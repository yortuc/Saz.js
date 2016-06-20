
function Turetir(state, dt){
	if(timer > 1000) {
		timer = 0;

		var theta = Math.random() * 2 * Math.PI,
			_x = 1200 * Math.random(),
			_y = 30,
			_vx = 0, //180 * Math.cos(theta),
			_vy = 460 * Math.random();

		gameState.dynamicObjects.push({
			id:	++sonId,
			name: "kutu",
			position : {x:_x, y:_y },
			velocity: {x: _vx, y: _vy}, 
			acceleration: {x: 0, y:0}, 
			size: { width: 100, height: 100},
			render: { color: colors[Math.floor(Math.random() * colors.length)] },
		});
	}
}

function GarbageCollector(state){
	state.dynamicObjects = state.dynamicObjects.filter(o=> 
		o.position.x < 1000 && o.position.x > 0 && 
		o.position.y < 800 && o.position.y > 0
	);
}