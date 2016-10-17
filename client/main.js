/*jshint esversion: 6 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

NAMES_SPACE = 80;
OUTPUT_HEIGHT = 50;

getTotalSvgHeight = function(){
	var outputNumber = getOutputNumber();
	return outputNumber*OUTPUT_HEIGHT + NAMES_SPACE + 20;
}

columnPosition = function(index){
	return ($("#svgGrid").width()/getInputNumber())*index;
}

gridThickness = function(){
	return 5;
}

columnHeight = function(){
	return getOutputNumber()*OUTPUT_HEIGHT;
}

lineLength = function(){
	return $("#svgGrid").width() - NAMES_SPACE;
}

Template.grid.onCreated(function(){
	this.svgWidth = new ReactiveVar();
});

Template.grid.events({
	'resize': function(evt){
		evt.preventDefault();
		Template.instance().svgWidth.set($("#svgGrid").width());
		console.log("RESIZED, WIDTH=", Template.instance().svgWidth.get());
	},
	'click': function(evt){
		evt.preventDefault();
		console.log("CLICK");
	}
});

Template.grid.helpers({
	getNameSpace(){
		return NAMES_SPACE;
	},

	getCurrentConfigurationName(){
		var config = getCurrentConfiguration();
		return config && config.name;
	},

	inputsRange(){
		return [...Array(getInputNumber()).keys()];
	},

	outputsRange(){
		return [...Array(getOutputNumber()).keys()];
	},

	columnPosition(index){
		return columnPosition(index);
	},

	columnHeight(){
		return columnHeight();
	},

	lineLength(inputIndex){
		return lineLength(inputIndex);
	},

	gridThickness(){
		return gridThickness();
	},

	defineSvgHeight(){
		return getTotalSvgHeight();
	},



	buildConnectionLine(column, line){
		var color = getCurrentConfiguration().inputColors[column];
		return '<svg xmlns="http://www.w3.org/2000/svg">'
				+'<rect x="'+columnPosition(column)+'" y="'+NAMES_SPACE+'" width="'+gridThickness()+'" height="'+(columnHeight(line)-NAMES_SPACE)+'" fill="'+color+'" stroke="'+color+'"/>'
				+'<rect x="'+columnPosition(column)+'" y="'+columnHeight(line)+'" width="'+lineLength(column)+'" height="'+gridThickness()+'" fill="'+color+'" stroke="'+color+'"/>'
				+'</svg>';
	}
});
