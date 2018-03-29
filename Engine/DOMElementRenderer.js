var DOMElementRenderer = function(gameObject, $element){

	GameObjectComponent.call(this, gameObject);

	this.$element = $element;

	this.render();

};
DOMElementRenderer.prototype = Object.create(GameObjectComponent.prototype);
DOMElementRenderer.prototype.constructor = DOMElementRenderer;

DOMElementRenderer.prototype.render = function()
{

	if(!$.contains(document, this.$element[0])){
		this.gameObject.scene.$container.append(this.$element);
	}

	var rect = this.$element[0].getBoundingClientRect();

	this.gameObject.bounds.width = rect.width;
	this.gameObject.bounds.height = rect.height;

	this.gameObject.transform.setPosition(WorldSpace.convertScreenPoint(new Vector2(rect.left + rect.width / 2, rect.top + rect.height / 2)));

	//this.gameObject.bounds.draw();

};
