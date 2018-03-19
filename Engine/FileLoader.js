var FileLoader = function(){};

FileLoader.prototype.loadFile = function(filePath)
{

	return new Promise(function(resolve, reject){

		var xhr = new XMLHttpRequest();
		xhr.open("GET", filePath);
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4 && xhr.status == 200){
				resolve(xhr);
			}
		};
		xhr.onerror = function()
		{
			reject();
		};
		xhr.send();

	});

};
