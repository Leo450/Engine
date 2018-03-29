var scene = null;

$(document).ready(function(){

	setTimeout(function(){

		scene = new Scene({
			physicsRefreshRate: 50,
			container: $('body > #engine-container')
		});

		scene.addGameObject("clem", function(gameObject){
			gameObject.transform.position = WorldSpace.convertScreenPoint(new Vector2(ScreenSpace.bounds.center.x, ScreenSpace.bounds.max.y));
			//gameObject.transform.setScale(new Vector2(2, 2));
			gameObject.addComponent("animatorController", new AnimatorController(gameObject, "/App/animations/clem.animator.json"));
			gameObject.addComponent("collider", new BoxCollider(gameObject));
			gameObject.addComponent("playerController", new PlayerController(gameObject));
			gameObject.addComponent("motion", new Motion(gameObject, null, new Vector2(0, -100)));
			gameObject.addComponent("renderer", new SpriteRenderer(gameObject, new Sprite(gameObject, "/App/assets/img/clem.png")));
		});

		$('.homepage__text > *').each(function(index){

			var $element = $(this);

			scene.addGameObject("text" + index, function(gameObject){
				gameObject.addComponent("collider", new BoxCollider(gameObject, true));
				gameObject.addComponent("renderer", new DOMElementRenderer(gameObject, $element));
			});

		});

		/*scene.addGameObject("floor", function(gameObject){
		 gameObject.transform.position.y = -50;
		 gameObject.addComponent("collider", new BoxCollider(gameObject, true));
		 gameObject.addComponent("renderer", new HTMLElementRenderer(gameObject, {
		 width: "500",
		 height: "10",
		 backgroundColor: "red"
		 }));
		 });
		 scene.addGameObject("obstacle", function(gameObject){
		 gameObject.transform.position.y = -40;
		 gameObject.transform.position.x = -40;
		 gameObject.addComponent("collider", new BoxCollider(gameObject, true));
		 gameObject.addComponent("renderer", new HTMLElementRenderer(gameObject, {
		 width: "10",
		 height: "10",
		 backgroundColor: "red"
		 }));
		 });*/

		scene.run();

	}, 1000);

});
