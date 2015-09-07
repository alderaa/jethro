Meteor.startup(function () {
    // console.log("Server started");
    // Convs.remove({});
});
Meteor.publish("projects", function () {
	return Projects.find({
	  $or: [
	    { owner: this.userId }
	  ]
	});
});
Meteor.publish("tasks", function () {
	return Tasks.find({
	});
});
Meteor.publish("convs", function () {
	return Convs.find({

	});
});