/*jshint esversion: 6 */
import { Template } from 'meteor/templating';
import { Configuration } from '/collections/collections.js';
import './main.html';

NAMES_SPACE = 130;
OUTPUT_HEIGHT = 50;
INPUT_WIDTH = 50;

getTotalSvgHeight = function(){
	var outputNumber = getOutputNumber();
	return outputNumber*OUTPUT_HEIGHT + NAMES_SPACE + 20;
};

getTotalSvgWidth = function(){
	var inputNumber = getInputNumber();
	return inputNumber*INPUT_WIDTH + NAMES_SPACE + 20;
};

columnPosition = function(index){
	return INPUT_WIDTH*index + 10;
};

linePosition = function(index){
	return OUTPUT_HEIGHT*(index+1) + NAMES_SPACE;
};

gridThickness = function(){
	return 5;
};

columnHeight = function(){
	return getOutputNumber()*OUTPUT_HEIGHT;
};

lineLength = function(){
	return getInputNumber()*INPUT_WIDTH;
};

buildConnectionLine = function(column, line){
	var config = getCurrentConfiguration();
	var color = config && config.inputColors[column];
	return '<svg xmlns="http://www.w3.org/2000/svg">'
			+'<rect x="'+columnPosition(column)+'" y="'+NAMES_SPACE+'" width="'+gridThickness()+'" height="'+(OUTPUT_HEIGHT*(line+1))+'" fill="'+color+'" stroke="'+color+'"/>'
			+'<rect x="'+columnPosition(column)+'" y="'+linePosition(line)+'" width="'+INPUT_WIDTH*(getInputNumber()-column)+'" height="'+gridThickness()+'" fill="'+color+'" stroke="'+color+'"/>'
			+'</svg>';
};

Template.grid.onRendered(function(){
	$('.colorPickers').colorpicker();
});


Template.grid.helpers({
	getNameSpace(){
		return NAMES_SPACE;
	},

	getCurrentConfigurationName(){
		var config = getCurrentConfiguration();
		return config && config.name;
	},

	getCurrentConfigurationId(){
		var config = getCurrentConfiguration();
		return config && config._id;
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

	getInputName(column) {
		var config = getCurrentConfiguration();
		return config && config.inputNames[column];
	},
	getOutputName(line) {
		var config = getCurrentConfiguration();
		return config && config.outputNames[line];
	},
	textPosition(column){
		return columnPosition(column)+7;
	},

	textLinePosition(){
		return lineLength()+20;
	},
	textLineVerticalPosition(line){
		return linePosition(line)+7;
	},

	buildConnections(){
		var inputNumber = getInputNumber();
		var outputNumber = getOutputNumber();
		var config = getCurrentConfiguration();
		var connections = "";
		var grid = config && config.gridConnections;

		if(!config) {
			return connections;
		}

		for(var i = 0; i < inputNumber; i++) {
			for(var j = 0; j < outputNumber; j++) {
				if(grid[i][j] == 1) {
					connections += buildConnectionLine(i, j);
				}
			}
		}

		return connections;
	},

	buildConnectionLine(column, line){
		return buildConnectionLine(column, line);
	}
});

Template.configurationList.helpers({
	configurations() {
		return Configuration.find({});
	},

	isCurrentConfiguration(id) {
		var currentConfig = getCurrentConfiguration();
		if(currentConfig && currentConfig._id == id) {
			return "btn-primary";
		}
	}
});


Template.grid.onCreated(function(){
	this.mouseX = -1;
	this.mouseY = -1;
});


Template.grid.events({
	'mousemove #svgGrid' : function(evt) {
		var grid = $("#svgGrid");
		var offset = grid.offset();
		
		var width = grid.width();
		var height = grid.height();
		var viewBox = grid.get(0).viewBox.baseVal;

		var mouseX = evt.clientX - offset.left + $(window).scrollLeft();
		var mouseY = evt.clientY - offset.top + $(window).scrollTop();

		

		mouseX = mouseX*(viewBox.width/width) - 10;
		mouseY = mouseY*(viewBox.height/height) - NAMES_SPACE;


		if(mouseX < INPUT_WIDTH*getInputNumber() &&
		   mouseX > 0 &&
		   mouseY > 0 &&
		   mouseY < columnHeight()) 
		{
			//console.log("move", mouseX, Template.instance().mouseY);

			var modX = Math.floor((mouseX + INPUT_WIDTH/2) / INPUT_WIDTH);
			var modY = Math.floor((mouseY + OUTPUT_HEIGHT/2) / OUTPUT_HEIGHT);

			//console.log("MODX", modX, getInputNumber(), Math.abs(modX*INPUT_WIDTH-mouseX));
			//console.log("MODY", modY, Math.abs(modY*OUTPUT_HEIGHT-mouseY));

			if(Math.abs((modX*INPUT_WIDTH + gridThickness()/2) - mouseX) < 20 &&
			   Math.abs(modY*OUTPUT_HEIGHT + gridThickness()/2 - mouseY) < 20 &&
			   modY-1 >=0 && modX+1 <= getInputNumber())
			{
				$("#connectionSelector").attr('transform', "translate("+(modX*INPUT_WIDTH + 10 + gridThickness()/2)+" "+(modY*OUTPUT_HEIGHT + NAMES_SPACE + 100 + gridThickness()/2)+")");
				Template.instance().mouseX = modX;
				Template.instance().mouseY = modY-1;
				//console.log("MOVE", Template.instance().mouseX, Template.instance().mouseY);
			}
			else
			{
				$("#connectionSelector").attr('transform', "translate(0 0)");
				Template.instance().mouseX = -1;
				Template.instance().mouseY = -1;
			}
		}
		else
		{
			$("#connectionSelector").attr('transform', "translate(0 0)");
			Template.instance().mouseX = -1;
			Template.instance().mouseY = -1;
		}
	},

	'click #svgGrid' : function(evt){
		var mouseX = Template.instance().mouseX;
		var mouseY = Template.instance().mouseY;
		var config = getCurrentConfiguration();
		var grid = config && config.gridConnections;

		if(mouseX != -1 && mouseY != -1 && grid)
		{
			if(grid[mouseX][mouseY] == 1)
			{
				Meteor.call("unsetConnection", mouseX, mouseY);
			}
			else
			{
				Meteor.call("setConnection", mouseX, mouseY);
			}
		}
	}
});



Template.configurationList.events({
	'click .configChoice': function(e) {
		var id = e.target.dataset.configId;
		Meteor.call("setCurrentConfiguration", id);
		Meteor.setTimeout(function(){
			 $('#navmenu').offcanvas('hide');
		}, 500);
	},

	'click #addConfig': function(e) {
		Meteor.call("createNewConfiguration");
		Meteor.setTimeout(function(){
			 $('#navmenu').offcanvas('hide');
		}, 500);
	},

	'click .button-remove': function(e) {
		var id = e.target.dataset.configId;
		if(!id) {
			id = e.target.parentNode.dataset.configId;
		}
		Meteor.call("deleteConfiguration", id);
	}
});
