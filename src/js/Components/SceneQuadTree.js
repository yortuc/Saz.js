import Behavior from '../Core/Behavior';
import QuadTreeNode from '../Models/QuadTreeNode';
import Geometry from '../utils/Geometry';


export default class SceneQuadTree extends Behavior {

	constructor(gameObject){
		super(gameObject);

		this.transform = this.gameObject.getComponent("Transform");
		this.quadTree = new QuadTreeNode( 0, 0, this.transform.width, this.transform.height );
	}

	filterObjects(refObject, layer) {
		return this.quadTree.retrieve([], refObject, layer);
	}

	insert(object){
		this.quadTree.insert(object);
	}

	update(dt) {
		// clear quad tree in every frame
		this.quadTree.clear();

		// add all objects to quad-tree
		this.gameObject.children.map(c=> 
			this.quadTree.insert(c)
		);
	}
}