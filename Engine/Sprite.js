var Sprite = function(gameObject, imgFilePath)
{

	GameObjectComponent.call(this, gameObject);

	this.imgFileInfo = null;

	this.spritesMeta = null;

	this.name = null;
	this.width = null;
	this.height = null;
	this.offset = new Vector2();

	this.currentSpriteName = null;
	this.needRender = false;

	this.ready = this.load(imgFilePath);

};
Sprite.prototype = Object.assign({}, GameObjectComponent.prototype, FileLoader.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.load = function(imgFilePath)
{

	var self = this;

	return this.loadImgFile(imgFilePath)
		.then(function(){

			self.imgFileInfo = Tools.getFileInfo(imgFilePath);

			return self.loadSpriteMetaFile();

		});

};
Sprite.prototype.loadImgFile = function(imgFilePath)
{

	var self = this;

	return new Promise(function(resolve, reject){

		self.imgObj = new Image();
		self.imgObj.src = imgFilePath;
		self.imgObj.onload = function(event)
		{

			self.width = event.target.width;
			self.height = event.target.height;

			resolve();

		};
		self.imgObj.onerror = function()
		{
			throw "Sprite -> Can't load image file: \"" + imgFilePath + "\".";
		};

	});

};
Sprite.prototype.loadSpriteMetaFile = function()
{

	var self = this;

	return this.loadFile(self.imgFileInfo.dir + self.imgFileInfo.name + ".meta.json")
		.then(function(response){

			self.spritesMeta = Tools.arrayOfObjectToDictionary(JSON.parse(response.responseText).spritesMeta, "name");
			self.setSprite();

		})
		.catch(function(){
			throw "Sprite.loadSpriteMetaFile() -> Can't load image meta file: \"" + self.imgFileInfo.dir + self.imgFileInfo.name + ".meta.json\".";
		});

};
Sprite.prototype.setSprite = function(spriteName)
{

	if(spriteName == this.currentSpriteName){
		return;
	}

	var spriteMeta = null;

	if(spriteName === undefined){
		spriteMeta = this.spritesMeta[Object.keys(this.spritesMeta)[0]];
	}else{

		if(!this.spritesMeta[spriteName]){
			throw "Sprite.setSprite() -> Can't find \"" + spriteName + "\" sprite in loaded sprites."
		}
		spriteMeta = this.spritesMeta[spriteName];

	}

	this.name = spriteMeta.name;
	this.width = spriteMeta.bounds.max.x - spriteMeta.bounds.min.x;
	this.height = spriteMeta.bounds.max.y - spriteMeta.bounds.min.y;
	this.offset.x = spriteMeta.bounds.min.x;
	this.offset.y = spriteMeta.bounds.min.y;

	this.currentSpriteName = spriteName;
	this.needRender = true;

};
