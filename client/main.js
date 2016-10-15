/*jshint esversion: 6 */
import { Template } from 'meteor/templating';

import './main.html';


columnPosition = function(index){
	return (1000/getInputNumber())*index;
}

gridThickness = function(){
	return 5;
}

columnHeight = function(outputIndex){
	return Math.max(100,(1000/getOutputNumber()))*(outputIndex+1);
}

lineLength = function(inputIndex){
	return 1000-(1000/getInputNumber())*(inputIndex);
}

Template.grid.helpers({
	getCurrentConfigurationName(){
		return getCurrentConfiguration().name;
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

	columnHeight(outputIndex){
		return columnHeight(outputIndex);
	},

	lineLength(inputIndex){
		return lineLength(inputIndex);
	},

	gridThickness(){
		return gridThickness();
	},

	defineSvgHeight(){
		var outputNumber = getOutputNumber();
		var minimumLineHeight = Math.max(100,(1000/outputNumber));
		return Math.max(1050, minimumLineHeight*outputNumber+50);
	},

	buildColumn(column, line){
		var connections = getCurrentGridConnections();
		var color = "darkgrey";
		
		if(connections[column][line] == 1){
			console.log("Connection on", column, line);
			color = "blue";
		}

		return '<svg xmlns="http://www.w3.org/2000/svg"><rect class="wire_'+column+'_'+line+'_vert" x="'+columnPosition(column)+'" y="0" width="'+gridThickness()+'" height="'+columnHeight(line)+'" fill="'+color+'" stroke="'+color+'"/></svg>';
	},

	buildLineForColumn(column, line){
		var connections = getCurrentGridConnections();
		var color = "darkgrey";
		if(connections[column][line] == -1) {return;}
		if(connections[column][line] == 1){
			console.log("Connection on", column, line);
			color = "blue";
		}

		return '<svg xmlns="http://www.w3.org/2000/svg"><rect class="wire_'+column+'_'+line+'" x="'+columnPosition(column)+'" y="'+columnHeight(line)+'" width="'+lineLength(column)+'" height="'+gridThickness()+'" fill="'+color+'" stroke="'+color+'"/></svg>';
	},

	buildConnectionLine(column, line){
		var color = getCurrentConfiguration().inputColors[column];
		return '<svg xmlns="http://www.w3.org/2000/svg">'
				+'<rect x="'+columnPosition(column)+'" y="0" width="'+gridThickness()+'" height="'+columnHeight(line)+'" fill="'+color+'" stroke="'+color+'"/>'
				+'<rect x="'+columnPosition(column)+'" y="'+columnHeight(line)+'" width="'+lineLength(column)+'" height="'+gridThickness()+'" fill="'+color+'" stroke="'+color+'"/>'
				+'</svg>';
	}
});
