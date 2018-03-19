var Time = {
	time: null,
	lastTime: null,
	deltaTime: null,
	fixedDeltaTime: null
};

Time.update = function(timestamp)
{

	this.time = timestamp / 1000;

	if(this.lastTime !== null){
		this.deltaTime = this.time - this.lastTime;
	}

};
Time.updateForNextFrame = function()
{

	this.lastTime = this.time;

};
