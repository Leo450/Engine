var Scene = function(fixedUpdateRefreshRate)
{

	this.gameObjects = {};

	var $window = $(window);
	var windowWidth = $window.width();
	var windowHeight = $window.height();
	this.screenInfo = {
		width: windowWidth,
		height: windowHeight,
		center: {
			x: windowWidth / 2,
			y: windowHeight / 2
		}
	};
	this.nbRefresh = 0;

	this.ready = null;

	Time.fixedDeltaTime = 1 / fixedUpdateRefreshRate;

};

Scene.prototype.run = function()
{

	var self = this;

	this.loadEngine()
		.then(function(){

			var allGameObjectsReady = [];

			for(var gameObjectName in self.gameObjects){
				var gameObject = self.gameObjects[gameObjectName];

				gameObject.load();
				allGameObjectsReady.push(gameObject.ready);

			}

			self.ready = Promise.all(allGameObjectsReady);
			self.ready.then(function(){

				self.render();

			});

		});

};
Scene.prototype.loadEngine = function()
{

	return Input.init();

};
Scene.prototype.render = function()
{

	var self = this;

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	window.requestAnimationFrame(function(timestamp){
		self.update(timestamp);
	});

	setTimeout(function(){
		self.fixedUpdate();
	}, Time.fixedDeltaTime * 1000);

};
Scene.prototype.update = function(timestamp)
{

	var self = this;

	Time.update(timestamp);

	for(var gameObjectName in this.gameObjects){
		var gameObject = this.gameObjects[gameObjectName];

		gameObject.update();

	}

	Time.updateForNextFrame(timestamp);

	this.nbRefresh++;

	window.requestAnimationFrame(function(timestamp){
		self.update(timestamp);
	});

};
Scene.prototype.fixedUpdate = function()
{

	var self = this;

	for(var gameObjectName in this.gameObjects){
		var gameObject = this.gameObjects[gameObjectName];

		gameObject.fixedUpdate();

	}

	setTimeout(function(){
		self.fixedUpdate();
	}, Time.fixedDeltaTime * 1000);

};
Scene.prototype.addGameObject = function(name, callback)
{

	var gameObject = new GameObject(this, name);

	if(callback){
		callback(gameObject);
	}

	this.gameObjects[name] = gameObject;

};
