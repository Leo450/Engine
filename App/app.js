var scene = new Scene(50);

scene.addGameObject("clem", function(gameObject){
	gameObject.addComponent("animatorController", new AnimatorController(gameObject, "/App/animations/clem.animator.json"));
	gameObject.addComponent("playerController", new PlayerController(gameObject));
	gameObject.addComponent("motion", new Motion(gameObject));
	gameObject.addComponent("renderer", new SpriteRenderer(gameObject, new Sprite(gameObject, "/App/assets/img/clem.png")));
});

scene.run();




/*
var a = {
	x: 0,
	y: 0
};
var b = {
	x: 2,
	y: 0
};

var i = {
	x: 1,
	y: 1
};
var j = {
	x: 1,
	y: -2
};

var d = {
	x: b.x - a.x,
	y: b.y - a.y
};
var e = {
	x: j.x - i.x,
	y: j.y - i.y
};

var denom = d.x * e.y - d.y * e.x;

var t = - (a.x * e.y - i.x * e.y - e.x * a.y + e.x * i.y) / denom;
var u = - (-d.x * a.y + d.x * i.y + d.x * a.x - d.y * i.x) / denom;

console.log(t);
console.log(u);*/
