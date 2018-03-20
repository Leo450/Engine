var BoxCollider = function(gameObject, restrictMotion)
{

	GameObjectComponent.call(this, gameObject);

	this.restrictMotion = restrictMotion || false;

	this.gameObject.scene.colliders.push(this);

};
BoxCollider.prototype = Object.create(GameObjectComponent.prototype);
BoxCollider.prototype.constructor = BoxCollider;

BoxCollider.prototype.restrictMotion = function(velocity)
{

	var thisNewBounds = new Bounds(null, );

};
BoxCollider.prototype.getCollisions = function(collider)
{

	var collisions = [];

	var thisBounds = this.gameObject.bounds;
	var colliderBounds = collider.bounds;

	if(thisBounds.min.y >= colliderBounds.min.y && thisBounds.min.y <= colliderBounds.max.y){
		collisions.push(new Collision(collider, "bot", colliderBounds.max.y, Math.abs(thisBounds.min.y - colliderBounds.max.y)));
	}
	if(thisBounds.max.y >= colliderBounds.min.y && thisBounds.max.y <= colliderBounds.max.y){
		collisions.push(new Collision(collider, "top", colliderBounds.min.y, Math.abs(thisBounds.max.y - colliderBounds.min.y)));
	}
	if(thisBounds.min.x >= colliderBounds.min.x && thisBounds.min.x <= colliderBounds.max.x){
		collisions.push(new Collision(collider, "left", colliderBounds.max.x, Math.abs(thisBounds.min.x - colliderBounds.max.x)));
	}
	if(thisBounds.max.x >= colliderBounds.min.x && thisBounds.max.x <= colliderBounds.max.x){
		collisions.push(new Collision(collider, "right", colliderBounds.min.x, Math.abs(thisBounds.max.x - colliderBounds.min.x)));
	}

	return collisions;

};
BoxCollider.prototype.update = function(gameObject)
{

	if(!this.restrictMotion){
		return;
	}

	for(var i = 0; i < this.gameObject.scene.colliders.length; i++){
		var collider = this.gameObject.scene.colliders[i];

		if(collider == this){
			continue;
		}



	}

};
