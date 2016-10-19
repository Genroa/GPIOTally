
	},

	isCurrentConfiguration(id) {
		var currentConfig = getCurrentConfiguration();
		if(currentConfig && currentConfig._id == id) {
			return "btn-primary";
		}
	}
});

Template.configurationList.events({
	'click .configChoice': function(e) {
		var id = e.target.dataset.configId;
		Meteor.call("setCurrentConfiguration", id);
		$('#navmenu').offcanvas('hide');
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
