var WorldSpace = {};

WorldSpace.convertScreenPoint = function(screenPoint)
{

	return new Vector2(screenPoint.x - ScreenSpace.bounds.center.x, -1 * (screenPoint.y - ScreenSpace.bounds.center.y));

};