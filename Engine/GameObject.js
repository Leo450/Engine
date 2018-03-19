var GameObject = function(scene, name)
{

	this.scene = scene;
	this.name = name;

	this.componentsNames = [];

	this.transform = new Transform(this);
	this.renderer = null;

	this.ready = null;

};

GameObject.prototype.load = function()
{

	var readyPromises = [this.renderer.ready];

	if(this.animation){
		readyPromises.push(this.animation.ready);
	}

	this.ready = Promise.all(readyPromises);

};
GameObject.prototype.addComponent = function(componentName, component)
{

	if(this[componentName] !== undefined && this[componentName] !== null){
		throw "GameObject.addComponent() -> Trying to add a new component of type \"" + componentName + "\" to gameObject, but this gameObject already have a component of this type.";
	}

	this[componentName] = component;
	this.componentsNames.push(componentName);

};
GameObject.prototype.update = function()
{

	for(var i = 0; i < this.componentsNames.length; i++){
		var componentName = this.componentsNames[i];

		if(this[componentName] !== undefined && this[componentName] !== null && this[componentName].update){
			this[componentName].update();
		}

	}

};
GameObject.prototype.fixedUpdate = function()
{

	for(var i = 0; i < this.componentsNames.length; i++){
		var componentName = this.componentsNames[i];

		if(this[componentName] !== undefined && this[componentName] !== null && this[componentName].fixedUpdate){
			this[componentName].fixedUpdate();
		}

	}

};
