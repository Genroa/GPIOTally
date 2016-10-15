import { Template } from 'meteor/templating';
import {ServerSession} from "meteor/matteodem:server-session";
import {Configuration} from '/collections/collections.js';
import "/lib/global_helper_functions.js";


Template.registerHelper("getCurrentGridConnections", function(){
	return getCurrentGridConnections();
});


Template.registerHelper("getCurrentConfiguration", function(){
	return getCurrentConfiguration();
});


Template.registerHelper("getInputNumber", function(){
	return getInputNumber();
});


Template.registerHelper("getOutputNumber", function(){
	return getOutputNumber();
});