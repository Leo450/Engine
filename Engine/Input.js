var Input = {

	reverseKeyBinding: {},
	keyDowns: {}

};

Input.init = function()
{

	return Input.loadKeyBinding()
		.then(function(){
			Input.bindKeyPress();
		});

};
Input.loadKeyBinding = function()
{

	return FileLoader.prototype.loadFile("/App/config/keyBinding.json")
		.then(function(response){

			var keyBinding = JSON.parse(response.responseText);

			for(var keyName in keyBinding){
				var keyCodes = keyBinding[keyName];

				Input.keyDowns[keyName] = false;

				for(var i = 0; i < keyCodes.length; i++){
					var keyCode = keyCodes[i];

					Input.reverseKeyBinding[keyCode] = keyName;

				}

			}

		});

};
Input.bindKeyPress = function()
{

	document.addEventListener("keydown", function(event){

		if(Input.reverseKeyBinding[event.keyCode]){
			var keyName = Input.reverseKeyBinding[event.keyCode];

			Input.keyDowns[keyName] = true;

		}

	});

	document.addEventListener("keyup", function(event){

		if(Input.reverseKeyBinding[event.keyCode]){
			var keyName = Input.reverseKeyBinding[event.keyCode];

			Input.keyDowns[keyName] = false;

		}

	});

};
Input.getKeyDown = function(keyName)
{

	return Input.keyDowns[keyName];

};
