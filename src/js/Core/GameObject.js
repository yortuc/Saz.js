// GameObject

export default class GameObject {
	constructor(data) {
		data = data || {};
		
		this.layer = data.layer || null;
		this.components = [];
		this.children = [];
	}

	addComponent (component) {
		this.components.push(component);
		component.gameObject = this;
		return component;
	}

	addChild (child){
		this.children.push(child);
		child.parent = this;
		return child;
	}

	removeChild(child){
		this.children.map((c,index)=>{
			if (c===child) {
				this.children.splice(index, 1);
				return;
			}
		});
	}

	getComponent (typeInfo){
		for(var i=0; i<this.components.length; i++){
			let c = this.components[i];
			if(c.constructor.name === typeInfo){
				return c;
			}
		}
	}

	getSiblings (){
		let parent = this.parent;
		if(!parent) return null;

		let siblings = parent.children.filter(s=> {
			return s !== this;
		}.bind(this));

		return siblings;
	}

	getCollidibleSiblings(){
		let parent = this.parent;
		if(!parent) return null;

		let siblings = parent.children.filter(s=> {
			let sTransform = s.getComponent("Transform");
			return s !== this && sTransform.collides;
		}.bind(this));

		return siblings;
	}

	kill(){
		this.parent.removeChild(this);
	}

	update (dt) { 
		this.components.map(c => c.update && c.update(dt));
		this.children.map(c => c.update && c.update(dt));
	}
}