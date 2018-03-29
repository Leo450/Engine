var ScreenSpace = (function(){

	var screenSpaceObj = {};

	var $window = $(window);
	var windowWidth = $window.width();
	var windowHeight = $window.height();

	screenSpaceObj.bounds = new Bounds(new Vector2(windowWidth / 2, windowHeight / 2), windowWidth, windowHeight);
	screenSpaceObj.bounds.max = new Vector2(windowWidth, 0);
	screenSpaceObj.bounds.min = new Vector2(0, windowHeight);

	return screenSpaceObj;

})();

ScreenSpace.convertWorldPoint = function(worldPoint)
{

	return new Vector2(ScreenSpace.convertWorldX(worldPoint.x), ScreenSpace.convertWorldY(worldPoint.y));

};
ScreenSpace.convertWorldX = function(worldX)
{

	return ScreenSpace.bounds.center.x + worldX;

};
ScreenSpace.convertWorldY = function(worldY)
{

	return ScreenSpace.bounds.center.y - worldY;

};
