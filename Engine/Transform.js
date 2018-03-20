var Transform = function(gameObject)
{

	GameObjectComponent.call(this, gameObject);

	this.position = new TransformPosition(this);
	this.scale = new Vector2();
	this.rotation = new Vector2();

};
Transform.prototype = Object.create(GameObjectComponent.prototype);
Transform.prototype.constructor = Transform;
