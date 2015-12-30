Meteor.publish("projects", function () {
	var user = Meteor.users.findOne({'_id':this.userId})
	if(user)
	{
		return Projects.find({
			'company': user.profile.activeCompany
		});
	}
	else return [];
});
Meteor.publish("tasks", function () {
	return Tasks.find({
	});
});
Meteor.publish("convs", function () {
	return Convs.find({

	});
});
Meteor.publish("requests", function () {
	return Requests.find({

	});
});
Meteor.publish("notifs", function () {
	var notifs =  Notifs.find({
		"notify": this.userId
	});
	return notifs;
});
Meteor.publish("allUsers", function () {
	if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
		var company = user.profile.activeCompany;
		return Roles.getUsersInRole('employee', company);
	}
	else
	{
		return "";
	}
});