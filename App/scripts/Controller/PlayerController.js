var PlayerController = function(gameObject){

	GameObjectComponent.call(this, gameObject);

};
PlayerController.prototype = Object.create(GameObjectComponent.prototype);
PlayerController.prototype.constructor = PlayerController;

PlayerController.prototype.fixedUpdate = function()
{

	this.gameObject.animatorController.setBool("walking", Input.getKeyDown("MoveLeft") || Input.getKeyDown("MoveRight"));

	if(Input.getKeyDown("MoveLeft")){
		this.gameObject.motion.velocity.x = -50;
		this.gameObject.renderer.setFlipX(true);
	}else if(Input.getKeyDown("MoveRight")){
		this.gameObject.motion.velocity.x = 50;
		this.gameObject.renderer.setFlipX(false);
	}else{
		this.gameObject.motion.velocity.x = 0;
	}

};
