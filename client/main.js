/*jshint esversion: 6 */
import { Template } from 'meteor/templating';
import { Configuration } from '/collections/collections.js';
import './main.html';

NAMES_SPACE = 80;
OUTPUT_HEIGHT = 50;
INPUT_WIDTH = 50;

getTotalSvgHeight = function(){
	var outputNumber = getOutputNumber();
	return outputNumber*OUTPUT_HEIGHT + NAMES_SPACE + 20;
}

getTotalSvgWidth = function(){
	var inputNumber = getInputNumber();
	return inputNumber*INPUT_WIDTH + NAMES_SPACE + 20;
}

columnPosition = function(index){
	return INPUT_WIDTH*index + 10;
}

linePosition = function(index){
	return OUTPUT_HEIGHT*(index+1) + NAMES_SPACE;
}

gridThickness = function(){
	return 5;
};

columnHeight = function(){
	return getOutputNumber()*OUTPUT_HEIGHT;
}

lineLength = function(){
	return getInputNumber()*INPUT_WIDTH;
}



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

	linePosition(index){
		return linePosition(index);
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

	defineSvgWidth(){
		return getTotalSvgWidth();
	},



	buildConnectionLine(column, line){
		var color = getCurrentConfiguration().inputColors[column];
		return '<svg xmlns="http://www.w3.org/2000/svg">'
				+'<rect x="'+columnPosition(column)+'" y="'+NAMES_SPACE+'" width="'+gridThickness()+'" height="'+(OUTPUT_HEIGHT*(line+1))+'" fill="'+color+'" stroke="'+color+'"/>'
				+'<rect x="'+columnPosition(column)+'" y="'+linePosition(line)+'" width="'+INPUT_WIDTH*(getInputNumber()-column)+'" height="'+gridThickness()+'" fill="'+color+'" stroke="'+color+'"/>'
				+'</svg>';
	}
});

Template.configurationList.helpers({
	configurations() {
		return Configuration.find({});
	}
});

Template.configurationList.events({
	'click a': function() {
		/* traitement ici */
		$('#navmenu').offcanvas('hide');
	}
});
