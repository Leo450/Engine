var Bounds = function(center, width, height, scale)
{

	this.center = center || new Vector2();
	this.width = width || 0;
	this.height = height || 0;
	this.scale = scale || new Vector2(1, 1);

	this.refresh();

};

Bounds.prototype.refresh = function()
{

	this.min = new Vector2(this.center.x - (this.width * this.scale.x) / 2, this.center.y - (this.height * this.scale.y) / 2);
	this.max = new Vector2(this.center.x + (this.width * this.scale.x) / 2, this.center.y + (this.height * this.scale.y) / 2);

};
Bounds.prototype.draw = function()
{

	$('body')
		.append(
			'<div class="debug debug-bounds" bounds="min.x min.y" style="' +
			'position:fixed;' +
			'background-color:red;' +
			'left:' + ScreenSpace.convertWorldX(this.min.x) + 'px;' +
			'top:' + ScreenSpace.convertWorldY(this.min.y) + 'px;' +
			'width:4px;' +
			'height:4px;' +
			'"></div>')
		.append(
			'<div class="debug debug-bounds" bounds="min.x max.y" style="' +
			'position:fixed;' +
			'background-color:green;' +
			'left:' + ScreenSpace.convertWorldX(this.min.x) + 'px;' +
			'top:' + ScreenSpace.convertWorldY(this.max.y) + 'px;' +
			'width:4px;' +
			'height:4px;' +
			'"></div>')
		.append(
			'<div class="debug debug-bounds" bounds="max.x max.y" style="' +
			'position:fixed;' +
			'background-color:blue;' +
			'left:' + ScreenSpace.convertWorldX(this.max.x) + 'px;' +
			'top:' + ScreenSpace.convertWorldY(this.max.y) + 'px;' +
			'width:4px;' +
			'height:4px;' +
			'"></div>')
		.append(
			'<div class="debug debug-bounds" bounds="max.x min.y" style="' +
			'position:fixed;' +
			'background-color:yellow;' +
			'left:' + ScreenSpace.convertWorldX(this.max.x) + 'px;' +
			'top:' + ScreenSpace.convertWorldY(this.min.y) + 'px;' +
			'width:4px;' +
			'height:4px;' +
			'"></div>')
		.append(
			'<div class="debug debug-bounds" bounds="center" style="' +
			'position:fixed;' +
			'background-color:black;' +
			'left:' + ScreenSpace.convertWorldX(this.center.x) + 'px;' +
			'top:' + ScreenSpace.convertWorldY(this.center.y) + 'px;' +
			'width:4px;' +
			'height:4px;' +
			'"></div>');

};
