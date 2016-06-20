import Graphics from './utils/graphics'; 
import Input from './utils/input';
import requestAnimationFrame from './requestAnimationFrame';  

// systems
import RectangleRenderer from './Systems/RectangleRenderer';
import PhysicsSolver from './Systems/PhysicsSolver';
import ObjectBounds from './Systems/ObjectBounds';
import CharacterController from './Systems/CharacterController';

var gameState = window.gameState = {
	dt: 0,
	elapsed: 0,  
	screen: [600, 400], 
	dynamicObjects: [{  
		name: "player1", 
		position : 		{x:280, y:30},
		velocity: 		{x: 0, y: 5}, 
		acceleration: 	{x: 0, y: 20 },  
		size: 			{width: 25, height: 25},
		render: 		{color: "red"}, 
	}, {  
		name: "box",  
		position : 		{x:100, y:10},  
		velocity: 		{x: 0, y: 3},
		acceleration: 	{x: 0, y: 9},
		size: 			{width: 50, height: 50},
		render: 		{color: "blue"},
	}], 
	grounds: [{
		name: 		"floor",
		position : 	{x:50, y:370},
		size: 		{width: 500, height: 30},
		render: 	{color: "orange"}
	},{
		name: 		"floor2",
		position : 	{x:250, y:300},
		size: 		{width: 500, height: 30 },
		render: 	{color: "orange"}
	},{
		name: 		"floor3",
		position : 	{x:250, y:230},
		size: 		{width: 30, height: 70},
		render: 	{color: "purple"}
	}, {
		name: 		"floor4",
		position : 	{x:380, y:240},
		size: 		{width: 30, height: 30},
		render: 	{color: "purple"}
	}]
}
 
// init services
Graphics.init(gameState.screen[0], gameState.screen[1]);
Input.init();

var lastRender = Date.now();

function gameLoop(){
	Graphics.clearScene();
	var dt = Date.now() - lastRender;

	/* systems */
	ObjectBounds(gameState);
	PhysicsSolver(gameState);
	RectangleRenderer(gameState);
	CharacterController(gameState);
	/****/

	lastRender = Date.now();
	gameState.elapsed += dt;
	gameState.dt = dt/1000.0;	// dt [seconds]
	requestAnimationFrame(gameLoop);
}

gameLoop();