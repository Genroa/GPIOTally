import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.grid.onCreated(function gridOnCreated() {
	this.inputNumber = new ReactiveVar(7);
	this.outputNumber = new ReactiveVar(2);

	this.gridLinks = new ReactiveDict('gridLinks');
	for(i=0; i < this.inputNumber.get(); i++){
		this.gridLinks.set(i.toString(), Array.apply(null, Array(this.outputNumber.get())).map(Number.prototype.valueOf,0));
	}
});

Template.grid.helpers({
	getGridConnection(input) {
		return Template.instance().gridLinks.get(input);
	},

	getInputNumber(){
		return Template.instance().inputNumber.get();
	},

	getOutputNumber(){
		return Template.instance().outputNumber.get();
	},

	inputsRange(){
		return [...Array(Template.instance().inputNumber.get()).keys()];
	},

	revertOutputsRange(){
		return [...Array(Template.instance().outputNumber.get()).keys()].reverse();
	},

	columnPosition(index){
		return (1000/Template.instance().inputNumber.get())*index+20;
	},

	columnHeight(outputIndex){
		return Math.max(100,(1000/Template.instance().outputNumber.get()))*(outputIndex+1);
	},

	lineLength(inputIndex){
		return 1000-(1000/Template.instance().inputNumber.get())*(inputIndex);
	},

	gridThickness(){
		return 9;
	},

	defineSvgHeight(){
		var minimumLineHeight = Math.max(100,(1000/Template.instance().outputNumber.get()));
		var outputNumber = Template.instance().outputNumber.get();
		return Math.max(1050, minimumLineHeight*outputNumber+50);
	},

	inputs(){
		var dic = [];
		var inputNumber = Template.instance().inputNumber.get();
		var gridLinks = Template.instance().gridLinks;
		for(i=0; i < inputNumber; i++){
			dic.push(gridLinks.get(i.toString()));
		}
		//console.log(JSON.stringify(dic));
		return dic;
	}
});
