import { Class, Type } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';



Type.create({
	name: "Array",
	class: Array,
	validate(args) {
		return true;
	}
});

const Configuration = Class.create({
	name: 'Configuration',

	collection: new Mongo.Collection("Configuration"),

	fields: {
		name: String,
		inputNames: {
			type: [String],
			default: function(){
				var arr = new Array(Meteor.settings.public.inputNumber);
				for(var i=0; i<Meteor.settings.public.inputNumber; i++){
					arr[i] = "In "+i.toString();
				}
				return arr;
			}
		},
		outputNames: {
			type: [String],
			default: function(){
				var arr = new Array(Meteor.settings.public.outputNumber);
				for(var i=0; i<Meteor.settings.public.outputNumber; i++){
					arr[i] = "Out "+i.toString();
				}
				return arr;
			}
		},
		inputColors: {
			type: [String],
			default: function(){
				var colors = Meteor.settings.public.providedColors;
				var arr = new Array(Meteor.settings.public.inputNumber);
				for(var i=0; i<arr.length; i++){
					arr[i] = colors[Math.floor(Math.random()*colors.length)];
				}
				return arr;
			}
		},
		gridConnections: {
			type: [Array],
			default: function(){
				return new Array(Meteor.settings.public.inputNumber).fill(new Array(Meteor.settings.public.outputNumber).fill(0));
			}
		}
	}
});


export { Configuration };