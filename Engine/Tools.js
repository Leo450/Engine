var Tools = {};

Tools.arrayOfObjectToDictionary = function(array, keyPropertyName)
{

	var dictionary = {};

	for(var i = 0; i < array.length; i++){
		var elem = array[i];

		if(!elem.hasOwnProperty(keyPropertyName)){
			throw "Tools -> Can't convert array of object to dictionary, some elements does not have a \"" + keyPropertyName + "\" property."
		}

		dictionary[elem[keyPropertyName]] = elem;

	}

	return dictionary;

};
Tools.getFileInfo = function(filePath)
{

	var fileInfo = {};

	var pathSplit = filePath.split("/");
	var fullName = pathSplit[pathSplit.length - 1];
	var fullNameSplit = fullName.split(".");

	fileInfo.path = filePath;
	fileInfo.fullName = fullName;
	fileInfo.name = fullNameSplit[0];
	fileInfo.extension = fullNameSplit[1];
	fileInfo.dir = filePath.replace(fullName, "");

	return fileInfo;

};
