Meteor.publish("projects", function () {
	return Projects.find({
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
Meteor.publish("requests", function () {
	return Requests.find({

	});
});
Meteor.publish("sendRecurringEmail", function () {
  return Meteor.users.find({
  		// "profile.company": { $in: [Meteor.user().currentCompany]}
  		"profile.company": { $in: ["Felix"]}
  });
});
Meteor.publish("notifs", function () {
	var notifs =  Notifs.find({
		"user": this.userId
	});
	return notifs;
});
Meteor.publish("allUsers", function () {
	if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
		var company = 'roles.'+user.profile.activeCompany;
		console.log(company);
		return Meteor.users.find({company:'employee'});
	}
	else
	{
		return "";
	}
});