var Segment = function(origin, end)
{

	this.origin = origin;
	this.end = end;

	this.vector = new Vector2(this.end.x - this.origin.x, this.end.y - this.origin.y);

};