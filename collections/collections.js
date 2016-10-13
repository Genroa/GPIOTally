import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';


const GridInput = Class.create({
	name: "GridInput",
	fields: {
		color: {
			type: String,
			default: function(){
				return "blue";
			}
		},
		outputs: {
			type:[Number]
		}
	}
});


const Configuration = Class.create({
	name: 'Configuration',

	collection: new Mongo.Collection("Configuration"),

	fields: {
		name: String,
		inputConfiguration: {
			type: [GridInput],
			default: function(){
				return [];
			}
		}
	}
});


export { Configuration, GridInput };