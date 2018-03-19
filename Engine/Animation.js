var Animation = function(gameObject, animationFilePath)
{

	GameObjectComponent.call(this, gameObject);

	this.animationFileInfo = null;

	this.name = null;
	this.duration = null;
	this.stepsMeta = null;

	this.startTime = null;
	this.timeElapsed = null;

	this.currentStep = null;

	this.ready = this.load(animationFilePath);

};
Animation.prototype = Object.assign({}, GameObjectComponent.prototype, FileLoader.prototype);
Animation.prototype.constructor = Animation;

Animation.prototype.load = function(animationFilePath)
{

	return this.loadAnimationFile(animationFilePath);

};
Animation.prototype.loadAnimationFile = function(animationFilePath)
{

	var self = this;

	return this.loadFile(animationFilePath)
		.then(function(response){

			self.animationFileInfo = Tools.getFileInfo(animationFilePath);

			var animation = JSON.parse(response.responseText);
			self.name = animation.name;
			self.duration = animation.duration;
			self.stepsMeta = animation.stepsMeta;

			self.calculateStepsDuration();

		})
		.catch(function(){
			throw "Animation -> Can't load animation file: \"" + animationFilePath + "\".";
		});

};
Animation.prototype.calculateStepsDuration = function()
{

	var previousStep = null;
	var timeLeft = this.duration;

	for(var i = 0; i < this.stepsMeta.length; i++){
		var step = this.stepsMeta[i];

		if(previousStep == null){
			previousStep = step;
			continue;
		}

		previousStep.duration = step.time - previousStep.time;
		timeLeft -= previousStep.duration;

	}

	step.duration = timeLeft;

};
Animation.prototype.update = function()
{

	if(this.startTime === null){

		this.startTime = Time.time;
		this.timeElapsed = 0;

	}else{

		this.timeElapsed = Time.time - this.startTime;

		if(this.timeElapsed > this.duration){
			this.timeElapsed = this.timeElapsed - this.duration;
			this.startTime = Time.time - this.timeElapsed;
		}

	}

	var nowStep = this.getNowStep();

	if(this.currentStep === null || nowStep.time != this.currentStep.time){

		this.currentStep = nowStep;

		this.applyStepChanges(this.currentStep.changes);

	}

};
Animation.prototype.reset = function()
{

	this.startTime = null;
	this.timeElapsed = null;
	this.currentStep = null;

};
Animation.prototype.getNowStep = function()
{

	if(this.duration === undefined || this.duration === null && this.stepsMeta.length === 1){
		return this.stepsMeta[0];
	}

	for(var i = 0; i < this.stepsMeta.length; i++){
		var step = this.stepsMeta[i];

		if(this.timeElapsed >= step.time && this.timeElapsed < step.time + step.duration){
			return step;
		}

	}

	return step;

};
Animation.prototype.applyStepChanges = function(stepChanges)
{

	for(var i = 0; i < stepChanges.length; i++){
		var change = stepChanges[i];

		var component = eval("this.gameObject." + change.component);

		if(change.value != component){
			this.applyChange(change.component, change.value);
		}

	}

};
Animation.prototype.applyChange = function(component, value)
{

	switch(component){

		case "renderer.sprite.name":

			this.gameObject.renderer.sprite.setSprite(value);

			break;

	}

};
