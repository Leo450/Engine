var Bounds = function(gameObject, width, height, center)
{

	GameObjectComponent.call(this, gameObject);

	this.width = width || 0;
	this.height = height || 0;

	if(center){
		this.center = center;
	}

	this.compute();

};
Bounds.prototype = Object.create(GameObjectComponent.prototype);
Bounds.prototype.constructor = Bounds;

Bounds.prototype.compute = function()
{

	if(this.gameObject){
		this.center = this.gameObject.transform.position;
	}
	this.min = new Vector2(this.center.x - this.width / 2, this.center.y - this.height / 2);
	this.max = new Vector2(this.center.x + this.width / 2, this.center.y + this.height / 2);

};
