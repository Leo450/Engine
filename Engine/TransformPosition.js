var TransformPosition = function(transform)
{

	Vector2.call(this);

	this.transform = transform;

};
TransformPosition.prototype = Object.create(Vector2.prototype);
TransformPosition.prototype.constructor = TransformPosition;

TransformPosition.prototype.getRealX = function()
{

	return this.transform.gameObject.scene.screenInfo.center.x + this.x;

};
TransformPosition.prototype.getRealY = function()
{

	return this.transform.gameObject.scene.screenInfo.center.y + this.y;

};
