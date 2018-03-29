var Scene = function(settings)
{

	this.$container = settings.container;

	this.gameObjects = {};
	this.colliders = [];
	this.nbUpdate = 0;
	this.nbFixedUpdate = 0;

	this.ready = null;

	Time.fixedDeltaTime = 1 / settings.physicsRefreshRate;

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

	var afterUpdateCalls = [];

	for(var gameObjectName in this.gameObjects){
		var gameObject = this.gameObjects[gameObjectName];

		afterUpdateCalls = afterUpdateCalls.concat(gameObject.executeMethodForComponents("update"));

	}

	this.executeAfterMethodCalls(afterUpdateCalls);

	Time.updateForNextFrame(timestamp);

	this.nbUpdate++;

	window.requestAnimationFrame(function(timestamp){
		self.update(timestamp);
	});

};
Scene.prototype.fixedUpdate = function()
{

	var self = this;

	var afterFixedUpdateCalls = [];

	for(var gameObjectName in this.gameObjects){
		var gameObject = this.gameObjects[gameObjectName];

		afterFixedUpdateCalls = afterFixedUpdateCalls.concat(gameObject.executeMethodForComponents("fixedUpdate"));

	}

	this.executeAfterMethodCalls(afterFixedUpdateCalls);

	this.nbFixedUpdate++;

	setTimeout(function(){
		self.fixedUpdate();
	}, Time.fixedDeltaTime * 1000);

};
Scene.prototype.executeAfterMethodCalls = function(afterMethodCalls)
{

	for(var i = 0; i < afterMethodCalls.length; i++){
		var afterMethodCall = afterMethodCalls[i];

		afterMethodCall.context[afterMethodCall.methodName]();

	}

};
Scene.prototype.addGameObject = function(name, callback)
{

	var gameObject = new GameObject(this, name);

	if(callback){
		callback(gameObject);
	}

	this.gameObjects[name] = gameObject;

};
