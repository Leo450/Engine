var SpriteRenderer = function(gameObject, sprite)
{

	GameObjectComponent.call(this, gameObject);

	this.sprite = sprite;

	this.$element = null;

	this.flipX = false;
	this.flipY = false;

	this.needUpdate = false;

	this.ready = this.load();

};
SpriteRenderer.prototype = Object.create(GameObjectComponent.prototype);
SpriteRenderer.prototype.constructor = SpriteRenderer;

SpriteRenderer.prototype.load = function()
{

	var self = this;

	this.sprite.ready
		.then(function(){

		self.render();

	});

	return this.sprite.ready;

};
SpriteRenderer.prototype.render = function()
{

	this.$element = $('<div class="' + this.gameObject.name + '"></div>');

	this.gameObject.bounds.width = this.sprite.width;
	this.gameObject.bounds.height = this.sprite.height;
	this.gameObject.bounds.refresh();

	this.update();

	this.gameObject.scene.$container.append(this.$element);

};
SpriteRenderer.prototype.update = function()
{

	this.needUpdate = this.sprite.needRender || this.needUpdate;

	if(!this.needUpdate){
		return;
	}

	var cssTransformValue = "scale(" + ((this.flipX)? (-1 * this.gameObject.transform.scale.x) : (this.gameObject.transform.scale.x)) + ", " + ((this.flipY)? (-1 * this.gameObject.transform.scale.y) : (this.gameObject.transform.scale.y)) + ")";

	var screenPosition = ScreenSpace.convertWorldPoint(this.gameObject.transform.position);

	this.$element
		.css({
			backgroundImage: "url(" + this.sprite.imgFileInfo.path + ")",
			backgroundPosition: "-" + this.sprite.offset.x + "px " + this.sprite.offset.y + "px",
			width: this.sprite.width,
			height: this.sprite.height,
			left: screenPosition.x - this.sprite.width / 2,
			top: screenPosition.y - this.sprite.height / 2,
			"-webkit-transform": cssTransformValue,
			"-moz-transform": cssTransformValue,
			"-ms-transform": cssTransformValue,
			"-o-transform": cssTransformValue,
			transform: cssTransformValue
		});

	this.sprite.needRender = false;
	this.needUpdate = false;

};
SpriteRenderer.prototype.setFlipX = function(value)
{

	if(this.flipX === value){
		return;
	}

	this.flipX = value;

	this.needUpdate = true;

};
SpriteRenderer.prototype.setFlipY = function(value)
{

	if(this.flipY === value){
		return;
	}

	this.flipY = value;

	this.needUpdate = true;

};
