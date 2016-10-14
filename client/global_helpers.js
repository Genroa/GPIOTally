import { Template } from 'meteor/templating';


getInputNumber = function(){
	return Meteor.settings.public.inputNumber;
}

Template.registerHelper("getInputNumber", function(){
	return getInputNumber();
});

getOutputNumber = function(){
	return Meteor.settings.public.outputNumber;
}

Template.registerHelper("getOutputNumber", function(){
	return getOutputNumber();
});