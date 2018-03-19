var PlayerController = function(gameObject){

	GameObjectComponent.call(this, gameObject);

};
PlayerController.prototype = Object.create(GameObjectComponent.prototype);
PlayerController.prototype.constructor = PlayerController;

PlayerController.prototype.fixedUpdate = function()
{

	this.gameObject.animatorController.setBool("walking", Input.getKeyDown("MoveLeft") || Input.getKeyDown("MoveRight"));
	this.gameObject.renderer.setFlipX(Input.getKeyDown("MoveLeft"));

};
