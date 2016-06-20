import Behavior from '../Core/Behavior';
import Graphics from '../utils/graphics';

export default class SceneQuadTreeNodeRenderer extends Behavior  {

	constructor (gameObject, color="green") {
		super(gameObject);
		this.quadTree = gameObject.getComponent("SceneQuadTree").quadTree;
	}

	update (dt){
		this.drawNode(this.quadTree);
	}

	drawNode (node){

		if(node.subNodes.length === 0){
			const x = node.topLeftX;
			const y = node.topLeftY;
			const w = node.width;
			const h = node.height;

			Graphics.line( {x: x, y: y}, {x: x + w, y: y}, "green" );
			Graphics.line( {x: x + w, y: y}, {x: x + w, y: y + h}, "green" );
			Graphics.line( {x: x + w, y: y + h}, {x: x, y: y + h}, "green" );
			Graphics.line( {x: x, y : y + h}, {x:x, y:y}, "green" );

		} else {
			node.subNodes.map(s=> this.drawNode(s));
		}
	}

}