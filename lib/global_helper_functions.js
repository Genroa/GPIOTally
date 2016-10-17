import {ServerSession} from "meteor/matteodem:server-session";
import {Configuration} from '/collections/collections.js';

getCurrentGridConnections = function(){
	var config = getCurrentConfiguration();
	return config && config.gridConnections;
}

getCurrentConfiguration = function(){
	return Configuration.findOne({_id: ServerSession.get("currentConfiguration")});
}

getInputNumber = function(){
	return Meteor.settings.public.inputNumber;
}

getOutputNumber = function(){
	return Meteor.settings.public.outputNumber;
}

setConnection = function(column, line){
	var config = getCurrentConfiguration();
	config.gridConnections[column][line] = 1;
	var inputNumber = getInputNumber();

	for(var i = 0; i< inputNumber; i++){
		if(i==column) continue;
		config.gridConnections[i][line] = 0;
	}

	config.save();
}

unsetConnection = function(column, line){
	var config = getCurrentConfiguration();
	config.gridConnections[column][line] = 0;
	config.save();
}