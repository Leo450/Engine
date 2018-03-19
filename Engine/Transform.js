var Transform = function(gameObject)
{

	GameObjectComponent.call(this, gameObject);

	this.position = new TransformPosition(this);
	this.scale = {
		"x": 0,
		"y": 0
	};
	this.rotation = {
		"x": 0,
		"y": 0
	};

};
Transform.prototype = Object.create(GameObjectComponent.prototype);
Transform.prototype.constructor = Transform;
