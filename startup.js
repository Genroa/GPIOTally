import {ServerSession} from "meteor/matteodem:server-session";
import {Configuration, GridInput} from "/collections/collections.js";

function buildEmptyGrid(){
	var colors = Meteor.settings.public.providedColors;
	var inputNb = Meteor.settings.public.inputNumber;
	var outputNb = Meteor.settings.public.outputNumber;
	
	var newConfiguration = new Configuration({name: "Nouvelle configuration"});
	
	for(i=0; i<inputNb; i++){
		var gridInput = new GridInput({color: colors[Math.floor(Math.random()*colors.length)], 
									   outputs: new Array(outputNb).fill(0)});
		newConfiguration.inputConfiguration.push(gridInput);
	}
	//console.log(JSON.stringify(newConfiguration, null, "\t"));
	newConfiguration.save();
	console.log("New configuration built and saved");
	return newConfiguration._id;
}


function checkPhysicalSettings(){
	if(!Meteor.settings.public.inputNumber){
		console.log("WARNING : SETTINGS UNDEFINED. Default values used (10, 20)");
		Meteor.settings.public.providedColors = ["green", "blue", "red", "orange", "yellow", "cyan", "Chartreuse", "BlueViolet", "DarkRed"];
		Meteor.settings.public.inputNumber = 10;
		Meteor.settings.public.outputNumber = 20;
	}
}

function checkServerSettings(){
	if(!Configuration.findOne()){
		var gid = buildEmptyGrid();
		ServerSession.set("currentConfiguration", gid);
	}
	
	var gid = ServerSession.get("currentConfiguration");
	if(!gid){
		gid = buildEmptyGrid();
		console.log("No GID was found. Defining new GID="+gid);
		ServerSession.set("currentConfiguration", gid);
	}
	else{
		console.log("Current configuration found: grid id "+gid);
	}
}


Meteor.startup(function(){
	/*
	Procedure:
	- check physical settings : wiring, colors, input/output number. Define default if --settings not present
	- check ServerSession settings : currentGrid
	*/

	if(Meteor.isServer){
		checkPhysicalSettings();
		checkServerSettings();
	}

	
	/*
	
	*/
});
