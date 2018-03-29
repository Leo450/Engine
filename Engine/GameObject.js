var GameObject = function(scene, name)
{

	this.scene = scene;
	this.name = name;

	this.componentsNames = [];

	this.transform = new Transform(this);
	this.bounds = new Bounds();
	this.renderer = null;

	this.ready = null;

};

GameObject.prototype.load = function()
{

	var readyPromises = [];

	if(this.renderer.ready !== undefined){
		readyPromises.push(this.renderer.ready);
	}

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
GameObject.prototype.executeMethodForComponents = function(methodName)
{

	var afterMethodName = "after" + methodName[0].toUpperCase() + methodName.slice(1);

	var afterMethodCalls = [];

	for(var i = 0; i < this.componentsNames.length; i++){
		var componentName = this.componentsNames[i];

		if(this[componentName]){

			if(this[componentName][methodName]){
				this[componentName][methodName]();
			}

			if(this[componentName][afterMethodName]){
				afterMethodCalls.push({
					context: this[componentName],
					methodName: afterMethodName
				});
			}

		}

	}

	return afterMethodCalls;

};
