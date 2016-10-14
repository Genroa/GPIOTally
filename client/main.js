/*jshint esversion: 6 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.grid.onCreated(function gridOnCreated() {

	this.gridLinks = new ReactiveDict('gridLinks');
	for(i=0; i < getInputNumber(); i++){
		this.gridLinks.set(i.toString(), Array.apply(null, Array(getOutputNumber())).map(Number.prototype.valueOf,0));
	}
});

Template.grid.helpers({
	getGridConnection(input) {
		return Template.instance().gridLinks.get(input);
	},

	inputsRange(){
		return [...Array(getInputNumber()).keys()];
	},

	revertOutputsRange(){
		return [...Array(getOutputNumber()).keys()].reverse();
	},

	columnPosition(index){
		return (1000/getInputNumber())*index+20;
	},

	columnHeight(outputIndex){
		return Math.max(100,(1000/getOutputNumber()))*(outputIndex+1);
	},

	lineLength(inputIndex){
		return 1000-(1000/getInputNumber())*(inputIndex);
	},

	gridThickness(){
		return 9;
	},

	defineSvgHeight(){
		var outputNumber = getOutputNumber();
		var minimumLineHeight = Math.max(100,(1000/outputNumber));
		return Math.max(1050, minimumLineHeight*outputNumber+50);
	},

	inputs(){
		var dic = [];
		var inputNumber = getInputNumber();
		var gridLinks = Template.instance().gridLinks;
		for(i=0; i < inputNumber; i++){
			dic.push(gridLinks.get(i.toString()));
		}
		//console.log(JSON.stringify(dic));
		return dic;
	}
});
