var Motion = function(gameObject, velocity, acceleration, maxVelocity, maxAcceleration)
{

	GameObjectComponent.call(this, gameObject);

	this.velocity = velocity || new Vector2();
	this.acceleration = acceleration || new Vector2();
	this.maxVelocity = maxVelocity || null;
	this.maxAcceleration = maxAcceleration || null;

};
Motion.prototype = Object.create(GameObjectComponent.prototype);
Motion.prototype.constructor = Motion;

Motion.prototype.fixedUpdate = function()
{

	if(this.maxAcceleration != null){
		if(this.acceleration.x > this.maxAcceleration.x){
			this.acceleration.x = this.maxAcceleration.x;
		}
		if(this.acceleration.y > this.maxAcceleration.y){
			this.acceleration.y = this.maxAcceleration.y;
		}
	}

	this.velocity.x += this.acceleration.x * Time.fixedDeltaTime;
	this.velocity.y += this.acceleration.y * Time.fixedDeltaTime;

	if(this.maxVelocity != null){
		if(this.velocity.x > this.maxVelocity.x){
			this.velocity.x = this.maxVelocity.x;
		}
		if(this.velocity.y > this.maxVelocity.y){
			this.velocity.y = this.maxVelocity.y;
		}
	}

};
Motion.prototype.afterFixedUpdate = function()
{

	if(this.velocity.x != 0){
		this.gameObject.transform.setPosition(this.gameObject.transform.position.x + this.velocity.x * Time.fixedDeltaTime);
		this.gameObject.renderer.needUpdate = true;
	}
	if(this.velocity.y != 0){
		this.gameObject.transform.setPosition(null, this.gameObject.transform.position.y + this.velocity.y * Time.fixedDeltaTime);
		this.gameObject.renderer.needUpdate = true;
	}

};
