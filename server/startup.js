/*jshint esversion: 6 */
import { Meteor } from 'meteor/meteor';
import {ServerSession} from "meteor/matteodem:server-session";
import {Configuration} from "/collections/collections.js";
import "/lib/global_helper_functions.js";

function checkPhysicalSettings(){
	if(!Meteor.settings.public.inputNumber){
		console.log("WARNING : SETTINGS UNDEFINED. Default values used (10, 20)");
		Meteor.settings.public.providedColors = ["green", "blue", "red", "orange", "yellow", "cyan", "Chartreuse", "BlueViolet", "DarkRed"];
		Meteor.settings.public.inputNumber = 16;
		Meteor.settings.public.outputNumber = 5;
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


Meteor.startup(() => {
	checkPhysicalSettings();
	checkServerSettings();
});
