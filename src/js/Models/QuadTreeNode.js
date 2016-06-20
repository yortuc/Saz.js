import Geometry from '../utils/geometry';

class QuadTreeNode {
	constructor(topLeftX, topLeftY, width, height, level=0) {
		this.topLeftX = topLeftX;	// node top-left x
		this.topLeftY = topLeftY;	// node top-left y
		this.width = width;			// node width
		this.height = height;		// node height
		this.subNodes = [];			// leaf nodes of branch node
		this.objects = [];			// containing elements of leaf node
		this.level = level;			// level of node
		this.maxObjects = 50;
		this.maxLevels = 5;
	}

	clear() {
		if(this.subNodes.length === 0){
			//this.objects.map(o => o.getComponent("Transform").debug = false );
			this.objects = [];
		} else {
			this.subNodes.map(s=> {
				s.clear();
			});	
			this.subNodes = [];
		}
	}

	/*
	 * Insert the object into the quadtree. If the node
	 * exceeds the capacity, it will split and add all
	 * objects to their corresponding nodes.
	 */
	insert (object) {	

		// branch node
		if (this.subNodes.length > 0) {
			let index = this.getIndex(object);

			if (index > -1) {
				this.subNodes[index].insert(object);
				return;
			}
		}
		else{
			// leaf node
			this.objects.push(object);


			// node object-count exceeded, subdivide and replace all objects inside node
			if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
				if (this.subNodes.length === 0) { 
					this.subDivide();
				}

				let i = 0;

				this.objects.map( (o, i) => {
					let index = this.getIndex(o);

					if(index > -1){
						this.objects.splice(i, 1);
						this.subNodes[index].insert(o);
					}
				});
			}
		}

		
	}

	/*
	 * Determine which node the object belongs to. -1 means
	 * object cannot completely fit within a child node and is part
	 * of the parent node
	 */
 	getIndex(object) {
	  	let index = -1;	// cannot exactly fit any of nodes
	  	let transform = object.getComponent("Transform");

   	 	let verticalMidpoint = this.topLeftX + this.width/2;
   	  	let horizontalMidpoint = this.topLeftY + this.height/2;
	 
		// Object can completely fit within the top quadrants
		let topQuadrant = transform.y <= horizontalMidpoint;

		// Object can completely fit within the bottom quadrants
		let bottomQuadrant = transform.y >= horizontalMidpoint;
	 
		// Object can completely fit within the left quadrants
		if (transform.x <= verticalMidpoint) {
			if (topQuadrant) {
				index = 0;
			}
			else if (bottomQuadrant) {
				index = 2;
			}
		}
		// Object can completely fit within the right quadrants
		else if (transform.x >= verticalMidpoint) {
			if (topQuadrant) {
				index = 1;
			}
			else if (bottomQuadrant) {
				index = 3;
			}
		}
	 
		return index;
	}

	/*
	* Return all objects that could collide with the given object
	*/
	retrieve(returnObjects, refObject) {

		if(this.subNodes.length > 0){
			let index = this.getIndex(refObject);
			this.subNodes[index].retrieve(returnObjects, refObject);
		}

		this.objects.map(o=> {
			o.getComponent("Transform").debug = true;
			returnObjects.push(o);
		});

		return returnObjects;
	}

	subDivide(){
		
		if(this.subNodes.length === 0){
			// leaf node
			//	q1,q2 
			//	q3,q4
			//
			let w = this.width / 2;
			let h = this.height / 2;
			let level = this.level+1;

			const q1 = new QuadTreeNode( this.topLeftX, 	this.topLeftY, 		w, h, level );
			const q2 = new QuadTreeNode( this.topLeftX + w, this.topLeftY, 		w, h, level );
			const q3 = new QuadTreeNode( this.topLeftX, 	this.topLeftY + h, 	w, h, level );
			const q4 = new QuadTreeNode( this.topLeftX + w, this.topLeftY + h, 	w, h, level );

			this.subNodes  = [q1, q2, q3, q4];
		}
		else {
			// branch node
			this.subNodes.map(s => s.subDivide());
		}
	}
}

export default QuadTreeNode;