import { Meteor } from 'meteor/meteor';
import "/lib/global_helper_functions.js";

Meteor.methods({
	setConnection: function(column, line){
		return setConnection(column, line);
	},
	unsetConnection: function(column, line){
		return unsetConnection(column, line);
	}
});