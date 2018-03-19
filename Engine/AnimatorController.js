var AnimatorController = function(gameObject, animatorFilePath){

	GameObjectComponent.call(this, gameObject);

	this.animatorFileInfo = null;

	this.parametersMeta = null;
	this.statesMeta = null;
	this.transitionsMeta = null;

	this.parameters = {};
	this.animations = {};

	this.currentState = null;
	this.needUpdateCurrentState = false;

	this.ready = this.load(animatorFilePath);

};
AnimatorController.prototype = Object.assign({}, GameObjectComponent.prototype, FileLoader.prototype);
AnimatorController.prototype.constructor = AnimatorController;

AnimatorController.prototype.load = function(animatorFilePath)
{

	var self = this;

	return this.loadAnimatorFile(animatorFilePath)
		.then(function(){

			self.initParameters();
			return self.loadAnimations();

		});

};
AnimatorController.prototype.loadAnimatorFile = function(animatorFilePath)
{

	var self = this;

	return this.loadFile(animatorFilePath)
		.then(function(response){

			self.animatorFileInfo = Tools.getFileInfo(animatorFilePath);

			var animatorMeta = JSON.parse(response.responseText);

			self.parametersMeta = Tools.arrayOfObjectToDictionary(animatorMeta.parameters, "name");
			self.statesMeta = Tools.arrayOfObjectToDictionary(animatorMeta.states, "name");
			self.transitionsMeta = animatorMeta.transitions;

		})
		.catch(function(){
			throw "Animation.load() -> Can't load animator controller \"" + animatorFilePath + "\" file.";
		});

};
AnimatorController.prototype.loadAnimations = function()
{

	var allAnimationsReady = [];

	for(var stateName in this.statesMeta){
		var state = this.statesMeta[stateName];

		if(!state.animation || Object.keys(this.animations).indexOf(state.animation) > -1){
			continue;
		}

		var animation = new Animation(this.gameObject, this.animatorFileInfo.dir + state.animation + ".anim.json");

		this.animations[state.animation] = animation;
		allAnimationsReady.push(animation.ready);

		if(state.default === true){
			this.currentState = state;
		}

	}

	return Promise.all(allAnimationsReady);

};
AnimatorController.prototype.initParameters = function()
{

	for(var parameterName in this.parameters){
		var parameterMeta = this.parameters[parameterName];

		switch(parameterMeta.type){

			case "bool":
			case "boolean":
				this.parameters[parameterMeta.name] = false;
				break;

			case "int":
			case "integer":
			case "float":
				this.parameters[parameterMeta.name] = 0;
				break;

			default:
				this.parameters[parameterMeta.name] = null;
				break;

		}

	}

};
AnimatorController.prototype.update = function()
{

	if(this.needUpdateCurrentState){

		var oldState = this.currentState;

		this.updateCurrentState();

		var newState = this.currentState;

		if(oldState.animation != newState.animation){
			this.animations[oldState.animation].reset();
		}

	}

	this.animations[this.currentState.animation].update();

};
AnimatorController.prototype.updateCurrentState = function()
{

	var transitionsFromCurrentState = this.getTransitionsWhere("from", this.currentState.name);

	eachTransitionFromCurrentState: for(var i = 0; i < transitionsFromCurrentState.length; i++){
		var transitionFromCurrentState = transitionsFromCurrentState[i];

		for(var j = 0; j < transitionFromCurrentState.conditions.length; j++){
			var condition = transitionFromCurrentState.conditions[j];

			if(this.parameters[condition.parameter] != condition.value){
				continue eachTransitionFromCurrentState;
			}

		}

		this.currentState = this.statesMeta[transitionFromCurrentState.to];

	}

	this.needUpdateCurrentState = false;

};
AnimatorController.prototype.getTransitionsWhere = function(propertyName, propertyValue)
{

	var transitionsWhere = [];

	for(var i = 0; i < this.transitionsMeta.length; i++){
		var transition = this.transitionsMeta[i];

		if(
			transition[propertyName] == propertyValue
			|| propertyName === "from" && transition.from === "any"
		){
			transitionsWhere.push(transition);
		}

	}

	return transitionsWhere;

};
AnimatorController.prototype.setBool = function(parameterName, parameterValue)
{

	if(this.parameters[parameterName] === parameterValue){
		return;
	}

	var parameterType = this.parametersMeta[parameterName].type;

	if(parameterType != "bool" && parameterType != "boolean"){
		throw "AnimatorController.setBool() -> Trying to set a boolean value on \"" + parameterName + "\" parameter of type \"" + parameterType + "\"";
	}

	if(typeof parameterValue !== "boolean"){
		throw "AnimatorController.setBool() -> Trying to set a value on \"" + parameterName + "\" parameter which is not of type \"" + parameterType + "\"";
	}

	this.parameters[parameterName] = parameterValue;

	this.needUpdateCurrentState = true;

};
