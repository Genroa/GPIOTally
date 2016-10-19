import { Meteor } from 'meteor/meteor';
import { ServerSession } from "meteor/matteodem:server-session";
import { Configuration } from "/collections/collections.js"; 
import "/lib/global_helper_functions.js";

Meteor.methods({
	setConnection: function(column, line){
		return setConnection(column, line);
	},
	unsetConnection: function(column, line){
		return unsetConnection(column, line);
	},
	setCurrentConfiguration: function(id) {
		ServerSession.set("currentConfiguration", id);
	},
	createNewConfiguration: function() {
		var id = buildEmptyGrid();
		ServerSession.set("currentConfiguration", id);
	},
	deleteConfiguration: function(id) {
		Configuration.remove({_id: id});
	}
});
