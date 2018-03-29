var Transform = function(gameObject)
{

	GameObjectComponent.call(this, gameObject);

	this.position = new Vector2();
	this.scale = new Vector2(1, 1);

};
Transform.prototype = Object.create(GameObjectComponent.prototype);
Transform.prototype.constructor = Transform;

Transform.prototype.setVector2Property = function(propertyName, x, y, refreshFunction)
{

	var property = this[propertyName];

	if(x instanceof Vector2){
		y = x.y;
		x = x.x;
	}

	var needRefresh = false;

	if(x != null && x != property.x){
		property.x = x;
		needRefresh = true;
	}
	if(y != null && y != property.y){
		property.y = y;
		needRefresh = true;
	}

	if(needRefresh){
		refreshFunction(this);
		this.gameObject.bounds.refresh();
	}

};
Transform.prototype.setPosition = function(x, y)
{

	this.setVector2Property("position", x, y, function(self){
		self.gameObject.bounds.center = self.position;
	});

};
Transform.prototype.setScale = function(x, y)
{

	this.setVector2Property("scale", x, y, function(self){
		self.gameObject.bounds.scale = self.scale;
	});

};
