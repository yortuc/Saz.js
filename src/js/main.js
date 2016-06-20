// services
import Input from './utils/input'; 
import Graphics from './utils/graphics'; 
import MessageHub from './utils/messageHub';
import Import from './utils/import';

// core
import GameObject from './Core/GameObject';
import Scene from './Core/Scene';  

// components
import Camera from './Components/Camera';
import CameraFollow from './Components/CameraFollow';

import SceneQuadTree from './Components/SceneQuadTree';
import SceneQuadTreeNodeRenderer from './Components/SceneQuadTreeNodeRenderer';
import Transform from './Components/Transform';
import RectangleRenderer from './Components/RectangleRenderer';
import RectangleShadowRenderer from './Components/RectangleShadowRenderer';
import Controller2D from './Components/Controller2D';
import PositionTextRenderer from './Components/PositionTextRenderer';
import FpsRenderer from './Components/FpsRenderer';
import PlayerController from './Components/PlayerController';
import PlatformController from './Components/PlatformController';

import Popup from './Components/Popup';
import DashRenderer from './Components/DashRenderer';
import FractalRenderer from './Components/FractalRenderer';
import Shooter from './Components/Shooter';

import SpriteSheetRenderer from './Components/SpriteSheetRenderer'
import CrossRenderer from './Components/CrossRenderer'

import PlayerWalkAtlas from './assets/PlayerWalkAtlas'
import Level1 from './assets/Level1'


import Resources from './utils/resources';

Graphics.init(1200, 800);
Input.init();  


function createGame() { 
   
	var oyun = new Scene();
	new Transform(oyun, { x: 0, y: 0, width: 1800, height: 1000 });
	var mainCamera = new Camera(oyun, {x:0, y: 100, width: 800, height: 600});

	var player = new GameObject({layer: "front"});
		new Transform(player, { x: 150, y: 0, width: 30, height: 30 });
		new SpriteSheetRenderer(player, { fps: 12, spriteSheet: Resources.images["p1_walk.png"], atlas: PlayerWalkAtlas, playing: true  });
		var mainSceneQuadTree = new SceneQuadTree(oyun);
		new SceneQuadTreeNodeRenderer(oyun);
		new Controller2D(player, { 
			jumpHeight: 5,
			timeToJumpApex: 0.5,
			wallFriction: 0.9,
			sceneQuadTree: mainSceneQuadTree
		});
		new PlayerController(player, { 
			moveSpeed: 6,
			jumpHeight: 5,
			timeToJumpApex: 0.5
		});
		new PositionTextRenderer(player, {x: 20, y:20, label:"player pos" });
		new CameraFollow(player, {camera: mainCamera});
		new Shooter(player);

		var kafa = new GameObject();
			player.addChild(kafa);
			new Transform(kafa, {x: 0, y: -20, width: 10, height: 10 });
			new RectangleRenderer(kafa, "blue");

	let gameObjects = Import.parseLevel(Level1);
	gameObjects.push(player);
	oyun.setChildren(gameObjects);

	return oyun;
}

Resources.loadImages(Level1.dependencies, 
function(){
	
	createGame().start();

});

