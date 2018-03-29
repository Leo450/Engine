var BoxCollider = function(gameObject, isKinematic)
{

	GameObjectComponent.call(this, gameObject);

	this.isKinematic = isKinematic || false;
	this.colliding = {
		left: false,
		bottom: false,
		right: false,
		top: false
	};

	this.gameObject.scene.colliders.push(this);

};
BoxCollider.prototype = Object.create(GameObjectComponent.prototype);
BoxCollider.prototype.constructor = BoxCollider;

BoxCollider.prototype.afterFixedUpdate = function()
{

	if(this.isKinematic || !this.gameObject.motion || (this.gameObject.motion.velocity.x == 0 && this.gameObject.motion.velocity.y == 0)){
		return;
	}

	this.colliding = {
		left: false,
		bottom: false,
		right: false,
		top: false
	};

	var thisNextFrameBounds = this.getNextFrameBounds(this.gameObject);

	for(var i = 0; i < this.gameObject.scene.colliders.length; i++){
		var collider = this.gameObject.scene.colliders[i];

		if(collider == this){
			continue;
		}

		if(!this.willCollide(thisNextFrameBounds, this.getNextFrameBounds(collider.gameObject))){
			continue;
		}



		var raycastOriginX = null;
		var raycastOriginY = null;
		var mayCollideXSide = null;
		var mayCollideYSide = null;

		if(this.gameObject.motion.velocity.x < 0){
			raycastOriginX = this.gameObject.bounds.min.x;
			mayCollideXSide = "left";
		}
		if(this.gameObject.motion.velocity.x > 0){
			raycastOriginX = this.gameObject.bounds.max.x;
			mayCollideXSide = "right";
		}
		if(this.gameObject.motion.velocity.y < 0){
			raycastOriginY = this.gameObject.bounds.min.y;
			mayCollideYSide = "bottom";
		}
		if(this.gameObject.motion.velocity.y > 0){
			raycastOriginY = this.gameObject.bounds.max.y;
			mayCollideYSide = "top";
		}

		if(raycastOriginX !== null){

			var raycastOriginsX = [];

			raycastOriginsX.push(new Vector2(raycastOriginX, this.gameObject.bounds.max.y));
			raycastOriginsX.push(new Vector2(raycastOriginX, this.gameObject.bounds.center.y));
			raycastOriginsX.push(new Vector2(raycastOriginX, this.gameObject.bounds.min.y));

			var raycastX = this.raycastX(raycastOriginsX, collider);

			if(raycastX){
				this.gameObject.motion.velocity.x = raycastX.hit.vector.x / Time.fixedDeltaTime;
				this.colliding[mayCollideXSide] = true;
			}

		}

		if(raycastOriginY !== null){

			var raycastOriginsY = [];

			raycastOriginsY.push(new Vector2(this.gameObject.bounds.max.x, raycastOriginY));
			raycastOriginsY.push(new Vector2(this.gameObject.bounds.center.x, raycastOriginY));
			raycastOriginsY.push(new Vector2(this.gameObject.bounds.min.x, raycastOriginY));

			var raycastY = this.raycastY(raycastOriginsY, collider);

			if(raycastY){
				this.gameObject.motion.velocity.y = raycastY.hit.vector.y / Time.fixedDeltaTime;
				this.colliding[mayCollideYSide] = true;
			}

		}

	}

};
BoxCollider.prototype.raycastX = function(raycastOrigins, collider)
{

	for(var i = 0; i < raycastOrigins.length; i++){
		var raycastOrigin = raycastOrigins[i];

		var raycast = new Raycast(raycastOrigin, new Vector2(this.gameObject.motion.velocity.x * Time.fixedDeltaTime, 0), collider);

		if(raycast.hit){
			return raycast;
		}

	}

	return null;

};
BoxCollider.prototype.raycastY = function(raycastOrigins, collider)
{

	for(var i = 0; i < raycastOrigins.length; i++){
		var raycastOrigin = raycastOrigins[i];

		var raycast = new Raycast(raycastOrigin, new Vector2(0, this.gameObject.motion.velocity.y * Time.fixedDeltaTime), collider);

		if(raycast.hit){
			return raycast;
		}

	}

	return null;

};
BoxCollider.prototype.getNextFrameBounds = function(gameObject)
{

	if(!gameObject.motion){
		return gameObject.bounds;
	}

	var nextFrameBounds = new Bounds(
		new Vector2(
			gameObject.transform.position.x + gameObject.motion.velocity.x * Time.fixedDeltaTime,
			gameObject.transform.position.y + gameObject.motion.velocity.y * Time.fixedDeltaTime
		),
		gameObject.bounds.width,
		gameObject.bounds.height
	);

	return nextFrameBounds;

};
BoxCollider.prototype.willCollide = function(thisNextFrameBounds, targetNextFrameBounds)
{

	return !(
		thisNextFrameBounds.min.x >= targetNextFrameBounds.max.x
		|| thisNextFrameBounds.max.x <= targetNextFrameBounds.min.x
		|| thisNextFrameBounds.min.y >= targetNextFrameBounds.max.y
		|| thisNextFrameBounds.max.y <= targetNextFrameBounds.min.y
	);

};
