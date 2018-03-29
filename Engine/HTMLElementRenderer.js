var HTMLElementRenderer = function(gameObject, css)
{

	GameObjectComponent.call(this, gameObject);

	this.$element = null;

	this.needUpdate = false;

	this.render(css);

};
HTMLElementRenderer.prototype = Object.create(GameObjectComponent.prototype);
HTMLElementRenderer.prototype.constructor = HTMLElementRenderer;

HTMLElementRenderer.prototype.render = function(css)
{

	this.$element = $('<div class="' + this.gameObject.name + '"></div>');
	this.$element.css(css);

	this.needUpdate = true;

	this.update();

	this.gameObject.scene.$container.append(this.$element);

};
HTMLElementRenderer.prototype.update = function()
{

	if(!this.needUpdate){
		return;
	}

	this.gameObject.bounds.width = this.$element.width();
	this.gameObject.bounds.height = this.$element.height();
	this.gameObject.bounds.refresh();

	var screenPosition = ScreenSpace.convertWorldPoint(this.gameObject.transform.position);

	this.$element
		.css({
			left: screenPosition.x - this.gameObject.bounds.width / 2,
			top: screenPosition.y - this.gameObject.bounds.height / 2
		});

	this.needUpdate = false;

};
