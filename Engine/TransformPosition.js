var TransformPosition = function(transform)
{

	this.transform = transform;

	this.x = 0;
	this.y = 0;

};

TransformPosition.prototype.getRealX = function()
{

	return this.transform.gameObject.scene.screenInfo.center.x + this.x;

};
TransformPosition.prototype.getRealY = function()
{

	return this.transform.gameObject.scene.screenInfo.center.y + this.y;

};
